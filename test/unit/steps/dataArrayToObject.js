var assert = require('chai').assert;

var dataArrayToObject = require(`${__dirname}/../../../src/steps/dataArrayToObject`);

describe('#dataArrayToObject', function () {

    it('should convert array to object', function () {

        var config = {
            from: 'a',
            to: 'a',
            byKey: 'id'
        };

        var data = {
            a: [{id: 1, login: 1}, {id: 2, login: 2}]
        };

        var result = {};

        dataArrayToObject(config, data, result);

        var valid = {
            a: {
                1: {id: 1, login: 1},
                2: {id: 2, login: 2}
            }
        };

        assert.deepEqual(valid, data);
        assert.deepEqual(result, {});

    });

});
