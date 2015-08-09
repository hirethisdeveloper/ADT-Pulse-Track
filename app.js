var pmx = require('pmx');
var probe = pmx.probe();

var Imap      = require('imap'),
    fs        = require('fs'),
    db_imap   = require("./models/imap.js"),
    imapCtrl  = require("./controllers/imap.js"),
    inspect   = require('util').inspect,
    utils     = require("./utils/utils.js"),
    dbgVar    = process.env.DBG,
    debugging = (dbgVar == "true") ? true : false;

var counter = probe.counter({
    name : 'New Alerts'
});

utils.config(function (config) {
    var imap    = new Imap(config.imap);
    var timeout;
    var restart = function () {
        clearTimeout(timeout);
        timeout = setInterval(exec, 10000);
    };
    var exec    = function () {
        utils.dbg("Starting exec...");
        var openInbox = function (cb) {
                imap.openBox('INBOX', false, cb);
            },
            v1get     = function () {
                openInbox(function (err, box) {
                    if (err) throw err;
                    var f = imap.seq.fetch('1:3', {
                        bodies: ['HEADER.FIELDS (TO FROM SUBJECT)', 'TEXT'],
                        struct: false
                    });
                    f.on('message', function (msg, seqno) {
                        var message           = "";
                        var messageAttributes = {};
                        msg.on('body', function (stream, info) {
                            var buffer = '';
                            stream.on('data', function (chunk) {
                                buffer += chunk.toString('utf8');
                            });
                            stream.once('end', function () {
                                message += buffer;
                            });
                        });
                        msg.once('attributes', function (attrs) {
                            messageAttributes = attrs;
                            //utils.dbg(inspect(attrs));
                        });
                        msg.once('end', function () {
                            var flags = messageAttributes.flags || [],
                                seen  = false;
                            for (var item in flags) {
                                if (flags[item].match(/Seen/)) seen = true;
                            }
                            if (!seen) {
                                imapCtrl.processMessage(config, message, messageAttributes);
                                counter.inc();
                            }
                            else {
                                utils.dbg("message already seen")
                            }
                            imap.setFlags(messageAttributes.uid, "\\Deleted", function (err) {
                                if (err) utils.dbg("Error setting flag: %s", err);
                            });
                        });
                    });
                    f.once('error', function (err) {
                        utils.dbg('!!Fetch error: ' + err);
                    });
                    f.once('end', function () {
                        imap.end();
                    });
                });
            };
        imap.once('ready', function () {
            v1get();
        });
        imap.once('error', function (err) {
            utils.dbg("Exec finished with connect error: " + err.code);
            //utils.dbg(err);
            //process.exit(0);
            restart();
        });
        imap.once('end', function () {
            utils.dbg('Exec finished...');
            //process.exit(0);
            restart();
        });
        imap.connect();
    };
    exec();
});