var assert = require('chai').assert;

var createCombineFn = require(`${__dirname}/../../create`);

describe('create.js', function () {

    it('should combine', function () {
        var schema = [
            ['map', {from: 'a', to: 'b'}]
        ];

        var combine = createCombineFn(schema);

        var data = {a: 1};

        assert.deepEqual(combine(data), {b: 1});
    });

});
