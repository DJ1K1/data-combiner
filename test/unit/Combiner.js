var assert = require('chai').assert;

var Combiner = require(`${__dirname}/../../src/Combiner`);


describe('Combiner', function () {

    it('should map and combine', function () {
        var data = {
            result: [
                {
                    id: 1,
                    userId: 'a'
                },
                {
                    id: 2,
                    userId: 'b',
                },
                {
                    id: 3,
                    userId: 'c'
                }
            ],
            metadata: {
                resultset: {
                    count: 1
                },
                users: {
                    a: {id: 'a', login: 'aaa'},
                    b: {id: 'b', login: 'bbb'}
                }
            }
        };

        var schema = {
            map: [
                {
                    from: 'metadata.resultset',
                    to: 'resultset'
                }
            ],
            combine: {
                posts: {
                    for: 'result',
                    key: 'userId',
                    dict: 'metadata.users',
                    to: 'user'
                }
            }
        };

        var combiner = new Combiner(schema);

        var result = combiner.combine(data);

        var valid = {
            resultset: {
                count: 1
            },
            posts: [
                {
                    id: 1,
                    userId: 'a',
                    user: {id: 'a', login: 'aaa'}
                },
                {
                    id: 2,
                    userId: 'b',
                    user: {id: 'b', login: 'bbb'}
                },
                {
                    id: 3,
                    userId: 'c',
                    user: null
                }
            ]
        };

        assert.deepEqual(result, valid);
    });
});


