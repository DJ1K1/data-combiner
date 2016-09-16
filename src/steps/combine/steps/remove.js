var _get = require('lodash/get');
var _set = require('lodash/set');
var _unset = require('lodash/unset');

module.exports = function (config, data, item) {
    // TODO check
    if (!config || !Array.isArray(config)) {

        var error = new Error('invalid config for combine step "remove"');
        error.config = config;
        throw error;
    }

    for (var index in config) {
        var name = config[index];
        _unset(item, name);
    }

};
