var assert = require('chai').assert;

var arrayToObject = require(`${__dirname}/../../../src/steps/arrayToObject`);

describe('#arrayToObject', function () {

    it('should convert array to object', function () {

        var config = {
            from: 'a',
            to: 'b',
            byKey: 'id'
        };

        var data = {
            a: [{id: 1, login: 1}, {id: 2, login: 2}]
        };

        var result = {};

        arrayToObject(config, data, result);

        var valid = {
            b: {
                1: {id: 1, login: 1},
                2: {id: 2, login: 2}
            }
        };

        assert.deepEqual(valid, result);

    });

    it('should error on invalid config', function () {
        var data = {
            a: [{id: 1, login: 1}, {id: 2, login: 2}]
        };

        var result = {};

        assert.throws(x => arrayToObject({}, data, result), Error, 'invalid config fo step "arrayToObject"');
        assert.throws(x => arrayToObject({from: 'a'}, data, result), Error, 'invalid config fo step "arrayToObject"');
        assert.throws(x => arrayToObject({to: 'a'}, data, result), Error, 'invalid config fo step "arrayToObject"');
        assert.throws(x => arrayToObject({byKey: 'a'}, data, result), Error, 'invalid config fo step "arrayToObject"');
    });
});
