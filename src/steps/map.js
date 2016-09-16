var _get = require('lodash/get');
var _set = require('lodash/set');


/**
 * config {from: 'a.a', to: 'b.b', default: '-'}
 */
module.exports = function (config, data, result) {

    if (!config || !config.from || !config.to) {
        var error = new Error('invalid config fo step "map"');

        error.config = config;

        throw error;
    }

    var defaultValue = _get(config, 'default', null);

    _set(result, config.to, _get(data, config.from, defaultValue));

    return result;
};
