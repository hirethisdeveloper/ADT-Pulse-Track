var fs = require('fs');
// =======
exports.twoDigits = function (d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
};
exports.dbg       = function (str) {
    var dbgVar    = process.env.DBG,
        debugging = false;
    if (dbgVar == "true") console.log(str);
};
exports.config    = function (callback) {
    var configFile = "../hsa.cfg";
    fs.readFile(configFile, 'utf8', function (fserr, data) {
        if (fserr) throw fserr;
        try {
            callback(JSON.parse(data));
        }
        catch (err) {
            console.log("Error parsing config file: %s", err);
            process.exit(0);
        }
    });
};