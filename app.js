/**
 * Created by Razon on 6/11/2016.
 */

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
// var mongoUtil = require( './mongoUtil' );
module.exports = io;
require('./realtime/realtime');
// require('./realtime/chat');


app.set("views", "./views");
app.set('view engine', 'ejs');


app.use(express.static("node_modules/jquery/dist"));
app.use(express.static(__dirname + '/public/'));


var main_router = require('./routers/main_router');
app.use(main_router);


// Running the server on port 3000
server.listen(3000, function () {
    console.log("Server is running on port 3000");
});








// mongoUtil.connectToServer( function( err ) {
//     // start the rest of your app here
//     if(err){ return console.log(err); }
//
//     console.log("Connected to server");
//     server.listen(3000, function () {
//         console.log("Server is running on port 3000");
//     });
//
//
// } );
//
