var assert = require('chai').assert;
var combine = require(`${__dirname}/../../../../src/steps/combine`);

describe('#remove', function () {

    it('should remove one key', function () {
        var schema = {
            for: 'result',
            each: [
                ['add', {byKey: 'id', fromObject: 'users', to: 'user'}],
                ['remove', ['test']]
            ],
            to: 'test'
        };

        var data = {
            result: [
                {id: 1, test: 1},
                {id: 2, test: 2}
            ],
            users: {
                1: {login: 1},
                2: {login: 2}
            }
        };

        var result = {};

        var result = combine(schema, data, result);

        var valid = {
            test: [
                {id: 1, user: {login: 1}},
                {id: 2, user: {login: 2}}
            ]
        };

        assert.deepEqual(valid, result);
    });

    it('should remove many keys', function () {
        var schema = {
            for: 'result',
            each: [
                ['add', {byKey: 'id', fromObject: 'users', to: 'user'}],
                ['remove', ['test', 'shit']]
            ],
            to: 'test'
        };

        var data = {
            result: [
                {id: 1, test: 1, shit: [1,2,3]},
                {id: 2, test: 2, shit: [1,2,3]}
            ],
            users: {
                1: {login: 1},
                2: {login: 2}
            }
        };

        var result = {};

        var result = combine(schema, data, result);

        var valid = {
            test: [
                {id: 1, user: {login: 1}},
                {id: 2, user: {login: 2}}
            ]
        };

        assert.deepEqual(valid, result);
    });

    it('should do nothing on empty data', function () {
        var schema = {
            for: 'result',
            each: [
                ['add', {byKey: 'id', fromObject: 'users', to: 'user'}],
                ['remove', []]
            ],
            to: 'test'
        };

        var data = {
            result: [
                {id: 1, test: 1, shit: [1,2,3]},
                {id: 2, test: 2, shit: [1,2,3]}
            ],
            users: {
                1: {login: 1},
                2: {login: 2}
            }
        };

        var result = {};

        var result = combine(schema, data, result);

        var valid = {
            test: [
                {id: 1, user: {login: 1}, test: 1, shit: [1,2,3]},
                {id: 2, user: {login: 2}, test: 2, shit: [1,2,3]}
            ]
        };

        assert.deepEqual(valid, result);
    });


    it('should error on invalid remove step config', function () {
        var schema = {
            for: 'result',
            each: [
                ['remove', null]
            ],
            to: 'test'
        };

        var data = {
            result: [
                {id: 1, test: 1},
                {id: 2, test: 2}
            ],
            users: {
                1: {login: 1},
                2: {login: 2}
            }
        };

        assert.throws(x => combine(schema, data, {}), Error, 'invalid config for combine step "remove"');
    });

});
