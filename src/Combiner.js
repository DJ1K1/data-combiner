var _get = require('lodash/get');

var mapFn = require('./functions/map');
var combineFn = require('./functions/combine');

function Combiner(schema) {
    this._schema = schema;
}

Combiner.prototype.combine = function (data) {
    var result = {};

    result = mapFn(this._schema.map, data, result);
    result = combineFn(this._schema.combine, data, result);

    return result;
};

module.exports = Combiner;
