var $add = require('./add');

module.exports = function (step, item, data) {

    if (!step.pipeline || !Array.isArray(step.pipeline)) {
        return;
    }

    for (var index in step.pipeline) {
        var pipeStep = step.pipeline[index];

        if (!pipeStep || typeof pipeStep !== 'object') {
            // TODO notify
            continue;
        }

        if (!pipeStep['$add']) {
            // TODO notify
            continue;
        }

        // TODO validate pipeStep

        $add(pipeStep['$add'], item, data);
    }

};
