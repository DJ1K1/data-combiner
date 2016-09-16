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

var combine = require(__dirname + '/../index.js');

var resultWhatYouWant = combine(schema, data);

console.log(require('util').inspect(resultWhatYouWant, {depth: null}));


var createCombine = require(__dirname + '/../create.js');

var myCombine = createCombine(schema);

var resultWhatYouWant = myCombine(data);

console.log('\n\n\n', require('util').inspect(resultWhatYouWant, {depth: null}));
