var assert = require('chai').assert;

var combine = require(`${__dirname}/../../index`);

describe('index.js', function () {

    it('should combine', function () {
        var schema = [
            ['map', {from: 'a', to: 'b'}]
        ];

        var data = {a: 1};

        assert.deepEqual(combine(schema, data), {b: 1});
    });

    it('should error on invalid schema', function () {
        assert.throws(x => combine(null, {}, {}), Error, 'schema shoud be an array');

        assert.throws(x => combine(['asd'], {}, {}), Error, 'schema step 0 should be an array');
    });

});
