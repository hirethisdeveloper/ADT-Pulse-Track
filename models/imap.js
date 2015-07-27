var mysql            = require("../utils/database"),
    db               = mysql.db;

exports.writeMessage = function (obj, callback) {
    db.query("INSERT into adt_alerts set dateCreated=?, alert=?, zone=?, zone_title=?, location=?", [obj.dateCreated, obj.alert, obj.zone, obj.zone_title, obj.location], function (err) {
        callback(err);
    });
};