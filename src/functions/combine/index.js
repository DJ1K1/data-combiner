var _get = require('lodash/get');
var _set = require('lodash/set');

var processPipeline = require('./processPipeline');

var combineStep = function (toName, step, data, result) {
    result[toName] = [];

    var forData = _get(data, step.for, null);

    if (!Array.isArray(forData)) {
        return;
    }

    var defaultStepValue = _get(step, 'default', null);

    for (var index in forData) {
        var item = forData[index];

        processPipeline(step, item, data);

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
