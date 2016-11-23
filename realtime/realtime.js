/**
 * Created by razon on 11/8/16.
 */
var io = require('../app');
// var db = require('../app');
// ei json e dynamically userder add o remove kora hoi
var connectedUsers = {};
// total number of users so far accessed the website
var total_number = 0;
// this is an array of current boards containing board type object array
var current_players = {};
var _ = require("lodash");
var uuid = require("node-uuid");
var Deck = require("../ai/dealer");
var log_out_time = 300000;
module.exports = io;

// what each board contains
function Board(board_index) {
    this.id = board_index;
    this.socket_array = [];
    this.deck = new Deck();
    this.full = 0;
    this.game_start = 0;
    this.bitmap = [0, 0, 0, 0];
    this.ai_number = 0;
}


// whenever a player is connected for the first time
io.sockets.on('connection', function (socket) {




    // adding an unique userid to the socket
    socket.userID = uuid.v4();
    // saying this is the first game for the socket
    socket.game_number = 0;
    //ek board er shobar call deya shesh hoise kina eita check korar jonno flag
    socket.call_flag = 0;
    // ei socket wala user koto call dise ta track rakhlam
    socket.call = 0;
    // socket er kono activity na thakle take dhongsho kore deya hobe
    socket.log_out_timer = setTimeout(function () {
        socket.emit("log_out brother");
        socket.disconnect();
    }, log_out_time);
    // socket ti ke duniar shathe shongjukto kora holo
    add_user(current_players);

    total_number++;

    // 1st game er jonno dealer card deal kore dibe
    deal_cards(current_players);


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

        // socket ti jodi undefined hoi tar mane kono karone disconnected howar agei
        //jodi socket ti harie jai tobe return kore ber hoye ashi ei function theke
        console.log("############# SOCKET.ON.DISCONNECT STARTS HERE #################");
        if (socket == undefined) {
            console.log("socket is undefined, return kore dilam");
            return;
        }

        // tar mane socket ti undefined na
        else {

            // socket tar timeout jei function ta ta remove kore dichchi karon socket e jodi na thake
            // time out die ki korbo
            clearTimeout(socket.log_out_timer);

            // connected users theke socket ti bad die dilam


            delete connectedUsers[socket.userID];

            // ei socket ti jei board er ongsho ta amar hate nie ashlam
            var current_board = current_players[socket.index];

            // amon o to hote pare oi board ta agei kono karone remove hoye geche
            if (!current_board) {
                console.log("current board khuje pawa jai ni return kore dilam");
                return;
            }

            // jei socket ti nie amra alochona korchi ta akhon o jodi kono hand shuru na kore
            if (current_board.game_start == 0) {
                // bortoman board e jono shonkha 1 komalam
                current_board.full--;
                // amar hate current board er under e jei socket array ta ache ta nie rakhlam
                var temp_sock_array = current_board.socket_array;

                // array er jei index e socket ti ache ta khuje nie ashlam
                var index = temp_sock_array.indexOf(socket);

                // jodi khuje pawa jai
                if (index != -1) {

                    // array theke remove kore dilam
                    temp_sock_array.splice(index, 1);
                    console.log("khela shuru howar agei socket ti tar list theke remove hoye gelo");
                    console.log(socket.ultimate);
                    var player_index = socket.ultimate - 1;
                    // bitmap 0 kore dilam oi player ta tar mane khali ache
                    current_board.bitmap[player_index] = 0;

                    // jodi pura list tai khali hoye jai tobe nishchinte object tai delete kore dei current players theke
                    if (temp_sock_array.length == 0) {
                        delete current_players[socket.index];
                        console.log("khela shuru howar agei board ti delete hoye gelo");
                        console.log(socket.ultimate);
                    }

                }


            }
            // khela jome geche
            else {
                // amar hate current board er under e jei socket array ta ache ta nie rakhlam
                var temp_sock_array = current_board.socket_array;

                // array er jei index e socket ti ache ta khuje nie ashlam
                var index = temp_sock_array.indexOf(socket);

                // jodi khuje pawa jai
                if (index != -1) {

                    // array theke remove kore dilam
                    temp_sock_array.splice(index, 1);
                    console.log("khela shuru howar pore socket ti tar list theke remove hoye gelo");
                    console.log(socket.ultimate);
                    var player_index = socket.ultimate - 1;
                    // bitmap 0 kore dilam oi player ta tar mane khali ache
                    current_board.bitmap[player_index] = 0;

                    // jodi pura list tai khali hoye jai tobe nishchinte object tai delete kore dei current players theke
                    if (temp_sock_array.length == 0) {
                        delete current_players[socket.index];
                        console.log("khela shuru howar pore board ti tar list theke remove hoye gelo");
                        console.log(socket.ultimate);
                    }
                    else {
                        current_board.ai_number++;
                        for (var i = 0; i < temp_sock_array.length; i++) {
                            temp_sock_array[i].emit("ai emerged", (player_index + 1));
                        }
                    }

                }

            }

        }
        console.log("Length of current Players: " + Object.keys(current_players).length);

        console.log("############# SOCKET.ON.DISCONNECT ENDS HERE #################");
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
    function add_user(current_players) {
        if (!socket) {
            return;
        }
        connectedUsers[socket.userID] = socket;
        var new_flag = 0;
        if (Object.keys(current_players).length == 0) {

            var board_index = uuid.v4();
            socket.index = board_index;
            var current_board = new Board(board_index);
            current_board.socket_array.push(socket);
            current_board.full++;

            current_board.bitmap[0] = 1;

            socket.ultimate = 1;
            current_players[board_index] = current_board;
            new_flag = 1;

        }
        else {
            for (var key in current_players) {
                if (current_players.hasOwnProperty(key)) {
                    var bitmap_index = -1;
                    var current_board = current_players[key];
                    if (!current_board) {
                        return;
                    }
                    if (current_board.full < 4) {
                        socket.index = key;
                        current_board.socket_array.push(socket);
                        current_board.full++;
                        bitmap_index = current_board.bitmap.indexOf(0);
                        socket.ultimate = bitmap_index + 1;
                        console.log("I am here:   " + socket.ultimate);
                        current_board.bitmap[bitmap_index] = 1;
                        new_flag = 1;
                        break;
                    }

                }
            }

        }
        if (new_flag == 0) {
            var board_index = uuid.v4();
            socket.index = board_index;

            var current_board = new Board(board_index);
            current_board.socket_array.push(socket);
            current_board.full++;

            current_board.bitmap[0] = 1;

            socket.ultimate = 1;
            current_players[board_index] = current_board;

        }

    }

    function deal_cards(current_players) {
        if (!socket) {
            return;
        }
        console.log("#########################NEW USER CONNECTED STARTS#############################");
        console.log("Total Users: " + total_number);
        console.log("Game Number:" + socket.game_number);
        var dealer = current_players[socket.index].deck;
        userNumber = socket.ultimate;
        // userNumber= Object.keys(connectedUsers).length;
        if (userNumber == 1) {
            if (current_players[socket.index].full == 1) {
                dealer.super_init();
            }
            console.log("#########################SHUFFLING DONE");
            var data = JSON.parse(JSON.stringify(dealer));
            delete data.super_init;
            data.ultimate = userNumber;
            socket.emit('data_coming', data);
            console.log(dealer.player1Cards);


        }

        else if (userNumber == 2) {
            var data = JSON.parse(JSON.stringify(dealer));
            delete data.super_init;
            data.ultimate = userNumber;
            socket.emit('data_coming', data);
            console.log(dealer.player2Cards);


        }
        else if (userNumber == 3) {
            var data = JSON.parse(JSON.stringify(dealer));
            delete data.super_init;
            data.ultimate = userNumber;
            socket.emit('data_coming', data);
            console.log(dealer.player3Cards);


        }
        else {
            var data = JSON.parse(JSON.stringify(dealer));
            delete data.super_init;
            data.ultimate = 4;
            socket.emit('data_coming', data);
            console.log(dealer.player4Cards);


        }

        console.log("#########################NEW USER CONNECTED ENDS###############################");

    }
    // socket.on("reconnect",function () {
    //    socket.disconnect();
    //     console.log("Kono ek khankir pola reconnect korar cheshta koreche or mayere chod");
    // });

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

