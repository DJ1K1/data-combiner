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
                },
                counts: {
                    1: 2,
                    3: 4
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
                    pipeline: [
                        {
                            $add: {
                                byKey: 'userId',
                                fromDict: 'metadata.users',
                                to: 'user'
                            }
                        },
                        {
                            $add: {
                                byKey: 'id',
                                fromDict: 'metadata.counts',
                                to: 'count',
                                default: 0
                            }
                        }
                    ]

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
                    user: {id: 'a', login: 'aaa'},
                    count: 2
                },
                {
                    id: 2,
                    userId: 'b',
                    user: {id: 'b', login: 'bbb'},
                    count: 0
                },
                {
                    id: 3,
                    userId: 'c',
                    user: null,
                    count: 4
                }
            ]
        };

        assert.deepEqual(result, valid);
    });
});


