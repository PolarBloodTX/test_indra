'use-strict'

module.exports.isNum = function (n) {
    return /^\d+$/.test(n);
}

module.exports.Respuesta = function (resp_cod, resp_msg, data) {
    this.resp_cod = resp_cod;
    this.resp_msg = resp_msg;
    this.data = data;
    return JSON.stringify(this);
};

module.exports.map_object = function (path, obj_replace) {
    const propertyMap = require(`../models/${path}.json`);
    const newObj = {};
    for (let key in obj_replace) {
        const newKey = propertyMap[key] || key;
        newObj[newKey] = obj_replace[key];
    }
    return newObj;
}
