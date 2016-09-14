var _get = require('lodash/get');
var _set = require('lodash/set');

module.exports = function (config, item, data) {

    var dict = _get(data, config.fromDict, null);

    if (!dict || typeof dict !== 'object') {
        dict = {};
    }

    var dictKey = _get(item, config.byKey, null);

    var defaultStepValue = _get(config, 'default', null);

    _set(item, config.to, _get(dict, dictKey, defaultStepValue));
};
