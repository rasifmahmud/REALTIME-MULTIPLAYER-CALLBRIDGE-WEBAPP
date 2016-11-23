$.holdReady(true);
console.log("http://"+window.location.hostname+":"+window.location.port+"/play");
var socket = io.connect("http://"+window.location.hostname+":"+window.location.port);
socket.on("data_coming", function(data){
    console.log(data);
    player1Cards=data.player1Cards;
    player2Cards = data.player2Cards;
    player3Cards=data.player3Cards;
    player4Cards=data.player4Cards;
    ultimate = data.ultimate;
$.holdReady(false);
});


