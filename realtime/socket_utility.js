/**
 * Created by razon on 11/24/16.
 */
// what each board contains

var Deck = require("../ai/dealer");
var uuid = require("node-uuid");

function Board(board_index) {
    this.id = board_index;
    this.socket_array = [];
    this.deck = new Deck();
    this.full = 0;
    this.game_start = 0;
    this.bitmap = [0, 0, 0, 0];
    this.ai_number = 0;
}


function SocketUtility() {
    this.log_out_time = 200000;

    this.init_socket = function (socket) {
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
        }, this.log_out_time);

    }


    this.add_user = function (socket, current_players, connectedUsers) {
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

    this.deal_cards = function (socket, current_players) {
        if (!socket) {
            return;
        }
        console.log("#########################NEW USER CONNECTED STARTS#############################");
        // console.log("Total Users: " + total_number);
        console.log("Game Number:" + socket.game_number);
        var dealer = current_players[socket.index].deck;
        var userNumber = socket.ultimate;
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
    this.disconnect = function (socket,connectedUsers,current_players) {

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
    }
}
module.exports = SocketUtility;
