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

## data
```js
var data = {
    metadata: {
        resultset: {
            count: 1
        },
        users: {
            1: {id: 1, login: '111'},
            2: {id: 2, login: '222'}
        },
        count: {
            a: 1,
            c: 3
        }
    },
    result: [
        {id: 'a', userId: 1, text: 'aaa'},
        {id: 'b', userId: 2, text: 'bbb'},
        {id: 'c', userId: 3, text: 'ccc'}
    ]
};
```

## schema

```js
var schema = {
    map: [
        // map "metadata.resultset" from data to result "resultset" key, if not exists set null
        {
            from: 'metadata.resultset',
            to: 'resultset',
            default: null
        }
    ],
    combine: {
        // TODO
        posts: {
            for: 'result',
            pipeline: [
                {
                    $add: {
                        byKey: 'userId',
                        fromDict: 'metadata.users',
                        to: 'user',
                        default: null
                    }
                },
                {
                    $add: {
                        byKey: 'id',
                        fromDict: 'metadata.counts',
                        to: 'count',
                        default: 0
                    }
                }
            ]

        }
    }
};
```

## combine

```js
var Combiner = require('data-combiner');

var c = new Combiner(schema);

var result = c.combine(data);

```

## result

```js
{
    resultset: {
        count: 1
    },
    posts: [
        {id: 'a', userId: 1, text: 'aaa', user: {id: 1, login: '111'}, count: 1},
        {id: 'b', userId: 2, text: 'bbb', user: {id: 2, login: '222'}, count: 0},
        {id: 'c', userId: 3, text: 'ccc', user: null, count: 3}
    ]
}
```

# LICENSE

MIT
