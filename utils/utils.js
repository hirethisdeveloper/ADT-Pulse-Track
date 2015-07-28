var fs = require('fs');
// =======
exports.dbg       = function (str) {
    var dbgVar    = process.env.DBG,
        debugging = false;
    if (dbgVar == "true") console.log(str);
};
exports.config    = function (callback) {
    var configFile = process.env.HOME + "/hsa.cfg";
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