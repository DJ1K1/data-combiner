module.exports = function (schema) {
    if (!Array.isArray(schema)) {
        throw new Error('schema shoud be an array');
    }

    return true;
};
