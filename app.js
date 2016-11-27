/**
 * Created by Razon on 6/11/2016.
 */

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
module.exports = io;
require('./realtime/realtime');


app.set("views", "./views");
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));


var main_router = require('./routers/main_router');
app.use(main_router);


// Running the server on port 3000
server.listen(4000, function () {
    console.log("Server is running on port 4000");
});








