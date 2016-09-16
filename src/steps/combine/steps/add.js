var _get = require('lodash/get');
var _set = require('lodash/set');

module.exports = function (config, data, item) {

    if (!config || !config.fromObject || !config.byKey || !config.to) {
        var error = new Error('invalid config for combine step "add"');
        error.config = config;
        throw error;
    }

    var dict = _get(data, config.fromObject, null);

    if (!dict || typeof dict !== 'object') {
        dict = {};
    }

    var dictKey = _get(item, config.byKey, null);

    var defaultStepValue = _get(config, 'default', null);

    var dictItem = _get(dict, dictKey, defaultStepValue);

    var setToItem = dictItem;

    if (typeof config.get === 'string') {
        setToItem = _get(dictItem, config.get, defaultStepValue);
    }

    _set(item, config.to, setToItem);
};
