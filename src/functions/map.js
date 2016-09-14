var _get = require('lodash/get');
var _set = require('lodash/set');

module.exports = function (mapSchema, data, result) {

    if (!Array.isArray(mapSchema)) {
        return result;
    }

    for (var index in mapSchema) {
        var map = mapSchema[index];

        var defaultValue = (typeof map.default !== 'undefined') ? map.default : null;

        _set(result, map.to, _get(data, map.from, defaultValue));
    }

    return result;
};
