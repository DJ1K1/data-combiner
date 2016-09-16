var combine = require(__dirname + '/src/combine.index.js');

module.exports = function (schema) {

    return function (data) {
        return combine(schema, data);
    };

};
