var createCombineFn = require(__dirname + '/../create.js');

var schema = [
    ['map', {from: 'a', to: 'b', default: []}]
];

var combine = createCombineFn(schema);

console.log(combine({a: [1, 2, 3]}));
