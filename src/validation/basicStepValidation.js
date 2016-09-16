module.exports = function (index, step) {
    if (!Array.isArray(step)) {
        throw new Error('schema step ' + index + ' should be an array');
    }

    return true;
};
