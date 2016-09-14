var assert = require('chai').assert;

var combine = require(`${__dirname}/../../src/functions/combine`);


describe('combine function', function () {

    it('should return original result if schema not an object', function () {
        var schema = '';

        assert.deepEqual(combine(schema, {}, {a: 1}), {a:1});
    });

    // it('should return empty array if no pipeline', function () {
    //
    //     var schema = {
    //         posts: {
    //             for: 'result',
    //             pipeline: null
    //         }
    //     };
    //
    //     var result = combine(schema, {}, {});
    //
    //     assert.deepEqual(result, {posts: []});
    // });

    it('should combine, one step, one.level', function () {

        var schema = {
            posts: {
                for: 'result',
                pipeline: [
                    {
                        '$add': {
                            byKey: 'userId',
                            fromDict: 'users',
                            to: 'user'
                        }
                    }
                ]
            }
        };

        var data = {
            result: [
                {id: 1, userId: 'a'},
                {id: 2, userId: 'b'}
            ],
            users: {
                'a': {id: 'a', login: 'aaa'},
                'b': {id: 'b', login: 'bbb'}
            }
        };

        var result = combine(schema, data, {});

        var valid = {
            posts: [{
                id: 1,
                userId: 'a',
                user: {
                    id: 'a',
                    login: 'aaa'
                }
            }, {
                id: 2,
                userId: 'b',
                user: {
                    id: 'b',
                    login: 'bbb'
                }
            }]
        };

        assert.deepEqual(result, valid);

    });


    it('should not combine items, if for is not array', function () {
        var schema = {
            posts: {
                for: 'result',
                pipeline: [
                    {
                        '$add': {
                            byKey: 'userId',
                            fromDict: 'users',
                            to: 'user'
                        }
                    }
                ]
            }
        };

        var data = {
            result: null,
            users: {
                'a': {id: 'a', login: 'aaa'},
                'b': {id: 'b', login: 'bbb'}
            }
        };

        var result = combine(schema, data, {});

        assert.deepEqual(result, {posts: []});
    });

    it('should not combine users to user, if dict is not an object', function () {
        var schema = {
            posts: {
                for: 'result',
                pipeline: [
                    {
                        '$add': {
                            byKey: 'userId',
                            fromDict: 'users',
                            to: 'user'
                        }
                    }
                ]
            }
        };

        var data = {
            result: [
                {id: 1, userId: 'a'},
                {id: 2, userId: 'b'}
            ],
            users: null
        };

        var result = combine(schema, data, {});

        var valid = {
            posts: [
                {id: 1, userId: 'a', user: null},
                {id: 2, userId: 'b', user: null}
            ]
        };

        assert.deepEqual(result, valid);
    });


});
