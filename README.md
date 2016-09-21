# data-combiner

[![Code Climate](https://codeclimate.com/github/alekzonder/data-combiner/badges/gpa.svg)](https://codeclimate.com/github/alekzonder/data-combiner)
[![Test Coverage](https://codeclimate.com/github/alekzonder/data-combiner/badges/coverage.svg)](https://codeclimate.com/github/alekzonder/data-combiner/coverage)
[![Build Status](https://travis-ci.org/alekzonder/data-combiner.svg?branch=master)](https://travis-ci.org/alekzonder/data-combiner)

[![NPM](https://nodei.co/npm/data-combiner.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/data-combiner/)

combine object to object by schema



# install

```
npm i --save data-combiner@latest
```

# usage

```js
// for example, your user posts api response seems like this
var data = {

    // set of count for pagination
    metadata: {
        resultset: {count: 3, total: 10, limit: 2, offset: 0}
    },

    // user profiles
    users: [
        {id: 'u1', login: 'A User'},
        {id: 'u2', login: 'B User'},
    ],

    // count of likes per post
    likeCounts: [
        {id: 1, count: 3},
        {id: 2, count: 4}
    ],

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
var schema = [

    // transform array to object in data original object
    ['dataArrayToObject', {from: 'users', to: 'users', byKey: 'id'}],
    ['dataArrayToObject', {from: 'likeCounts', to: 'likeCounts', byKey: 'id'}],

    // map resultset to result object
    ['map', {from: 'metadata.resultset', to: 'resultset'}],

    // combine new posts object with dicts (users and likeCounts)
    ['combine', {
        for: 'result',
        each: [
            ['add', {byKey: 'userId', fromObject: 'users', to: 'user'}],
            ['add', {byKey: 'id', fromObject: 'likeCounts', get: 'count', to: 'stars'}],
        ],
        to: 'posts'
    }]

];

// create combiner item

var combine = require('data-combiner');

var resultWhatYouWant = combine(schema, data);

// simple you can create combine function and combine your object without passing schema

var createCombine = require('data-combiner/create');

var myCombine = createCombine(schema);

var resultWhatYouWant = myCombine(data);

```


# documentation

schema is `Array`

And every array element is array in format: `[<name of step>, <step config>]`

# steps

## map

copy object from data object by key *from* to result object key *to*

### format

```js
[
	'map',
	{
		'from': '<data key>',
		'to': '<result key>',
		'default': '<default value>'
	}
]
```

## arrayToObject

convert array to object using lodash function _.keyBy

### format

```js
[
	'arrayToObject',
	{
		'from': '<data key>',
		'to': '<result key>',
		'byKey': '<key in data array item>',
		'default': '<default value>'
	}
]
```

## dataArrayToObject

same as arrayToObject, but do it from data object to data object

### format

```js
[
	'arrayToObject',
	{
		'from': '<data key>',
		'to': '<data key>',
		'byKey': '<key in data array item>',
		'default': '<default value>'
	}
]
```


## combine

### format

```js
[
	'combine',
	{
		'for': '<key in data, value should be array>',

		// for each item of "for" value
		'each': [

			[
				'add',
				{
					'byKey': '<dict object id>',
					'fromObject': '<data object key>',
					'to': 'key in new item>',
					'default': '<default value>'
				}
			],

			['remove', '<array of keys will be removed from item>']
		],


		to: '<key in result for save new combined array>'
	}
]
```


# LICENSE

MIT
