var string  = require('string'),
    utils   = require("../utils/utils.js"),
    db_imap = require("../models/imap.js"),
    inspect = require('util').inspect;
//---------------------------------------------------------------
exports.processMessage = function (cfg, message, messageAttributes) {
    var lines       = string(message).lines(),
        msgDate     = new Date(messageAttributes.date).toMysqlFormat(),
        bodyLine    = string(lines[1]).collapseWhitespace().s,
        fromLine    = lines[3],
        toLine      = lines[4],
        subjectLine = lines[5],
        obj         = {};
    //utils.dbg(bodyLine);
    utils.config(function (config) {
        if (fromLine.match(cfg.from)) {
            if (toLine.match(cfg.to)) {
                var subjArr = subjectLine.split('- ');
                // misc alerts/triggers
                if (string(bodyLine).contains("(")) {
                    obj.zone       = string(bodyLine).between('(', ')').s;
                    obj.zone_title = string(bodyLine).between('', ' (').s;
                    obj.alert      = string(bodyLine).between('set to ', '.').s;
                }

                // armed/disarmed by key fob
                else if (string(bodyLine).contains('Security System') && !string(bodyLine).contains(' by ')) {
                    obj.zone       = "Security System";
                    obj.zone_title = "by key fob";
                    obj.alert      = string(bodyLine).between('Security System ', '.').s;
                }

                // armed/disarmed by access code
                else if (string(bodyLine).contains('Security System') && string(bodyLine).contains(' by ')) {
                    obj.zone       = "Security System";
                    obj.zone_title = string(bodyLine).between('by ', '.').s;
                    obj.alert      = string(bodyLine).between('Security System ', ' by').s;
                }
                obj.location    = subjArr[1];
                obj.dateCreated = msgDate;
                //utils.dbg(inspect(obj));
                // ===============
                // save message
                db_imap.writeMessage(obj, function (err) {
                    if (err) {
                        utils.dbg("Error saving message %s", inspect(obj));
                        utils.dbg(err);
                    }
                });
            }
        }
    });
};