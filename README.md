# data-combiner

[![Code Climate](https://codeclimate.com/github/alekzonder/data-combiner/badges/gpa.svg)](https://codeclimate.com/github/alekzonder/data-combiner)
[![Test Coverage](https://codeclimate.com/github/alekzonder/data-combiner/badges/coverage.svg)](https://codeclimate.com/github/alekzonder/data-combiner/coverage)
[![Build Status](https://travis-ci.org/alekzonder/data-combiner.svg?branch=master)](https://travis-ci.org/alekzonder/data-combiner)


combine object to object by schema



# install

```
npm i --save data-combiner@latest
```

# usage

```js

// for example, your user posts api response seems like this
var raw = {

    // set of count for pagination
    metadata: {
        resultset: {count: 3, total: 10, limit: 2, offset: 0}
    },

    // user profiles
    users: {
        'u1': {id: 1, login: 'A User'},
        'u2': {id: 1, login: 'B User'},
    },

    // count of likes per post
    likeCounts: {
        1: 3,
        2: 4
    },

    // array with posts
    result: [
        {id: 1, userId: 'u1', text: 'a'},
        {id: 2, userId: 'u2', text: 'b'}
    ]
};

// in browser (or in node.js service) you want work with this object
var result = {
    resultset: {count: 3, total: 10, limit: 2, offset: 0},
    posts: [
        {id: 1, userId: 'u1', text: 'a', user: {id: 'u1', login: 'A User'}, stars: 3},
        {id: 2, userId: 'u2', text: 'b', user: {id: 'u2', login: 'A User'}, stars: 4}
    ]
};

// write schema
var schema = {

    // map object to new keys
    map: [
        // map metadata.resultset to resultset
        {from: 'metadata.resultset', to: 'resultset'}
    ],

    // combine new posts object with dicts (users and likeCounts)
    combine: {
        // map posts to new object
        posts: {
            // for array in 'result' key
            from: 'result',

            // for each item do this steps
            pipeline: [
                {
                    // add into item 'user' object by key userId
                    // from 'users' dict
                    $add: {
                        byKey: 'userId',
                        fromDict: 'users',
                        to: 'user'

                        // if userId not exists in users - default = null
                    }

                },

                // same for likes count
                {
                    $add: {
                        byKey: 'id',
                        fromDict: 'likeCounts',
                        to: 'stars',

                        // set your custom default value
                        default: 0
                    }
                }
            ]
        }
    }
};

```

# LICENSE

MIT
