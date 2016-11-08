
var assert = require('chai').assert;

var combine = require(`${__dirname}/../../../../src/steps/combine`);

describe('#add', function () {

    it('should combine one step', function () {
        var schema = {
            for: 'result',
            each: [
                ['add', {byKey: 'id', fromObject: 'users', to: 'user'}]
            ],
            to: 'test'
        };

        var data = {
            result: [
                {id: 1},
                {id: 2}
            ],
            users: {
                1: {login: 1},
                2: {login: 2}
            }
        };

        var result = {};

        combine(schema, data, result);

        var valid = {
            test: [
                {id: 1, user: {login: 1}},
                {id: 2, user: {login: 2}}
            ]
        };

        assert.deepEqual(valid, result);
    });

    it('should combine many step', function () {
        var schema = {
            for: 'result',
            each: [
                ['add', {byKey: 'id', fromObject: 'users', to: 'user'}],
                ['add', {byKey: 'id', fromObject: 'counts', to: 'count'}]
            ],
            to: 'test'
        };

        var data = {
            result: [
                {id: 1},
                {id: 2}
            ],
            users: {
                1: {login: 1},
                2: {login: 2}
            },
            counts: {
                1: 2,
                2: 3
            }
        };

        var result = {};

        combine(schema, data, result);

        var valid = {
            test: [
                {id: 1, user: {login: 1}, count: 2},
                {id: 2, user: {login: 2}, count: 3}
            ]
        };

        assert.deepEqual(valid, result);
    });

    it('should combine if no dict object', function () {
        var schema = {
            for: 'result',
            each: [
                ['add', {byKey: 'id', fromObject: 'users', to: 'user'}]
            ],
            to: 'test'
        };

        var data = {
            result: [
                {id: 1},
                {id: 2}
            ]
        };

        var result = {};

        combine(schema, data, result);

        var valid = {
            test: [
                {id: 1, user: null},
                {id: 2, user: null}
            ]
        };

        assert.deepEqual(valid, result);
    });


    it('should combine if no dict value using default', function () {
        var schema = {
            for: 'result',
            each: [
                ['add', {byKey: 'id', fromObject: 'users', to: 'user', default: {id: 0}}]
            ],
            to: 'test'
        };

        var data = {
            result: [
                {id: 1},
                {id: 2}
            ],
            users: {}
        };

        var result = {};

        combine(schema, data, result);

        var valid = {
            test: [
                {id: 1, user: {id: 0}},
                {id: 2, user: {id: 0}}
            ]
        };

        assert.deepEqual(valid, result);
    });

    it('should get field from dict', function () {
        var schema = {
            for: 'result',
            each: [
                ['add', {byKey: 'id', fromObject: 'users', get: 'login', to: 'user', default: null}]
            ],
            to: 'test'
        };

        var data = {
            result: [
                {id: 1},
                {id: 2}
            ],
            users: {
                1: {id: 1, login: '111'},
                2: {id: 2, login: '222'}
            }
        };

        var result = {};

        combine(schema, data, result);

        var valid = {
            test: [
                {id: 1, user: '111'},
                {id: 2, user: '222'}
            ]
        };

        assert.deepEqual(valid, result);
    });

    it('should throw error on invalid step config', function () {
        var schema = {};
        assert.throws(x => combine({}), Error, 'invalid config fo step "combine"');
        assert.throws(x => combine({for: 'result'}), Error, 'invalid config fo step "combine"');
        assert.throws(x => combine({for: 'result', to: ''}), Error, 'invalid config fo step "combine"');
        assert.throws(x => combine({for: 'result', each: [{}], to: ''}), Error, 'invalid config fo step "combine"');
    });

    it('should throw error on invalid add step', function () {
        data = {result: [{}]};

        assert.throws(
            x => combine({for: 'result', each: [['add', null]], to: 'test'}, data, {}),
            Error,
            'invalid config for combine step "add"'
        );
    });

});
