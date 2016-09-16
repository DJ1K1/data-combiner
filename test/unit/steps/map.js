var assert = require('chai').assert;

var mapFn = require(`${__dirname}/../../../src/steps/map`);

describe('map step', function () {

    it('should map empty data with defaults', function () {
        var mapSchema = {
            from: 'nested.test',
            to: 'test',
            default: 'empty'
        };

        var result = mapFn(mapSchema, {}, {});

        assert.equal(result.test, 'empty');
    });

    it('should map one level data', function () {
        var mapSchema = {
                from: 'a',
                to: 'test',
                default: 'empty'
            };

        var result = mapFn(mapSchema, {a: '123'}, {});

        assert.equal(result.test, '123');
    });

    it('should map nested data to one level', function () {
        var mapSchema = {
                from: 'a.b',
                to: 'test',
                default: 'empty'
            };

        var result = mapFn(mapSchema, {a: {b: '123'}}, {});

        assert.equal(result.test, '123');
    });

    it('should map nested data to nested', function () {
        var mapSchema = {
            from: 'a.b',
            to: 'test.woof',
            default: 'empty'
        };

        var result = mapFn(mapSchema, {a: {b: '123'}}, {});

        assert.equal(result.test.woof, '123');
    });

    it('should default null', function () {
        var mapSchema = {
            from: 'a.b',
            to: 'test.woof'
        };

        var result = mapFn(mapSchema, {}, {});

        assert.equal(result.test.woof, null);
    });

    it('should throw error if config invalid', function () {
        assert.throws(function() {mapFn('', {a: {b: '123'}}, {c: 1});}, Error, 'invalid config fo step "map"');
    });

});
