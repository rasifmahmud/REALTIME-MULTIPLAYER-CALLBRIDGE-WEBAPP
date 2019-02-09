/**
 * Created by Razon on 6/11/2016.
 */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
module.exports = io;
require('./realtime/realtime');


app.set("views", "./views");
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));


const main_router = require('./routers/main_router');
const session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
const sharedSession = require("express-socket.io-session");

// Use express-session middleware for express
app.use(session);

// Use shared session middleware for socket.io
// setting autoSave:true
io.use(sharedSession(session, {
    autoSave: true
}));
app.use(main_router);


// Running the server on port 3000
server.listen(3000, function () {
    console.log("Server is running on port 3000");
});








