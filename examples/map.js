var combine = require(__dirname + '/../index.js');

var schema = [
    ['map', {from: 'a', to: 'b', default: []}]
];

var result = combine(schema, {a:1});

console.log(result);
