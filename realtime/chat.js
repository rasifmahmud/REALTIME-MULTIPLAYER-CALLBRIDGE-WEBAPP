/**
 * Created by razon on 11/19/16.
 */
var io = require('../app');
var mongoUtil = require( '../mongoUtil' );



io.sockets.on('connection', function (socket) {
    var db = mongoUtil.getDb();
    // var col = db.collection('messages');
    // col.find().limit(100).sort({_id: 1}).toArray(function (err, res) {
    //     if (err) throw err;
    //     socket.emit('output', res);
    // });
    // var sendStatus = function (s) {
    //     socket.emit('status', s);
    // };

    // Wait For Input
    socket.on('input', function (data) {
        var name = data.name;
        var message = data.message;
        var whiteSpacePattern = /^\s*$/;
        if (whiteSpacePattern.test(name) || whiteSpacePattern.test(message)) {

        }
        else {
            // 1st e data ta database e insert kora holo
            // col.insertOne({name: name, message: message}, function () {
                // now last sent message ta ke protita client er kache pathano hochche
                io.emit('output', [data]);
                // ekhane shudhumatro corresponding client ke send status pathano hochche
                // sendStatus({
                //     message: "Message Sent",
                //     clear: true
                // })
            // });

        }

    });



});
