/**
 * Created by razon on 11/8/16.
 */
var io = require('../app');
// ei json e dynamically userder add o remove kora hoi
var connectedUsers = {};
// this is an array of current boards containing board type object array
var current_players = {};


var log_out_time = 200000;
var socket_utility = require("./socket_utility");
socket_utility = new socket_utility();
module.exports = io;



// whenever a player is connected for the first time
io.sockets.on('connection', function (socket) {

    socket_utility.init_socket(socket);
    // init_socket(socket);

    // socket ti ke duniar shathe shongjukto kora holo
    socket_utility.add_user(socket,current_players,connectedUsers);


    // 1st game er jonno dealer card deal kore dibe
    socket_utility.deal_cards(socket,current_players);


    socket.on('please reinitialize', function (ultimate, callback) {
        if (!socket) {
            return;
        }
        clearTimeout(socket.log_out_timer);
        socket.log_out_timer = setTimeout(function () {
            socket.emit("log_out brother");
            socket.disconnect();

        }, log_out_time);

        console.log('REINITIALIZE REQUEST');
        var index = socket.index;
        var temp_dealer = current_players[index].deck;
        var magic_number = 0;
        var temp_sock_array = current_players[index].socket_array;
        var current_game_number = socket.game_number;
        var ai_numbers = current_players[index].ai_number;
        ai_numbers = ai_numbers * current_game_number;
        for (var i = 0; i < temp_sock_array.length; i++) {
            magic_number += temp_sock_array[i].game_number;
        }
        magic_number += ai_numbers;
        magic_number = magic_number % 4;
        console.log("Magic Number: " + magic_number);

        console.log("Socket Index: ", index);
        socket.game_number = socket.game_number + 1;
        console.log("Game Number: " + socket.game_number);
        if (magic_number == 0) {
            temp_dealer.super_init();
            console.log("#########################SHUFFLING DONE FOR REINITIALIZATION");
            console.log("REQUEST MEMBER's ULTIMATE NUMBER ", ultimate);
            console.log("#########################SHUFFLING DONE FOR REINITIALIZATION");

        }

        if (ultimate == 1) {
            var data = JSON.parse(JSON.stringify(temp_dealer));
            delete data.super_init;
            console.log(temp_dealer.player1Cards);
            callback(data);


        }

        else if (ultimate == 2) {
            var data = JSON.parse(JSON.stringify(temp_dealer));
            delete data.super_init;
            console.log(temp_dealer.player2Cards);
            callback(data);


        }
        else if (ultimate == 3) {
            var data = JSON.parse(JSON.stringify(temp_dealer));
            delete data.super_init;
            console.log(temp_dealer.player3Cards);
            callback(data);


        }
        else {
            var data = JSON.parse(JSON.stringify(temp_dealer));
            delete data.super_init;
            console.log(temp_dealer.player4Cards);
            callback(data);


        }
        console.log("REINITIALIZE REQUEST DONE");

    });


    socket.on("card is going", function (data, callback) {
        if (!socket) {
            return;
        }
        clearTimeout(socket.log_out_timer);
        socket.log_out_timer = setTimeout(function () {
            socket.emit("log_out brother");
            socket.disconnect();

        }, log_out_time);

        console.log("CARD HAS COME TO SERVER: " + data);
        var temp_sock_array = current_players[socket.index].socket_array;
        for (var i = 0; i < temp_sock_array.length; i++) {
            if (temp_sock_array[i].userID == socket.userID) {
                callback(true);
                continue;
            }
            temp_sock_array[i].emit("global lock open", data.inputFlag);
            temp_sock_array[i].emit("card has come", data.card);
            callback(true);
        }
    });
    socket.on("donald trump hoyeche",function (data) {
       var temp_sock_array = current_players[socket.index].socket_array;
        if(!temp_sock_array){
            return;
        }
        for (var i=0;i<temp_sock_array.length;i++){
            if(temp_sock_array[i].userID==this.userID){
                continue;
            }
            temp_sock_array[i].emit("donald trump eshe geche",data);

        }
    });
    socket.on("call dilam", function (data) {
        if (!socket) {
            return;
        }
        clearTimeout(socket.log_out_timer);
        socket.log_out_timer = setTimeout(function () {
            socket.emit("log_out brother");
            socket.disconnect();

        }, log_out_time);

        socket.call_flag = 1;
        var ultimate = data.ultimate;
        socket.call = data.call;
        var temp_sock_array = current_players[socket.index].socket_array;
        var sum = 0;
        for (var i = 0; i < temp_sock_array.length; i++) {
            sum += temp_sock_array[i].call_flag;
        }
        sum += current_players[socket.index].ai_number;
        if (sum == 4) {
            var calls = [-1, -1, -1, -1];
            current_players[socket.index].game_start = 1;
            for (var i = 0; i < temp_sock_array.length; i++) {
                temp_sock_array[i].call_flag = 0;
                var temp_socket = current_players[socket.index].socket_array[i];
                calls[temp_socket.ultimate - 1] = temp_socket.call;

            }
            for (var i = 0; i < temp_sock_array.length; i++) {
                temp_sock_array[i].emit("calls are coming", calls, function (data) {
                    if (data) {
                        this.emit("global lock init", 0);
                        // this.emit("ai lock init", 0);
                    }
                    else {
                        console.log("Calls didnt successfully received by user");
                    }
                });
                temp_sock_array[i].emit("hide ai button");


            }


        }

    });
    // if he disconnects himself from any of the sockets they got deleted eventually
    socket.on('disconnect', function () {
        socket_utility.disconnect(socket,connectedUsers,current_players);
    });

    socket.on("its now or never", function () {
        var current_board = current_players[socket.index];
        current_board.game_start = 1;
        var robot_numbers = 4 - current_board.full;
        var robot_bitmap = [];
        for (var i = 0; i < current_board.bitmap.length; i++) {
            if (current_board.bitmap[i] == 0) {
                robot_bitmap.push(i + 1);
            }
        }

        current_board.ai_number += robot_numbers;
        current_board.full = 4;
        var temp_sock_array = current_board.socket_array;
        for (var i = 0; i < temp_sock_array.length; i++) {
            for (var j = 0; j < robot_bitmap.length; j++) {
                temp_sock_array[i].emit("ai emerged", robot_bitmap[j]);
            }
            temp_sock_array[i].emit("hide ai button");
        }
        var sum = 0;
        for (var i = 0; i < temp_sock_array.length; i++) {
            sum += temp_sock_array[i].call_flag;
        }
        sum += current_players[socket.index].ai_number;
        if (sum == 4) {
            var calls = [-1, -1, -1, -1];
            current_players[socket.index].game_start = 1;
            for (var i = 0; i < temp_sock_array.length; i++) {
                temp_sock_array[i].call_flag = 0;
                var temp_socket = current_players[socket.index].socket_array[i];
                calls[temp_socket.ultimate - 1] = temp_socket.call;

            }
            for (var i = 0; i < temp_sock_array.length; i++) {
                temp_sock_array[i].emit("calls are coming", calls, function (data) {
                    if (data) {
                        this.emit("global lock init", 0);
                        // this.emit("ai lock init", 0);
                    }
                    else {
                        console.log("Calls didnt successfully received by user");
                    }
                });


            }


        }

    });

    // chatting codes
    socket.on('input', function (data) {
        var ultimate = data.ultimate;
        var message = data.message;
        var index = socket.index;
        var current_board = current_players[index];
        var temp_sock_array = current_board.socket_array;
        for (var i = 0; i < temp_sock_array.length; i++) {
            if(temp_sock_array[i].userID == this.userID){
                continue;
            }
            temp_sock_array[i].emit("output", data);
    
        }
    
    });


});

