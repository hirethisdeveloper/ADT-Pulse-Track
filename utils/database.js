var mysql = require('mysql'),
    utils = require("./utils.js");
// =========================================== //
var settings = {
    user    : '',
    password: '',
    database: 'HSAAPP',
    host    : ""
};

exports.db = mysql.createConnection(settings);