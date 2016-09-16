var _get = require('lodash/get');
var _set = require('lodash/set');
var _keyBy = require('lodash/keyBy');

/**
 * config {from: 'a', to: 'b', byKey: 'test', default: '-'}
 */
module.exports = function (config, data, result) {

    if (!config || !config.byKey || !config.from || !config.to) {
        var error = new Error('invalid config fo step "arrayToObject"');
        error.config = config;
        throw error;
    }

    var defaultValue = _get(config, 'default', null);

    var array = _get(data, config.from, []);

    _set(result, config.to, _keyBy(array, config.byKey), defaultValue);
};
