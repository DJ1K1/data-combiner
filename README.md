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
            key: 'userId',
            dict: 'metadata.users',
            to: 'users',
            default: null
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
        {id: 'a', userId: 1, text: 'aaa', user: {id: 1, login: '111'}},
        {id: 'b', userId: 2, text: 'bbb', user: {id: 2, login: '222'}},
        {id: 'c', userId: 3, text: 'ccc', user: null}
    ]
}
```

# LICENSE

MIT
