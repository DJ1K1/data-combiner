var _get = require('lodash/get');
var _set = require('lodash/set');

var combineStep = function (toName, step, data, result) {
    result[toName] = [];

    var forData = _get(data, step.for, null);

    if (!Array.isArray(forData)) {
        return;
    }

    var dict = _get(data, step.dict, null);

    if (!dict || typeof dict !== 'object') {
        dict = {};
    }

    var defaultStepValue = _get(step, 'default', null);

    for (var index in forData) {
        var item = forData[index];

        var dictKey = _get(item, step.key, null);

        _set(item, step.to, _get(dict, dictKey, defaultStepValue));

        result[toName].push(item);
    }
};

module.exports = function(combineSchema, data, result) {

    if (!combineSchema || typeof combineSchema !== 'object') {
        return result;
    }

    for (var toName in combineSchema) {
        var step = combineSchema[toName];

        // if (!this._validateCombineStep(step)) {
        //     throw new Error('invalid step config ', JSON.stringify(step));
        // }

        combineStep(toName, step, data, result);
    }

    return result;

};
