var validateSchema = require('./validation/basicSchemaValidation');
var validateStep = require('./validation/basicStepValidation');

var steps = {};
steps.map = require('./steps/map');
steps.arrayToObject = require('./steps/arrayToObject');
steps.dataArrayToObject = require('./steps/dataArrayToObject');
steps.combine = require('./steps/combine');

var getStepFunction = function (name) {
    return steps[name];
};

var processStep = function (step, data, result) {
    getStepFunction(step[0])(step[1], data, result);
};

module.exports = function (schema, data) {
    var result = {};

    // throw error if not valid
    validateSchema(schema);

    for (var index in schema) {
        var step = schema[index];

        // throw error if not valid
        validateStep(index, step);

        processStep(step, data, result);
    }

    return result;
};
