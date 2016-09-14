module.exports = function (step) {

    if (typeof step !== 'object') {
        return false;
    }

    var stringParamNames = ['for', 'key', 'dict', 'to'];

    for (var index in stringParamNames) {
        var name = stringParamNames[index];

        if (typeof step[name] !== 'string') {
            return false;
        }
    }

    return true;
};
