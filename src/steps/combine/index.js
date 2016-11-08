/*
{
    for: 'result',
    each: [
        ['add', {byKey: 'userId', fromObject: 'users', to: 'user'}],
        ['add', {byKey: 'id', fromObject: 'counts', to: 'count'}],
        ['remove', ['userId']]
    ],
    to: 'posts'
}
*/

var _get = require('lodash/get');
var _set = require('lodash/set');

var steps = {};

steps.add = require('./steps/add');
steps.remove = require('./steps/remove');

var getStepFunction = function (name) {
    return steps[name];
};

var processStep = function (step, data, item) {
    getStepFunction(step[0])(step[1], data, item);
};

module.exports = function(config, data, result) {

    if (!config || !config.for || !config.each || !config.to || !Array.isArray(config.each)) {
        var error = new Error('invalid config fo step "combine"');
        error.config = config;
        throw error;
    }

    var forData = _get(data, config.for, []);

    var to = [];

    _set(result, config.to, to);

    for (var index in forData) {
        var item = forData[index];

        for (var stepIndex in config.each) {
            var step = config.each[stepIndex];
            processStep(step, data, item);
        }

        to.push(item);
    }

    return result;

};
