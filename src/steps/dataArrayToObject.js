var arrayToObject = require('./arrayToObject');

module.exports = function (config, data, result) {
    arrayToObject(config, data, data);
};
