//populating allCards array
$(document).ready(function () {

    function populateAllCards(allCards) {
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j <= 14; j++) {
                allCards[i][j - 2] = 100 * (i + 1) + j;
            }
        }
    }

//shuffling function
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

//card distribution function
    function distribute() {
        var i;
        var j;
        for (i = 0, j = 0; i < 52; i += 4) {
            player1Cards[j] = deck[i];
            player2Cards[j] = deck[i + 1];
            player3Cards[j] = deck[i + 2];
            player4Cards[j] = deck[i + 3];
            j++;
        }
    }

//sorting cards of 4 players function
    function sortThem() {
        player1Cards.sort();
        player2Cards.sort();
        player3Cards.sort();
        player4Cards.sort();
    }

//function for distributing suits
    function distributeSuits(playerCards, playerSuits) {
        for (var i = 0; i < 13; i++) {
            if (playerCards[i].toString()[0] == "1") {
                playerSuits[0].push(playerCards[i]);
            }
            else if (playerCards[i].toString()[0] == "2") {
                playerSuits[1].push(playerCards[i]);
            }
            else if (playerCards[i].toString()[0] == "3") {
                playerSuits[2].push(playerCards[i]);
            }
            else {
                playerSuits[3].push(playerCards[i]);
            }
        }
    }

    function myMax(ara) {
        if (ara.length != 0) {
            var tempMax = ara[0];
            for (var i = 1; i < ara.length; i++) {
                if (ara[i] > tempMax) {
                    tempMax = ara[i];
                }
            }
            return tempMax;
        }
        return -1;
    }

    function myMin(ara) {
        if (ara.length != 0) {
            var tempMin = ara[0];
            for (var i = 1; i < ara.length; i++) {
                if (ara[i] < tempMin) {
                    tempMin = ara[i];
                }
            }
            return tempMin;
        }
        return -1;
    }

//winning card finding function
    function winning_card(boardCards) {
        var spadeFlag = 0;
        var winner = [];
        for (var i = 0; i < boardCards.length; i++) {
            if (boardCards[i].toString()[0] == "4") {
                spadeFlag = 1;
                break;
            }
        }
        if (spadeFlag != 0) {
            return myMax(boardCards);
        }
        else {
            var key_number = boardCards[0].toString()[0];
            for (var i = 0; i < boardCards.length; i++) {
                if (boardCards[i].toString()[0] == key_number)
                    winner.push(boardCards[i]);
            }
            return myMax(winner);
        }

    }


//removing a card from players suit function

    function removeCard(playerSuits, suitIndex, tempMax) {
        if (typeof playerSuits[suitIndex] === 'undefined') {
            return;
        }
        var index;
        for (var i = 0; i < playerSuits[suitIndex].length; i++) {
            if (playerSuits[suitIndex][i] == tempMax) {
                index = i;
                break;
            }
        }
        playerSuits[suitIndex].splice(index, 1);

        for (var i = 0; i < allCards[suitIndex].length; i++) {
            if (allCards[suitIndex][i] == tempMax) {
                index = i;
                break;
            }
        }

        allCards[suitIndex].splice(index, 1);
        for (var i = 0; i < 4; i++) {
            leadCards[i] = myMax(allCards[i]);
        }

    }

//function for playing hand1 cards
    function hand1(playerSuits, myCall, myPoint) {
        var tempMax;

        // Ami joto call diechi t uthie felte shokhkhom hoyechi
        if (myPoint >= myCall || (myCall - myPoint) <= surePith(playerSuits)) {
            // tai akhon ami lutha khela khelbo
            tempMax = LuthaPlay(playerSuits, 1);
            return tempMax;
        }


        // Ami joto call disi ta akhon o uthe nai so amake ekhan theke budhdhi kore khelte hbe

        //bazare kono trump na thakle
        if (playerSuits[3].length == allCards[3].length) {
            var flag = 0;
            // 4 suit er j kono ekti lead card jodi amar kache thake sheti ami khele dibo allahr name e
            for (var i = 0; i < playerSuits.length; i++) {

                if (playerSuits[i].indexOf(leadCards[i]) >= 0) {
                    var index = playerSuits[i].indexOf(leadCards[i]);
                    tempMax = playerSuits[i][index];
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                var myCards = returnMyCardsWithoutSpade(playerSuits);
                if (myCards.length != 0) {
                    tempMax = lowestPower(myCards);
                }
                else {
                    tempMax = myMin(playerSuits[3]);
                }
            }


        }
        //bazare trump thakle , akhon ek2 budhdhi shudhdhi kore khelte hbe
        else {
            var flag = 0;
            for (var i = 0; i < playerSuits.length - 1; i++) {

                // trump bade baki 3 suit er kono lead card ache kina khuje dekhi
                if ((playerSuits[i].indexOf(leadCards[i]) >= 0) && (trumpedSuits.indexOf(i) < 0)
                    && (allCards[i].length - playerSuits[i].length) >= 4) {
                    var index = playerSuits[i].indexOf(leadCards[i]);
                    tempMax = playerSuits[i][index];
                    flag = 1;
                    break;
                }
            }
            // trump card khela hoye gese  so ami chailei akhn trump er lead card khelte pari
            if (flag == 0 && trumpFlag == 1) {
                if (playerSuits[3].indexOf(leadCards[3]) >= 0) {
                    var index = playerSuits[3].indexOf(leadCards[3]);
                    tempMax = playerSuits[3][index];
                    flag = 1;

                }
            }
            // keu trump kore nai kintu amar kache trump chara kono card nai so r kichu korar nai
            if (flag == 0 && returnMyCardsWithoutSpade(playerSuits).length == 0) {
                if (playerSuits[3].indexOf(leadCards[3]) >= 0) {
                    var index = playerSuits[3].indexOf(leadCards[3]);
                    tempMax = playerSuits[3][index];
                    flag = 1;

                }

            }
            // amar kache kono dhoroner kono lead nai so minimum khelte hbe
            if (flag == 0) {
                var myCards = returnMyCardsWithoutSpade(playerSuits);
                if (myCards.length != 0) {
                    tempMax = lowestPower(myCards);
                }
                else {
                    tempMax = myMin(playerSuits[3]);
                }

            }

        }
        if (typeof tempMax === 'undefined') {
            return;
        }

        removeCard(playerSuits, tempMax.toString()[0] - '1', tempMax);
        boardCards.push(tempMax);
        return tempMax;
    }

//function for playing hand2 cards
    function hand2(playerSuits, myCall, myPoint) {
        return hand3(playerSuits, myCall, myPoint);
    }


//function for playing hand3 cards
    function hand3(playerSuits, myCall, myPoint) {
        var suitIndex = boardCards[0].toString()[0] - '1';
        var tempMax;


        // Ami joto call diechi t uthie felte shokhkhom hoyechi
        if (myPoint >= myCall || (myCall - myPoint) <= surePith(playerSuits)) {
            // tai akhon ami lutha khela khelbo
            tempMax = LuthaPlay(playerSuits, 3);
            return tempMax;
        }


        // Ami joto call disi ta akhon o uthe nai so amake ekhan theke budhdhi kore khelte hbe
        // jodi amar kache oi suit er card thake
        if (playerSuits[suitIndex].length != 0) {
            // jodi trump er khelai hoi
            if (suitIndex == 3) {
                // amar card ta board er shobar theke boro means akhn o trump hoi nai ebong eitai oi suit er lead card
                if ((myMax(playerSuits[suitIndex]) > myMax(boardCards)) && (playerSuits[suitIndex].indexOf(leadCards[suitIndex]) >= 0)) {

                    tempMax = myMax(playerSuits[suitIndex]);
                }
                else {
                    tempMax = myMin(playerSuits[suitIndex]);
                }

            }

            // ami charao onnanno manusher kache jodi trump na thake
            else if (playerSuits[3].length == allCards[3].length) {

                // amar card ta board er shobar theke boro means akhn o trump hoi nai ebong eitai oi suit er lead card
                if ((myMax(playerSuits[suitIndex]) > myMax(boardCards)) && (playerSuits[suitIndex].indexOf(leadCards[suitIndex]) >= 0)) {

                    tempMax = myMax(playerSuits[suitIndex]);
                }
                else {
                    tempMax = myMin(playerSuits[suitIndex]);
                }
            }
            // bazar trump e vorpur
            else {
                if ((myMax(playerSuits[suitIndex]) > myMax(boardCards)) && (playerSuits[suitIndex].indexOf(leadCards[suitIndex]) >= 0)
                    && (trumpedSuits.indexOf(suitIndex) < 0) && (allCards[suitIndex].length - playerSuits[suitIndex].length >= 4 - boardCards.length)) {
                    tempMax = myMax(playerSuits[suitIndex]);
                }
                else {
                    tempMax = myMin(playerSuits[suitIndex]);
                }


            }

        }


        // oi card nai magar trump ase
        else if (playerSuits[3].length != 0) {
            var temp = [];

            // over trump korar joggota ache kina check korchi
            var boardMax = myMax(boardCards);
            for (var i = 0; i < playerSuits[3].length; i++) {
                if (playerSuits[3][i] > boardMax) {
                    temp.push(playerSuits[3][i]);
                }
            }
            //overtrump er joggota ache
            if (temp.length != 0) {
                tempMax = myMin(temp);
            }

            //overtrump er joggota nei
            else {

                // amar hater shob card except spade hudai ekta array te rakhlam

                var myCards = returnMyCardsWithoutSpade(playerSuits);

                // spade na amn ekti baje card chure dilam
                if (myCards.length != 0) {
                    tempMax = lowestPower(myCards);

                }

                // amar hater shb e ojoggo trump tar majhe shob theke ojoggo tike chure dilam
                else {
                    tempMax = myMin(playerSuits[3]);
                }

            }

            trumpedSuitFunc(trumpedSuits, suitIndex, tempMax);
        }
        // oi card o nai trump o nai bal
        else {
            var myCards = returnMyCards(playerSuits);
            // shei array theke shobtheke kom power er card ta khuje anlam
            tempMax = lowestPower(myCards);
            trumpedSuitFunc(trumpedSuits, suitIndex, tempMax);
        }
        if (typeof tempMax === 'undefined') {
            return;
        }

        removeCard(playerSuits, tempMax.toString()[0] - '1', tempMax);
        boardCards.push(tempMax);
        return tempMax;

    }

//function for playing hand4Cards


    function hand4(playerSuits, myCall, myPoint) {
        var suitIndex = boardCards[0].toString()[0] - '1';
        var tempMax;

        // Ami joto call diechi t uthie felte shokhkhom hoyechi
        if (myPoint >= myCall || (myCall - myPoint) <= surePith(playerSuits)) {
            // tai akhon ami lutha khela khelbo
            tempMax = LuthaPlay(playerSuits, 4);
            return tempMax;
        }


        // Ami joto call disi ta akhon o uthe nai so amake ekhan theke budhdhi kore khelte hbe
        // if I have a card of that suit is the ultimate case number 1

        if (playerSuits[suitIndex].length != 0) {
            var boardMax = myMax(boardCards);
            var myLeads = [];

            // boardmax card er theke boro amar kache oi suit er j card gula ache shegula my leads e handailam
            for (var i = 0; i < playerSuits[suitIndex].length; i++) {
                if (playerSuits[suitIndex][i] > boardMax) {
                    myLeads.push(playerSuits[suitIndex][i]);
                }
            }


            if (myLeads.length != 0) {

                // jodi oi suit er lead card amar kache thake tahole tar modhdhe minimum jeta sheta return korchi
                tempMax = myMin(myLeads);
            }
            else {
                // jodi na thake lead card then oi suit er shorobonimno card ti return korchi
                tempMax = myMin(playerSuits[suitIndex]);
            }
            if (typeof tempMax === 'undefined') {
                return;
            }

            // card ti amar jhuli theke remove kore dichchi
            removeCard(playerSuits, suitIndex, tempMax);
            // card ti ke board card e handie dichchi
            boardCards.push(tempMax);

            // card ti return korchi
            return tempMax;
        }

        // oi suit card nai kintu trump ache :D

        else if (playerSuits[3].length != 0) {
            var tempMax;
            var temp = [];

            // over trump korar joggota ache kina check korchi
            var boardMax = myMax(boardCards);
            for (var i = 0; i < playerSuits[3].length; i++) {
                if (playerSuits[3][i] > boardMax) {
                    temp.push(playerSuits[3][i]);
                }
            }
            //overtrump er joggota ache
            if (temp.length != 0) {
                tempMax = myMin(temp);
            }

            //overtrump er joggota nei
            else {

                // amar hater shob card except spade hudai ekta array te rakhlam

                var myCards = returnMyCardsWithoutSpade(playerSuits);

                // spade na amn ekti baje card chure dilam
                if (myCards.length != 0) {
                    tempMax = lowestPower(myCards);

                }

                // amar hater shb e ojoggo trump tar majhe shob theke ojoggo tike chure dilam
                else {
                    tempMax = myMin(playerSuits[3]);
                }

            }
            if (typeof tempMax === 'undefined') {
                return;
            }

            // sheti remove kore dilam
            removeCard(playerSuits, tempMax.toString()[0] - '1', tempMax);

            // board card e handailam
            boardCards.push(tempMax);

            // suit ta j amar kache nai ta janie dei
            trumpedSuitFunc(trumpedSuits, suitIndex, tempMax);
            // return korlam
            return tempMax;


        }

        // oi suit er card o nai abar trump o nai, tar mane amar kache only dui suit er card ache maximum
        else {
            var tempMax;

            //amar hater shob card ekti array te rakhlam
            var myCards = returnMyCards(playerSuits);

            // shei array theke shobtheke kom power er card ta khuje anlam
            tempMax = lowestPower(myCards);
            if (typeof tempMax === 'undefined') {
                return;
            }

            // card ti remove korlam
            removeCard(playerSuits, tempMax.toString()[0] - '1', tempMax);

            // board card e handlailam
            boardCards.push(tempMax);

            // amar kache j oi suit nei ta computer ke janalam
            trumpedSuitFunc(trumpedSuits, suitIndex, tempMax);

            // return korlam
            return tempMax;
        }


    }

    function surePith(playerSuits) {
        var allSpades = returnAllSpades();
        var sum = 0;
        // amar kache trump ache
        if (playerSuits[3].length != 0) {
            for (var i = 0; i < allSpades.length; i++) {
                if (playerSuits[3].indexOf(allSpades[i]) >= 0) {
                    sum++;
                }
                else {
                    break;
                }
            }
        }
        return sum;
    }

    function returnAllSpades() {
        var ara = [];
        for (var i = 0; i < player1Suits[3].length; i++) {
            ara.push(player1Suits[3][i]);
        }
        for (var i = 0; i < player2Suits[3].length; i++) {
            ara.push(player2Suits[3][i]);
        }
        for (var i = 0; i < player3Suits[3].length; i++) {
            ara.push(player3Suits[3][i]);
        }
        for (var i = 0; i < player4Suits[3].length; i++) {
            ara.push(player4Suits[3][i]);
        }
        if (ara.length !== 0) {
            ara.sort();
            ara.reverse();
        }
        return ara;

    }

    function LuthaPlay(playerSuits, hand) {
        console.log("Lutha play starts man " + hand.toString());
        var tempMin;
        if (hand == 1) {
            if (trumpFlag == 0) {
                var myCardsWithoutSpade = returnMyCardsWithoutSpade(playerSuits);
                if (myCardsWithoutSpade.length != 0) {
                    tempMin = lowestPower(myCardsWithoutSpade);
                }
                else {
                    var myCards = returnMyCards(playerSuits);
                    tempMin = lowestPower(myCards);
                }
            }
            else {
                var myCards = returnMyCards(playerSuits);
                tempMin = lowestPower(myCards);

            }
            if (typeof tempMin === 'undefined') {
                return;
            }

            // card ti remove korlam
            removeCard(playerSuits, tempMin.toString()[0] - '1', tempMin);

            // board card e handlailam
            boardCards.push(tempMin);

            return tempMin;
        }
        var suitIndex = boardCards[0].toString()[0] - '1';

        // amar kache oi suit er card ache tai oi suit er minimum card ta chure dei
        if (playerSuits[suitIndex].length != 0) {
            tempMin = myMin(playerSuits[suitIndex]);

            if (typeof tempMin === 'undefined') {
                return;
            }

            // card ti remove korlam
            removeCard(playerSuits, tempMin.toString()[0] - '1', tempMin);

            // board card e handlailam
            boardCards.push(tempMin);
            return tempMin;

        }
        // amar kache oi suit er card nai
        var myCards = returnMyCards(playerSuits);
        tempMin = myMin(myCards);
        if (typeof tempMin === 'undefined') {
            return;
        }

        // card ti remove korlam
        removeCard(playerSuits, tempMin.toString()[0] - '1', tempMin);

        // board card e handlailam
        boardCards.push(tempMin);

        // amar kache j oi suit nei ta computer ke janalam
        trumpedSuitFunc(trumpedSuits, suitIndex, tempMin);

        // return korlam
        return tempMin;


    }


// return all my cards
    function returnMyCards(playerSuits) {
        var myCards = [];

        // amar hater shob card hudai ekta array te rakhlam
        for (var i = 0; i < playerSuits.length; i++) {
            for (var j = 0; j < playerSuits[i].length; j++) {
                myCards.push(playerSuits[i][j]);
            }
        }
        return myCards;
    }

// return all my cards except the spades

    function returnMyCardsWithoutSpade(playerSuits) {
        var myCards = [];

        // amar hater shob card hudai ekta array te rakhlam
        for (var i = 0; i < playerSuits.length - 1; i++) {
            for (var j = 0; j < playerSuits[i].length; j++) {
                myCards.push(playerSuits[i][j]);
            }
        }
        return myCards;
    }


//kono ekta array er shob theke kom power er card return er function
    function lowestPower(myCards) {
        var tempMax = myCards[0];
        var tempPower = myCards[0] % 100;
        for (var i = 1; i < myCards.length; i++) {
            if (myCards[i] % 100 < tempPower) {
                tempPower = myCards[i] % 100;
                tempMax = myCards[i];
            }

        }
        return tempMax;

    }

// kono ekta suit karo kache na thakle shei suit er index trumped suit e handailam

    function trumpedSuitFunc(trumpedSuits, suitIndex, myCard) {
        if (trumpedSuits.length == 0) {
            trumpedSuits.push(suitIndex);
        }
        else {
            if (trumpedSuits.indexOf(suitIndex) < 0) {
                trumpedSuits.push(suitIndex);
            }
        }
        // ami bastobei trump korechi
        if (myCard.toString()[0] === '4' && trumpFlag == 0) {
            trumpFlag = 1;
            console.log("Trump kora hoilo ei first time");
        }
    }

    function winPlayer(winCard) {
        for (var i = 0; i < 13; i++) {
            if (player1Cards[i] == winCard) {
                return 1;
            }
            else if (player2Cards[i] == winCard) {
                return 2;
            }
            else if (player3Cards[i] == winCard) {
                return 3;
            }
            else if (player4Cards[i] == winCard) {
                return 4;
            }

        }
    }

//clearing winning card from the top left corner just showing for 1 second
    /*function clearWinningCard(winning_card) {
     //document.getElementById(winning_card).style.opacity = "0";
     vanishFlag=0;
     clearTimeout(lame);
     }*/
// function for increasing the point of the winning player
    function increasePoint(lastWinner) {
        playerPoints[lastWinner - 1]++;
    }


// empty board function and showing the winning card in the top left corner and eventually after 1 secong vanishing the card
    function emptyBoard(winning_card) {
        if (boardCards.length == 4) {
            // increasing the point of player who wins the game
            playerPoints[lastWinner - 1]++;

            if (lastWinner == 1) {
                console.log("Player1 Call: " + player1Call.toString() + " Player1 Point: " + playerPoints[0].toString());

            }
            else if (lastWinner == 2) {
                console.log("Player2 Call: " + player2Call.toString() + " Player2 Point: " + playerPoints[1].toString());
                console.log(playerPoints[lastWinner - 1]);

            }
            else if (lastWinner == 3) {
                console.log("Player3 Call: " + player3Call.toString() + " Player3 Point: " + playerPoints[2].toString());
                console.log(playerPoints[lastWinner - 1]);

            }
            else if (lastWinner == 4) {
                console.log("Player4 Call: " + player4Call.toString() + " Player4 Point: " + playerPoints[3].toString());
            }


            // if player3 (user) wins he needs to wait to play the next hand until the animation finishes
            if (lastWinner == ultimate) {
                nunuFlag = 1;
            }
            var x = boardCards.pop();
            var x2 = boardCards.pop();
            var x3 = boardCards.pop();
            var x4 = boardCards.pop();

            //balchal = setTimeout(function(){vanishFunc(x,x2,x3,x4,winning_card);},1000);
            animate2 = setTimeout(function () {
                make_pile_to_winner(lastWinner, x, x2, x3, x4, winning_card);
            }, 1500);
            document.getElementById(x).style.opacity = "0.2";
            document.getElementById(x2).style.opacity = "0.2";
            document.getElementById(x3).style.opacity = "0.2";
            document.getElementById(x4).style.opacity = "0.2";
            document.getElementById(winning_card).style.opacity = "1";
            vanishFlag = 1;
            pile_flag = 0;


        }
    }

// vanishing cards graphically and showing winning card graphically
    /*function vanishFunc(x,x2,x3,x4,winning_card){
     document.getElementById(x).style.opacity = "0";
     document.getElementById(x2).style.opacity = "0";
     document.getElementById(x3).style.opacity = "0";
     document.getElementById(x4).style.opacity = "0";

     // showing the winning card in the corner
     document.getElementById(winning_card).style.opacity = "1";
     document.getElementById(winning_card).style.setProperty("-webkit-transition", "all 0.7s ease-out");
     document.getElementById(winning_card).style.webkitTransform = "rotate(0deg)";
     document.getElementById(winning_card).style.setProperty("top", "9%");
     document.getElementById(winning_card).style.setProperty("left", "4%");

     //giving 1 second time to show the winning card and then clear the board
     lame = setTimeout(function(){clearWinningCard(winning_card);},1000);

     clearTimeout(balchal);

     }*/


    function make_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card) {
        //THIS METHOD WILL MOVE ALL FOUR BOARD CARD TOGETHER AND MAKE PILE


        //FOR PLAYER1

        //STARTING POSITION
        //top: 33%;   left:  34.5%;
        //DESIRED POSITION
        //top: 43%;  left:  41.5%;	angle:   0deg;


        //FOR PLAYER TWO

        //STARTING POSITION
        //top: 33%;  left:  45.5%;
        //DESIRED POSITION
        //top: 43%;  left:  41.54%;	angle:   0deg;


        //FOR PLAYER THREE

        //STARTING POSITION
        //top: 49%;  left:  34.5%;
        //DESIRED POSITION
        //top: 43%;  left:  41.58%;	angle:   0deg;


        //FOR PLAYER FOUR

        //STARTING POSITION
        //top: 33%;  left:  45.5%;
        //DESIRED POSITION
        //top: 43%;  left:  41.62%;	angle:   0deg;


        //var card1 = player1Cards[hand_index1];
        //var card2 = player2Cards[hand_index2];
        //var card3 = player3Cards[hand_index3];
        //var card4 = player4Cards[hand_index4];


        //NOW ALL FOUR CARD WILL BE MOVED TO THE CENTER AS PILE

        document.getElementById(hand_index1).style.opacity = "1";
        document.getElementById(hand_index2).style.opacity = "1";
        document.getElementById(hand_index3).style.opacity = "1";
        document.getElementById(hand_index4).style.opacity = "1";
        clearTimeout(animate2);


        vanishFlag = 0;


        if (pile_flag == 0) {
            document.getElementById(hand_index1).style.setProperty("-webkit-transition", "all 0.2s ease-in-out");
            document.getElementById(hand_index1).style.setProperty("top", "43%");
            document.getElementById(hand_index1).style.setProperty("left", "41.5%");
            document.getElementById(hand_index1).style.webkitTransform = "rotate(0deg)";
            clearTimeout(animate2);
            animate2 = setTimeout(function () {
                make_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
            }, 180);
            pile_flag = 1;
        }


        else if (pile_flag == 1) {
            document.getElementById(hand_index2).style.setProperty("-webkit-transition", "all 0.2s ease-in-out");
            document.getElementById(hand_index2).style.setProperty("top", "43%");
            document.getElementById(hand_index2).style.setProperty("left", "41.54%");
            document.getElementById(hand_index2).style.webkitTransform = "rotate(0deg)";
            clearTimeout(animate2);
            animate2 = setTimeout(function () {
                make_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
            }, 180);
            pile_flag = 2;
        }

        else if (pile_flag == 2) {
            document.getElementById(hand_index4).style.setProperty("-webkit-transition", "all 0.2s ease-in-out");
            document.getElementById(hand_index4).style.setProperty("top", "43%");
            document.getElementById(hand_index4).style.setProperty("left", "41.58%");
            document.getElementById(hand_index4).style.webkitTransform = "rotate(0deg)";
            clearTimeout(animate2);
            animate2 = setTimeout(function () {
                make_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
            }, 180);
            pile_flag = 3;
        }


        else if (pile_flag == 3) {
            document.getElementById(hand_index3).style.setProperty("-webkit-transition", "all 0.2s ease-in-out");
            document.getElementById(hand_index3).style.setProperty("top", "43%");
            document.getElementById(hand_index3).style.setProperty("left", "41.62%");
            document.getElementById(hand_index3).style.webkitTransform = "rotate(0deg)";
            clearTimeout(animate2);
            animate2 = setTimeout(function () {
                make_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
            }, 280);
            pile_flag = 4;

        }

        else if (pile_flag == 4) {
            clearTimeout(animate2);
            animate2 = setTimeout(function () {
                make_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
            }, 300);
            pile_flag = 5;
        }

        //NOW MOVE THE PILE TO THE WINNER AND VANISH IT

        else if (pile_flag == 5) {
            clearTimeout(animate2);
            pile_flag = 0;
            pass_flag = 0;
            document.getElementById(hand_index1).style.setProperty("opacity", "0");
            document.getElementById(hand_index2).style.setProperty("opacity", "0");
            document.getElementById(hand_index3).style.setProperty("opacity", "0");
            document.getElementById(hand_index4).style.setProperty("opacity", "0");


            vanish_balloon(lastWinner);


            pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card);
        }


    }


    function pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card) {

        //THE PILE WILL MOVE TO THE WINNER PLAYER
        //AND GET VANISHED

        //var card1 = player1Cards[hand_index1];
        //var card2 = player2Cards[hand_index2];
        //var card3 = player3Cards[hand_index3];
        //var card4 = player4Cards[hand_index4];

        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // console.log(player1Suits);
        // console.log(player2Suits);
        // console.log(player3Suits);
        // console.log(player4Suits);
        console.log(player1Suits[0].length + player1Suits[1].length + player1Suits[2].length + player1Suits[3].length);
        console.log(player2Suits[0].length + player2Suits[1].length + player2Suits[2].length + player2Suits[3].length);
        console.log(player3Suits[0].length + player3Suits[1].length + player3Suits[2].length + player3Suits[3].length);
        console.log(player4Suits[0].length + player4Suits[1].length + player4Suits[2].length + player4Suits[3].length);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        if (winner_player == 1) {
            if (pass_flag == 0) {
                document.getElementById(hand_index1).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index1).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index1).style.setProperty("top", "25%");
                document.getElementById(hand_index1).style.setProperty("left", "10%");
                document.getElementById(hand_index1).style.setProperty("opacity", "0");

                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 1;
            }
            else if (pass_flag == 1) {


                document.getElementById(hand_index2).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index2).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index2).style.setProperty("top", "25%");
                document.getElementById(hand_index2).style.setProperty("left", "10%");
                document.getElementById(hand_index2).style.setProperty("opacity", "0");

                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 2;
            }
            else if (pass_flag == 2) {


                document.getElementById(hand_index3).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index3).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index3).style.setProperty("top", "25%");
                document.getElementById(hand_index3).style.setProperty("left", "10%");
                document.getElementById(hand_index3).style.setProperty("opacity", "0");

                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 3;
            }
            else if (pass_flag == 3) {


                document.getElementById(hand_index4).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index4).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index4).style.setProperty("top", "25%");
                document.getElementById(hand_index4).style.setProperty("left", "10%");
                document.getElementById(hand_index4).style.setProperty("opacity", "0");

                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 4;
            }
            else if (pass_flag == 4) {


                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 500);
                pass_flag = 5;

            }

            else if (pass_flag == 5) {

                pass_flag = 0;
                if (ultimate == 1) {
                    if (player1Suits[0].length + player1Suits[1].length + player1Suits[2].length + player1Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 2) {
                    if (player2Suits[0].length + player2Suits[1].length + player2Suits[2].length + player2Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 3) {
                    if (player3Suits[0].length + player3Suits[1].length + player3Suits[2].length + player3Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 4) {
                    if (player4Suits[0].length + player4Suits[1].length + player4Suits[2].length + player4Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                clearTimeout(animate2);
                vanishFlag = 0;

                document.getElementById(hand_index1).style.display = "none";
                document.getElementById(hand_index2).style.display = "none";
                document.getElementById(hand_index3).style.display = "none";
                document.getElementById(hand_index4).style.display = "none";


                //chudi = 0;
                //play();
                //lame = setTimeout(function(){clearWinningCard(winning_card);},1000);

                // jodi eitai shesh hand hoi mane player 3 er total card 0 hoye jai taile abar khela shuru


            }
        }

        else if (winner_player == 2) {
            if (pass_flag == 0) {
                document.getElementById(hand_index1).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index1).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index1).style.setProperty("top", "25%");
                document.getElementById(hand_index1).style.setProperty("left", "75%");
                document.getElementById(hand_index1).style.setProperty("opacity", "0");

                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 1;
            }
            else if (pass_flag == 1) {


                document.getElementById(hand_index2).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index2).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index2).style.setProperty("top", "25%");
                document.getElementById(hand_index2).style.setProperty("left", "75%");
                document.getElementById(hand_index2).style.setProperty("opacity", "0");

                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 2;
            }
            else if (pass_flag == 2) {


                document.getElementById(hand_index3).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index3).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index3).style.setProperty("top", "25%");
                document.getElementById(hand_index3).style.setProperty("left", "75%");
                document.getElementById(hand_index3).style.setProperty("opacity", "0");

                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 3;
            }
            else if (pass_flag == 3) {


                document.getElementById(hand_index4).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index4).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index4).style.setProperty("top", "25%");
                document.getElementById(hand_index4).style.setProperty("left", "75%");
                document.getElementById(hand_index4).style.setProperty("opacity", "0");

                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 4;
            }
            else if (pass_flag == 4) {


                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 500);
                pass_flag = 5;

            }

            else if (pass_flag == 5) {

                pass_flag = 0;
                if (ultimate == 1) {
                    if (player1Suits[0].length + player1Suits[1].length + player1Suits[2].length + player1Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 2) {
                    if (player2Suits[0].length + player2Suits[1].length + player2Suits[2].length + player2Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 3) {
                    if (player3Suits[0].length + player3Suits[1].length + player3Suits[2].length + player3Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 4) {
                    if (player4Suits[0].length + player4Suits[1].length + player4Suits[2].length + player4Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                clearTimeout(animate2);
                vanishFlag = 0;

                document.getElementById(hand_index1).style.display = "none";
                document.getElementById(hand_index2).style.display = "none";
                document.getElementById(hand_index3).style.display = "none";
                document.getElementById(hand_index4).style.display = "none";
                //chudi = 0;
                //play();
                //lame = setTimeout(function(){clearWinningCard(winning_card);},1000);
                // jodi eitai shesh hand hoi mane player 3 er total card 0 hoye jai taile abar khela shuru


            }
        }

        else if (winner_player == 4) {
            if (pass_flag == 0) {
                document.getElementById(hand_index1).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index1).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index1).style.setProperty("top", "75%");
                document.getElementById(hand_index1).style.setProperty("left", "75%");
                document.getElementById(hand_index1).style.setProperty("opacity", "0");

                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 1;
            }
            else if (pass_flag == 1) {


                document.getElementById(hand_index2).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index2).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index2).style.setProperty("top", "75%");
                document.getElementById(hand_index2).style.setProperty("left", "75%");
                document.getElementById(hand_index2).style.setProperty("opacity", "0");

                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 2;
            }
            else if (pass_flag == 2) {


                document.getElementById(hand_index3).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index3).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index3).style.setProperty("top", "75%");
                document.getElementById(hand_index3).style.setProperty("left", "75%");
                document.getElementById(hand_index3).style.setProperty("opacity", "0");

                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 3;
            }
            else if (pass_flag == 3) {


                document.getElementById(hand_index4).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index4).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index4).style.setProperty("top", "75%");
                document.getElementById(hand_index4).style.setProperty("left", "75%");
                document.getElementById(hand_index4).style.setProperty("opacity", "0");

                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 4;
            }
            else if (pass_flag == 4) {


                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 500);
                pass_flag = 5;

            }

            else if (pass_flag == 5) {

                pass_flag = 0;
                if (ultimate == 1) {
                    if (player1Suits[0].length + player1Suits[1].length + player1Suits[2].length + player1Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 2) {
                    if (player2Suits[0].length + player2Suits[1].length + player2Suits[2].length + player2Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 3) {
                    if (player3Suits[0].length + player3Suits[1].length + player3Suits[2].length + player3Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 4) {
                    if (player4Suits[0].length + player4Suits[1].length + player4Suits[2].length + player4Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }

                clearTimeout(animate2);
                vanishFlag = 0;

                document.getElementById(hand_index1).style.display = "none";
                document.getElementById(hand_index2).style.display = "none";
                document.getElementById(hand_index3).style.display = "none";
                document.getElementById(hand_index4).style.display = "none";
                //chudi = 0;
                //play();
                //lame = setTimeout(function(){clearWinningCard(winning_card);},1000);
// jodi eitai shesh hand hoi mane player 3 er total card 0 hoye jai taile abar khela shuru


            }
        }

        else if (winner_player == 3) {
            if (pass_flag == 0) {
                document.getElementById(hand_index1).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index1).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index1).style.setProperty("top", "75%");
                document.getElementById(hand_index1).style.setProperty("left", "10%");
                document.getElementById(hand_index1).style.setProperty("opacity", "0");

                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 1;
            }
            else if (pass_flag == 1) {


                document.getElementById(hand_index2).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index2).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index2).style.setProperty("top", "75%");
                document.getElementById(hand_index2).style.setProperty("left", "10%");
                document.getElementById(hand_index2).style.setProperty("opacity", "0");

                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 2;
            }
            else if (pass_flag == 2) {


                document.getElementById(hand_index3).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index3).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index3).style.setProperty("top", "75%");
                document.getElementById(hand_index3).style.setProperty("left", "10%");
                document.getElementById(hand_index3).style.setProperty("opacity", "0");

                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 3;
            }
            else if (pass_flag == 3) {


                document.getElementById(hand_index4).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                document.getElementById(hand_index4).style.webkitTransform = "scale(0.01)";
                document.getElementById(hand_index4).style.setProperty("top", "75%");
                document.getElementById(hand_index4).style.setProperty("left", "10%");
                document.getElementById(hand_index4).style.setProperty("opacity", "0");

                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 0);
                pass_flag = 4;
            }
            else if (pass_flag == 4) {


                clearTimeout(animate2);
                animate2 = setTimeout(function () {
                    pass_pile_to_winner(winner_player, hand_index1, hand_index2, hand_index3, hand_index4, winning_card)
                }, 500);
                pass_flag = 5;

            }

            else if (pass_flag == 5) {

                pass_flag = 0;
                if (ultimate == 1) {
                    if (player1Suits[0].length + player1Suits[1].length + player1Suits[2].length + player1Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 2) {
                    if (player2Suits[0].length + player2Suits[1].length + player2Suits[2].length + player2Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 3) {
                    if (player3Suits[0].length + player3Suits[1].length + player3Suits[2].length + player3Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }
                else if (ultimate == 4) {
                    if (player4Suits[0].length + player4Suits[1].length + player4Suits[2].length + player4Suits[3].length == 0) {

                        players_point_calculate();

                    }
                }


                clearTimeout(animate2);
                vanishFlag = 0;

                document.getElementById(hand_index1).style.display = "none";
                document.getElementById(hand_index2).style.display = "none";
                document.getElementById(hand_index3).style.display = "none";
                document.getElementById(hand_index4).style.display = "none";


                // ek game shesh so reinitialize kortesi
                // jodi eitai shesh hand hoi mane player 3 er total card 0 hoye jai taile abar khela shuru

                //chudi = 0;
                //play();
                //lame = setTimeout(function(){clearWinningCard(winning_card);},1000);

            }


            //document.getElementById(card4).style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            //document.getElementById(card4).style.webkitTransform = "scale(0)";
            //document.getElementById(card4).style.setProperty("top", "75%");
            //document.getElementById(card4).style.setProperty("left", "10%");


            //document.getElementById(card3).style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            //document.getElementById(card3).style.webkitTransform = "scale(0)";
            //document.getElementById(card3).style.setProperty("top", "75%");
            //document.getElementById(card3).style.setProperty("left", "10%");
            // ######################## Now plater3(user) is ready for the next move so his click flag is set to on

        }
        // ek game shesh so reinitialize kortesi
        if (lastWinner == ultimate) {
            nunuFlag = 0;
        }

        

    }


    function players_point_calculate() {


        if (anim_flag == 0) {

            //players' point will be calculated now


            //point calculation of player1

            player1_previous_point = player1_present_point;
            if (player1Call - remaining_call1 == -1 || player1Call - remaining_call1 == 0) {
                if (player1Call == 0) {
                    player1_present_point += 5;
                }
                else if (player1Call == 8) {
                    player1_present_point += 13;
                }
                else {
                    player1_present_point += player1Call;
                }
            }
            else {
                if (player1Call == 0) {
                    player1_present_point -= 5;
                }
                else {
                    player1_present_point -= player1Call;
                }

            }


            //point calculation of player2

            player2_previous_point = player2_present_point;
            if (player2Call - remaining_call2 == -1 || player2Call - remaining_call2 == 0) {
                if (player2Call == 0) {
                    player2_present_point += 5;
                }
                else if (player2Call == 8) {
                    player2_present_point += 13;
                }
                else {
                    player2_present_point += player2Call;
                }
            }
            else {
                if (player2Call == 0) {
                    player2_present_point -= 5;
                }
                else {
                    player2_present_point -= player2Call;
                }

            }


            //point calculation of player3

            player3_previous_point = player3_present_point;
            if (player3Call - remaining_call3 == -1 || player3Call - remaining_call3 == 0) {
                if (player3Call == 0) {
                    player3_present_point += 5;
                }
                else if (player3Call == 8) {
                    player3_present_point += 13;
                }
                else {
                    player3_present_point += player3Call;
                }
            }
            else {
                if (player3Call == 0) {
                    player3_present_point -= 5;
                }
                else {
                    player3_present_point -= player3Call;
                }

            }


            //point calculation of player4

            player4_previous_point = player4_present_point;
            if (player4Call - remaining_call4 == -1 || player4Call - remaining_call4 == 0) {
                if (player4Call == 0) {
                    player4_present_point += 5;
                }
                else if (player4Call == 8) {
                    player4_present_point += 13;
                }
                else {
                    player4_present_point += player4Call;
                }
            }
            else {
                if (player4Call == 0) {
                    player4_present_point -= 5;
                }
                else {
                    player4_present_point -= player4Call;
                }

            }
        }


        //NOW CUSION_POINT_DISPLAY WILL COME TO PLAY


        if (anim_flag == 0) {
            //player1 cusion_point_display

            cusion_point_display(player1_present_point, player1_previous_point, 1);

            anim = setTimeout(players_point_calculate, 100);
            anim_flag = 1;
        }

        else if (anim_flag == 1) {
            //player2 cusion_point_display

            cusion_point_display(player2_present_point, player2_previous_point, 2);
            anim = setTimeout(players_point_calculate, 110);
            anim_flag = 2;

        }


        else if (anim_flag == 2) {
            //player2 cusion_point_display
            anim = setTimeout(players_point_calculate, 120);
            cusion_point_display(player3_present_point, player3_previous_point, 3);

            anim_flag = 3;
            //audio.play();
        }


        else if (anim_flag == 3) {
            //player2 cusion_point_display

            cusion_point_display(player4_present_point, player4_previous_point, 4);

            anim_flag = 0;
            clearTimeout(anim);
            console.log(player1Suits);
            console.log(player2Suits);
            console.log(player3Suits);
            console.log(player4Suits);
            reinitialize();
        }
    }


//     //shuffling cards here
//     shuffle(deck);
//
// //distributing cards
//     distribute();
//
// //sorting cards of 4 players
//     sortThem();
//
//distributing suits among players
    distributeSuits(player1Cards, player1Suits);
    distributeSuits(player2Cards, player2Suits);
    distributeSuits(player3Cards, player3Suits);
    distributeSuits(player4Cards, player4Suits);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    // console.log(player1Suits);
    // console.log(player2Suits);
    // console.log(player3Suits);
    // console.log(player4Suits);
    console.log(player1Suits[0].length + player1Suits[1].length + player1Suits[2].length + player1Suits[3].length);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
//populate all cards array
    populateAllCards(allCards);


    /*
     ###################################################CallBridge.js############################################
     ############################################################################################################
     ############################################################################################################

     */

    function display_start() {
        //THESE ARE FOR SCROLLING TO CERTAIN HEIGHT
        //var scrollH = ;
        window.scrollTo(0, 0);
        window.scrollTo(0, window.innerHeight * 0.23);    //162px is target

        move_card_suit();
    }

    function move_card_suit() {
        //This is for animating to place card_suit in center
        //DESIRED POSITION
        //top: 43%; left:  41.0156%;

        document.getElementById("card_suit").style.opacity = "1";
        document.getElementById("card_suit").style.setProperty("-webkit-transition", "top 1s ease-out");
        document.getElementById("card_suit").style.setProperty("top", "43%");
        if (time_flag == 0) {
            time_flag++;
            animate_move_card_suit = setTimeout(move_card_suit, 1000);
        }
        else {
            time_flag = 0;
            clearTimeout(animate_move_card_suit);
            move_card_single();


            //SHOW POINT BALLS FOR THE FIRST TIME

            if (player1_present_point == player1_previous_point) {

                //audio.play();
                cusion_point_display(player1_present_point, player1_previous_point, 1);
                // cusion_point_display(-11,0,1);
            }

            if (player2_present_point == player2_previous_point) {

                //audio.play();
                cusion_point_display(player2_present_point, player2_previous_point, 2);
                //cusion_point_display(-11,0,2);
            }

            if (player3_present_point == player3_previous_point) {
                cusion_point_display(player3_present_point, player3_previous_point, 3);
                // cusion_point_display(-25,0,3);
            }

            if (player4_present_point == player4_previous_point) {
                cusion_point_display(player4_present_point, player4_previous_point, 4);
                //cusion_point_display(-49,0,4);
            }
        }

    }

    function move_card_single() {
        //This is getting one card out of centered suit
        //STARTING POSITION
        //top: 43%; left:  41.5%;
        //DESIRED POSITION
        //top: 39%; left:  41.5%;

        document.getElementById("card_single").style.opacity = "1";
        move_card_single_top_flag = move_card_single_top_flag - 0.5;
        document.getElementById("card_single").style.top = move_card_single_top_flag + '%';
        if (move_card_single_top_flag <= 39) {
            clearTimeout(animate_move_card_single);
            move_player_1st_card("player1_card_single");
        }
        else {
            animate_move_card_single = setTimeout(move_card_single, 8);
        }
    }

    function move_player_1st_card(img_id) {
        //This is giving all players' first card


        //FOR PLAYER ONE

        //STARTING POSITION
        //top: 39%; left:  41.5%;
        //DESIRED POSITION
        //top: 18%;   left:  24%;

        //FOR PLAYER TWO

        //STARTING POSITION
        //top: 39%; left:  41.5%;
        //DESIRED POSITION
        //top: 18%;  left:  59%;

        //FOR PLAYER THREE

        //STARTING POSITION
        //top: 39%; left:  41.5%;
        //DESIRED POSITION
        //top: 60%;   left:  24%;

        //FOR PLAYER FOUR

        //STARTING POSITION
        //top: 39%; left:  41.5%;
        //DESIRED POSITION
        //top: 60%;  left:  59%;

        if (card_distribute_counter == 6) {
            document.getElementById("card_suit").style.opacity = "0";
        }
        if (card_distribute_counter == 7) {
            clearTimeout(animate_move_player_1st_card);
            document.getElementById("card_single").style.opacity = "0";
            player_card_push();
        }
        else {
            document.getElementById(img_id).style.opacity = "1";

            if (img_id === "player1_card_single") {
                if (card_distribute_counter > 1) {
                    document.getElementById("player1_fixed_card").style.opacity = "1";
                }
                move_player_1st_card_top_flag = move_player_1st_card_top_flag - 0.6;
                move_player_1st_card_left_flag = move_player_1st_card_left_flag - 0.5;
            }
            else if (img_id === "player2_card_single") {
                if (card_distribute_counter > 1) {
                    document.getElementById("player2_fixed_card").style.opacity = "1";
                }
                move_player_1st_card_top_flag = move_player_1st_card_top_flag - 0.6;
                move_player_1st_card_left_flag = move_player_1st_card_left_flag + 0.5;
            }
            else if (img_id === "player3_card_single") {
                if (card_distribute_counter > 1) {
                    document.getElementById("player3_fixed_card").style.opacity = "1";
                }
                move_player_1st_card_top_flag = move_player_1st_card_top_flag + 0.6;
                move_player_1st_card_left_flag = move_player_1st_card_left_flag - 0.5;
            }
            else if (img_id === "player4_card_single") {
                if (card_distribute_counter > 1) {
                    document.getElementById("player4_fixed_card").style.opacity = "1";
                }
                move_player_1st_card_top_flag = move_player_1st_card_top_flag + 0.6;
                move_player_1st_card_left_flag = move_player_1st_card_left_flag + 0.5;
            }

            document.getElementById(img_id).style.top = move_player_1st_card_top_flag + '%';
            document.getElementById(img_id).style.left = move_player_1st_card_left_flag + '%';
            if (move_player_1st_card_top_flag <= 18 && img_id === "player1_card_single") {
                clearTimeout(animate_move_player_1st_card);
                move_player_1st_card_top_flag = 39;
                move_player_1st_card_left_flag = 41.5;
                move_player_1st_card("player2_card_single");
            }
            else if (move_player_1st_card_top_flag <= 18 && img_id === "player2_card_single") {
                clearTimeout(animate_move_player_1st_card);
                move_player_1st_card_top_flag = 39;
                move_player_1st_card_left_flag = 41.5;
                move_player_1st_card("player3_card_single");
            }
            else if (move_player_1st_card_top_flag >= 60 && img_id === "player3_card_single") {
                clearTimeout(animate_move_player_1st_card);
                move_player_1st_card_top_flag = 39;
                move_player_1st_card_left_flag = 41.5;
                move_player_1st_card("player4_card_single");
            }
            else if (move_player_1st_card_top_flag >= 60 && img_id === "player4_card_single") {
                clearTimeout(animate_move_player_1st_card);
                move_player_1st_card_top_flag = 39;
                move_player_1st_card_left_flag = 41.5;
                card_distribute_counter = card_distribute_counter + 1;
                move_player_1st_card("player1_card_single");
            }
            else {
                animate_move_player_1st_card = setTimeout(function () {
                    move_player_1st_card(img_id)
                }, 3);
            }
        }


    }

    function player_card_push() {
        //This function will push player 1,2,3,4's own card to them
        document.getElementById("player1_card_single").style.opacity = "0";
        document.getElementById("player2_card_single").style.opacity = "0";
        document.getElementById("player3_card_single").style.opacity = "0";
        document.getElementById("player4_card_single").style.opacity = "0";

        document.getElementById("player1_fixed_card").style.setProperty("-webkit-transition", "left 1s ease-out");
        document.getElementById("player1_fixed_card").style.setProperty("left", "23%");
        document.getElementById("player2_fixed_card").style.setProperty("-webkit-transition", "left 1s ease-out");
        document.getElementById("player2_fixed_card").style.setProperty("left", "60%");
        document.getElementById("player3_fixed_card").style.setProperty("-webkit-transition", "left 1s ease-out");
        document.getElementById("player3_fixed_card").style.setProperty("left", "23%");
        document.getElementById("player4_fixed_card").style.setProperty("-webkit-transition", "left 1s ease-out");
        document.getElementById("player4_fixed_card").style.setProperty("left", "60%");


        if (ultimate == 1) {
            document.getElementById("player1_fixed_card").style.setProperty("-webkit-transition", "all 1s ease-out");
            document.getElementById("player1_fixed_card").style.webkitTransform = "scale(0)";
            player_card_display(player1Cards);
        }
        else if (ultimate == 2) {
            document.getElementById("player2_fixed_card").style.setProperty("-webkit-transition", "all 1s ease-out");
            document.getElementById("player2_fixed_card").style.webkitTransform = "scale(0)";
            player_card_display(player2Cards);
        }
        else if (ultimate == 3) {
            document.getElementById("player3_fixed_card").style.setProperty("-webkit-transition", "all 1s ease-out");
            document.getElementById("player3_fixed_card").style.webkitTransform = "scale(0)";
            player_card_display(player3Cards);
        }
        else if (ultimate == 4) {
            document.getElementById("player4_fixed_card").style.setProperty("-webkit-transition", "all 1s ease-out");
            document.getElementById("player4_fixed_card").style.webkitTransform = "scale(0)";
            player_card_display(player4Cards);
        }


    }

    function player_card_display(playerCards) {
        //This method will distribute and display player3's card
        //STARTING POSITION OF ALL CARDS OF PLAYER3
        //top: 60%; left:  24%;
        //DESIRED POSTION OF FIRST CARD
        //top: 80%; left:  24.0%;
        //GAP WILL BE 2.5%
        //DESIRED POSITION OF 13TH CARD
        //top: 80%;  left:  57.2%;


        if (time_flag == 0) {
            time_flag++;
            animate = setTimeout(function () {
                player_card_display(playerCards)
            }, 1500);
        }
        else {
            time_flag = 0;
            clearTimeout(animate);
            call_subwindow();
        }
        var left_flag = 22.6;
        var time_flag2 = 1;
        var zIndex_value = 100;
        for (var i = 0; i < 13; i++) {
            left_flag += 2.6;
            zIndex_value += i;
            document.getElementById(playerCards[i]).addEventListener("click", function () {
                player_select_card(this.id);
            }, false);
            document.getElementById(playerCards[i]).addEventListener("mouseover", function () {
                mouse_over_card(this.id);
            }, false);
            document.getElementById(playerCards[i]).addEventListener("mouseleave", function () {
                mouse_out_card(this.id);
            }, false);
            document.getElementById(playerCards[i]).style.opacity = "1";
            document.getElementById(playerCards[i]).style.zIndex = zIndex_value;
            document.getElementById(playerCards[i]).style.setProperty("-webkit-transition", "all " + time_flag2 + "s ease-out");
            document.getElementById(playerCards[i]).style.webkitTransform = "rotate(360deg)";
            document.getElementById(playerCards[i]).style.setProperty("top", "80%");
            document.getElementById(playerCards[i]).style.setProperty("left", left_flag + "%");
            time_flag2 += 0.03;
            //time_flag2+=1;
        }
        document.getElementById("player1_call_bubble").style.setProperty("opacity", "0");
        document.getElementById("player2_call_bubble").style.setProperty("opacity", "0");
        document.getElementById("player3_call_bubble").style.setProperty("opacity", "0");
        document.getElementById("player4_call_bubble").style.setProperty("opacity", "0");


    }

    function player_select_card(clicked_id) {
        //This method will move the selected card to the playfield of player3
        //DESIRED POSTION FOR PLAYER1
        //top: 32%;       left:  34%;
        //DESIRED POSTION FOR PLAYER2
        //top: 32%;       left:  34%;
        //DESIRED POSTION FOR PLAYER3
        //top: 49%;       left:  34%;
        //DESIRED POSTION FOR PLAYER4
        //top: 49%;       left:  50%;


        if (inputFlag == ultimate && clickFlag == 0 && nunuFlag == 0 && globalLock != -1 && socket_sending_done == 1) {

            // amar khela kintu first hand er khela na , board e age thekei kichu card ase
            if (boardCards.length != 0) {
                var clickIndex = clicked_id.toString()[0] - '1';
                var suitIndex = boardCards[0].toString()[0] - '1';

                // jei suit er khela ta amar kache ase kintu ami onno card khelar try kortesi
                if (ultimate == 1) {
                    if ((player1Suits[suitIndex].length != 0 && suitIndex != clickIndex)) {

                    }
                    // thik moto khellam
                    else {
                        clickFlag = 1;
                        socket_sending_done = 0;
                        players_card_rearrange(clicked_id, player1Suits);

                        curClick = clicked_id;
                        var temp = curClick;

                        cardShowOnBoard(temp, "rotate(-45deg)", "33%", "34.5%");

                    }
                }
                else if (ultimate == 2) {
                    if ((player2Suits[suitIndex].length != 0 && suitIndex != clickIndex)) {

                    }
                    // thik moto khellam
                    else {
                        clickFlag = 1;
                        socket_sending_done = 0;
                        players_card_rearrange(clicked_id, player2Suits);

                        curClick = clicked_id;
                        var temp = curClick;

                        cardShowOnBoard(temp, "rotate(45deg)", "33%", "45.5%");

                    }
                }
                else if (ultimate == 3) {
                    if ((player3Suits[suitIndex].length != 0 && suitIndex != clickIndex)) {

                    }
                    // thik moto khellam
                    else {
                        clickFlag = 1;
                        socket_sending_done = 0;
                        players_card_rearrange(clicked_id, player3Suits);

                        curClick = clicked_id;
                        var temp = curClick;
                        cardShowOnBoard(temp, "rotate(45deg)", "49%", "34.5%");

                    }
                }
                else {
                    if ((player4Suits[suitIndex].length != 0 && suitIndex != clickIndex)) {

                    }
                    // thik moto khellam
                    else {
                        clickFlag = 1;
                        socket_sending_done = 0;
                        players_card_rearrange(clicked_id, player4Suits);

                        curClick = clicked_id;
                        var temp = curClick;

                        cardShowOnBoard(temp, "rotate(-45deg)", "49%", "45.5%");

                    }
                }

            }
            // ami first e khelum
            else {
                var clickIndex = clicked_id.toString()[0] - '1';

                if (ultimate == 1) {
                    // amar kache shb e trum tai jeta ichcha sheta khelbo
                    if (returnMyCardsWithoutSpade(player1Suits).length == 0) {
                        clickFlag = 1;
                        socket_sending_done = 0;
                        players_card_rearrange(clicked_id, player1Suits);

                        curClick = clicked_id;
                        var temp = curClick;
                        cardShowOnBoard(temp, "rotate(-45deg)", "33%", "34.5%");

                    }
                    // amar kache trum + normal card milano
                    else {
                        // trum break hoi nai kintu trump khelar try kortsi
                        if (clickIndex == 3 && trumpFlag == 0) {

                        }
                        else {
                            clickFlag = 1;
                            socket_sending_done = 0;
                            players_card_rearrange(clicked_id, player1Suits);

                            curClick = clicked_id;
                            var temp = curClick;

                            cardShowOnBoard(temp, "rotate(-45deg)", "33%", "34.5%");

                        }

                    }
                }
                else if (ultimate == 2) {
                    // amar kache shb e trum tai jeta ichcha sheta khelbo
                    if (returnMyCardsWithoutSpade(player2Suits).length == 0) {
                        clickFlag = 1;
                        socket_sending_done = 0;
                        players_card_rearrange(clicked_id, player2Suits);

                        curClick = clicked_id;
                        var temp = curClick;

                        cardShowOnBoard(temp, "rotate(45deg)", "33%", "45.5%");

                    }
                    // amar kache trum + normal card milano
                    else {
                        // trum break hoi nai kintu trump khelar try kortsi
                        if (clickIndex == 3 && trumpFlag == 0) {

                        }
                        else {
                            clickFlag = 1;
                            socket_sending_done = 0;
                            players_card_rearrange(clicked_id, player2Suits);

                            curClick = clicked_id;
                            var temp = curClick;

                            cardShowOnBoard(temp, "rotate(45deg)", "33%", "45.5%");

                        }

                    }
                }
                else if (ultimate == 3) {
                    // amar kache shb e trum tai jeta ichcha sheta khelbo
                    if (returnMyCardsWithoutSpade(player3Suits).length == 0) {
                        clickFlag = 1;
                        socket_sending_done = 0;
                        players_card_rearrange(clicked_id, player3Suits);

                        curClick = clicked_id;
                        var temp = curClick;

                        cardShowOnBoard(temp, "rotate(45deg)", "49%", "34.5%");

                    }
                    // amar kache trum + normal card milano
                    else {
                        // trum break hoi nai kintu trump khelar try kortsi
                        if (clickIndex == 3 && trumpFlag == 0) {

                        }
                        else {
                            clickFlag = 1;
                            socket_sending_done = 0;
                            players_card_rearrange(clicked_id, player3Suits);

                            curClick = clicked_id;
                            var temp = curClick;
                            cardShowOnBoard(temp, "rotate(45deg)", "49%", "34.5%");

                        }

                    }
                }
                else {
                    // amar kache shb e trum tai jeta ichcha sheta khelbo
                    if (returnMyCardsWithoutSpade(player4Suits).length == 0) {
                        clickFlag = 1;
                        socket_sending_done = 0;
                        players_card_rearrange(clicked_id, player4Suits);

                        curClick = clicked_id;
                        var temp = curClick;
                        cardShowOnBoard(temp, "rotate(-45deg)", "49%", "45.5%");

                    }
                    // amar kache trum + normal card milano
                    else {
                        // trum break hoi nai kintu trump khelar try kortsi
                        if (clickIndex == 3 && trumpFlag == 0) {

                        }
                        else {
                            clickFlag = 1;
                            socket_sending_done = 0;
                            players_card_rearrange(clicked_id, player4Suits);

                            curClick = clicked_id;
                            var temp = curClick;
                            cardShowOnBoard(temp, "rotate(-45deg)", "49%", "45.5%");

                        }

                    }
                }

            }

            //card rearrange


        }
    }


    function mouse_over_card(hovered_id) {
        //This method will increase the scale to 1.2 of the hovered card of player3
        if (document.getElementById(hovered_id).style.top == "80%" && document.getElementById(hovered_id).style.left >= "24%") {
            document.getElementById(hovered_id).style.setProperty("-webkit-transition", "all 0.3s ease-out");
            document.getElementById(hovered_id).style.webkitTransform = "scale(1.2)";
        }

    }

    function mouse_out_card(card_id) {
        //This method will decrease the scale to 1 of the hovered card of player3
        if (document.getElementById(card_id).style.top == "80%" && document.getElementById(card_id).style.left >= "24%") {
            document.getElementById(card_id).style.setProperty("-webkit-transition", "all 0.3s ease-out");
            document.getElementById(card_id).style.webkitTransform = "scale(1)";
        }

    }

    function call_subwindow() {
        //These method will prepare the subwindow for the player3 call
        //STARTING POSITION OF FIRST CALL BLOCK
        //top: 35%;       left:  27.8%;


        //background e crad_single r card_suit k soraye dite hobe first e
        document.getElementById("card_suit").style.top = "0%";
        document.getElementById("card_single").style.top = "0%";


        document.getElementById("play_floor").style.setProperty("-webkit-transition", "opacity 1.3s ease");
        document.getElementById("play_floor").style.setProperty("opacity", "0.6");
        document.getElementById("call_background").style.setProperty("-webkit-transition", "opacity 1.3s ease");
        document.getElementById("call_background").style.setProperty("opacity", "0.9");
        document.getElementById("call_background").style.setProperty("display", "block");


        //FOR 1ST ROW FROM "NIL" TO "5"
        var left_flag_call = 27.8;
        for (var i = 0; i < 6; i++) {
            document.getElementById(i).style.display = "block";
            document.getElementById(i).style.opacity = "1";
            document.getElementById(i).style.top = "35%";
            document.getElementById(i).style.left = left_flag_call + "%";


            left_flag_call += 5.8;
        }
        ;

        //FOR 2ND ROW FROM "6" TO "10"
        left_flag_call = 30.7;
        for (var i = 6; i < 11; i++) {
            document.getElementById(i).style.display = "block";
            document.getElementById(i).style.opacity = "1";
            document.getElementById(i).style.left = left_flag_call + "%";
            document.getElementById(i).style.top = "42%";
            left_flag_call += 5.8;
        }
        ;

        //FOR 3RD ROW FROM "11" TO "12"
        left_flag_call = 39.5;
        for (var i = 11; i < 13; i++) {
            document.getElementById(i).style.display = "block";
            document.getElementById(i).style.opacity = "1";
            document.getElementById(i).style.left = left_flag_call + "%";
            document.getElementById(i).style.top = "49%";
            left_flag_call += 5.8;
        }
        ;

        //FOR 4th ROW "13"
        document.getElementById("13").style.display = "block";
        document.getElementById("13").style.opacity = "1";
        document.getElementById("13").style.left = "42.4%";
        document.getElementById("13").style.top = "56%";


    }


// x = document.getElementById(1);
// x.addEventListener('click', function () {
// 	console.log(x);
// 	call_token_selected(1);
// });


    function call_token_selected(call_token_id) {
        //This method will move and out the selected call token of player3 and save it in player3Call variable
        console.log("////////////////////GAME_CYCLE_START = " + game_cycle_start + "/////////////////////");
        if(game_cycle_start == 0){
            game_cycle_start++;

            document.getElementById("call_background").style.setProperty("-webkit-transition", "opacity 0.5s ease-out");
            document.getElementById("call_background").style.opacity = "0";
            document.getElementById("call_background").style.display = "none";
            document.getElementById("play_floor").style.setProperty("-webkit-transition", "opacity 0.5s ease-out");
            document.getElementById("play_floor").style.opacity = "1";


            for (var i = 0; i < 14; i++) {
                if (call_token_id != i.toString()) {
                    document.getElementById(i).style.display = "none";
                    document.getElementById(i).style.opacity = "0";
                }
                else {

                    if (ultimate == 1) {
                        document.getElementById(i).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                        document.getElementById(i).style.setProperty("top", "20%");
                        document.getElementById(i).style.setProperty("left", "10%");
                        document.getElementById(i).style.webkitTransform = "scale(0)";
                        document.getElementById(i).style.opacity = "0";
                        document.getElementById("player1_call_bubble").style.setProperty("opacity", "0");
                        player1Call = i;
                        socket.emit("call dilam", {ultimate: ultimate, call: player1Call});
                    }
                    else if (ultimate == 2) {
                        document.getElementById(i).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                        document.getElementById(i).style.setProperty("top", "20%");
                        document.getElementById(i).style.setProperty("left", "80%");
                        document.getElementById(i).style.webkitTransform = "scale(0)";
                        document.getElementById(i).style.opacity = "0";
                        document.getElementById("player4_call_bubble").style.setProperty("opacity", "0");
                        player2Call = i;
                        socket.emit("call dilam", {ultimate: ultimate, call: player2Call});
                    }
                    else if (ultimate == 3) {
                        document.getElementById(i).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                        document.getElementById(i).style.setProperty("top", "75%");
                        document.getElementById(i).style.setProperty("left", "10%");
                        document.getElementById(i).style.webkitTransform = "scale(0)";
                        document.getElementById(i).style.opacity = "0";
                        document.getElementById("player2_call_bubble").style.setProperty("opacity", "0");
                        player3Call = i;
                        socket.emit("call dilam", {ultimate: ultimate, call: player3Call});
                    }
                    else {
                        document.getElementById(i).style.setProperty("-webkit-transition", "all 0.5s ease-in-out");
                        document.getElementById(i).style.setProperty("top", "75%");
                        document.getElementById(i).style.setProperty("left", "80%");
                        document.getElementById(i).style.webkitTransform = "scale(0)";
                        document.getElementById(i).style.opacity = "0";
                        document.getElementById("player3_call_bubble").style.setProperty("opacity", "0");
                        player4Call = i;
                        socket.emit("call dilam", {ultimate: ultimate, call: player4Call});
                    }


                    //cusion_point_display(2,-3,3);
                }
            }


            inputFlag = 1;    //Now player3 can move the cards to the playfield
            var buttfixer = document.getElementById("ai_emerge");
            console.log(buttfixer);
            if (buttfixer) {
                buttfixer.style.visibility = "visible";
            }

        }


    }

    // var chat1 = document.getElementById("player1_chat");
    // chat1.style.top = "50%";
    // chat1.style.left = "50%";
    // chat1.style.display = "block";
    

    socket.on("calls are coming", function (data, callback) {
        showAllPlayerBalloon(data[0], data[1], data[2], data[3]);
        callback(true);
    });
    socket.on("log_out brother", function () {
        window.location.href = "../";
    });









    function show_balloon(src, top, left, id, width) {

        //THIS METHOD WILL DISPLAY IMAGE ON PLAY_FLOOR

        if (document.getElementById(id) !== null) {
            document.getElementById(id).style.setProperty("top", top + "%");
            document.getElementById(id).style.setProperty("left", left + "%");
            document.getElementById(id).style.setProperty("width", width + "%");
            document.getElementById(id).style.setProperty("height", "auto");
            document.getElementById(id).style.opacity = "1";
        }
        else {
            var img = document.createElement("img");

            img.src = src;
            img.id = id;
            img.style.setProperty("position", "absolute");
            img.style.setProperty("top", top + "%");
            img.style.setProperty("left", left + "%");
            img.style.setProperty("width", width + "%");
            img.style.setProperty("height", "auto");
            //img.style.setProperty("opacity",opacity);


            // This next line will just add it to the PLAY_SECTION
            document.getElementById("play_section").appendChild(img);
        }


    }

    function vanish_balloon(win_player) {

        var t = win_player * 1000;
        if (win_player == 1) {
            //remaining_call1++;
            //t+=remaining_call1;
            remaining_call1++;
            if (player1Call - remaining_call1 >= 0) {
                //still within the limit of call
                t += remaining_call1;
                document.getElementById(t).style.setProperty("opacity", "0");
            }
            else {
                //out of call
                if (negetive_call1 < 7) {
                    //first row of skull draw
                    show_balloon('images/CallDisplay/skull3.png', 44, 19 - 3 * negetive_call1, 1000 + negetive_call1 + 14, 3);
                }
                else {
                    show_balloon('images/CallDisplay/skull3.png', 49, 19 - 3 * (negetive_call1 - 7), 1000 + negetive_call1 + 14, 3);
                }
                negetive_call1++;

            }

        }
        else if (win_player == 2) {
            //remaining_call2++;
            //t+=remaining_call2;
            remaining_call2++;
            if (player2Call - remaining_call2 >= 0) {
                //still within the limit of call
                t += remaining_call2;
                document.getElementById(t).style.setProperty("opacity", "0");
            }
            else {
                //out of call
                if (negetive_call2 < 7) {
                    //first row of skull draw
                    show_balloon('images/CallDisplay/skull3.png', 44, 90 - 3 * negetive_call2, 2000 + negetive_call2 + 14, 3);
                }
                else {
                    show_balloon('images/CallDisplay/skull3.png', 49, 90 - 3 * (negetive_call2 - 7), 2000 + negetive_call2 + 14, 3);
                }
                negetive_call2++;

            }

        }
        else if (win_player == 3) {
            remaining_call3++;
            if (player3Call - remaining_call3 >= 0) {
                //still within the limit of call
                t += remaining_call3;
                document.getElementById(t).style.setProperty("opacity", "0");
            }
            else {
                //out of call
                if (negetive_call3 < 7) {
                    //first row of skull draw
                    show_balloon('images/CallDisplay/skull3.png', 85, 19 - 3 * negetive_call3, 3000 + negetive_call3 + 14, 3);
                }
                else {
                    show_balloon('images/CallDisplay/skull3.png', 90, 19 - 3 * (negetive_call3 - 7), 3000 + negetive_call3 + 14, 3);
                }
                negetive_call3++;

            }

        }
        else if (win_player == 4) {
            //remaining_call4++;
            //t+=remaining_call4;
            remaining_call4++;
            if (player4Call - remaining_call4 >= 0) {
                //still within the limit of call
                t += remaining_call4;
                document.getElementById(t).style.setProperty("opacity", "0");
            }
            else {
                //out of call
                if (negetive_call4 < 7) {
                    //first row of skull draw
                    show_balloon('images/CallDisplay/skull3.png', 85, 90 - 3 * negetive_call4, 4000 + negetive_call4 + 14, 3);
                }
                else {
                    show_balloon('images/CallDisplay/skull3.png', 90, 90 - 3 * (negetive_call4 - 7), 4000 + negetive_call4 + 14, 3);
                }
                negetive_call4++;

            }

        }

        //document.getElementById(t).style.setProperty("opacity","0");

    }


    function players_card_rearrange(selected_card_id, displaySuits) {

        //THIS METHOD WILL REARRANGE PLAYER 3'S CARDS AFTER EACH ROUND OF PLAY


        //Now determine how many cards have been played

        var played_cards = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < displaySuits[i].length; j++) {
                if (selected_card_id != displaySuits[i][j].toString()) {
                    played_cards++;
                }


            }
        }

        played_cards = 13 - played_cards;

        var left_start = 25.2 + (1.3 * played_cards);


        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < displaySuits[i].length; j++) {
                if (selected_card_id != displaySuits[i][j].toString()) {
                    document.getElementById(displaySuits[i][j]).style.setProperty("-webkit-transition", "all .3s ease-out");
                    document.getElementById(displaySuits[i][j]).style.setProperty("left", left_start + "%");
                    left_start += 2.6;
                }
            }
        }


    }


    function cusion_point_display(present_point, previous_point, player_no) {

        //THIS METHOD WILL DISPLAY POINT ON THE CUSION

        //NB-- NEGETIVE POINT ER KAJ KORA HYNAI


        var first_ball;
        var second_ball;
        var img0 = document.createElement("img");
        var img1 = document.createElement("img");
        var img2 = document.createElement("img");
        var working_string = "0";
        var previous_working_string = "0";


        //PREPARE THE WORKING STRING
        if (Math.abs(present_point).toString().length == 1) {
            working_string = working_string.concat(Math.abs(present_point).toString());
        }
        else {
            working_string = Math.abs(present_point).toString();
        }


        //PREPARE PREVIOUS_WORKING_STRING
        if (Math.abs(previous_point).toString().length == 1) {
            previous_working_string = previous_working_string.concat(Math.abs(previous_point).toString());
        }
        else {
            previous_working_string = Math.abs(previous_point).toString();
        }


        if (player_no == 1) {



            //ID--->FIRST DIGIT  -->1100-1109
            //ID-->SECOND DIGIT  -->1200-1209
            //ID--->MINUS SIGN   -->1110


            //CHECK IF IT IS THE FIRST TIME OF CUSION_POINT_SHOW
            //first_time_flag3=0 if it is first time

            if (present_point == previous_point) {
                //first time,both are zero


                //first zero show
                if (document.getElementById("1100") !== null) {
                    document.getElementById("1100").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1100").style.setProperty("left", "11.5%");
                    document.getElementById("1100").style.opacity = "1";
                    //clearTimeout(cusion_point_display_animate);
                }
                else {
                    img1.src = 'images/Point/0.png';
                    img1.id = 1100;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }


                //second zero show
                if (document.getElementById("1200") !== null) {
                    document.getElementById("1200").style.setProperty("-webkit-transition", "all 0.5s ease-out");
                    document.getElementById("1200").style.setProperty("top", "31%");
                    document.getElementById("1200").style.opacity = "1";
                    clearTimeout(cusion_point_display_animate);
                }
                else {
                    img2.src = 'images/Point/0.png';
                    img2.id = 1200;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);


                }

            }


            //CHECK MINUS SIGN CASE


            //1. IF IT WAS +VE,NOW +VE, DO NOTHING

            //2. IF IT WAS +VE,NOW -VE
            if (previous_point >= 0 && present_point < 0) {

                if (document.getElementById("1110") !== null) {
                    //age declare kora hoise
                    document.getElementById("1110").style.setProperty("-webkit-transition", "all 0.6s ease-out");
                    document.getElementById("1110").style.opacity = "1";
                    document.getElementById("1110").style.setProperty("top", "31%");
                    document.getElementById("1110").style.setProperty("left", "9%");
                    clearTimeout(cusion_point_display_animate);
                }

                else {
                    //age declare kora hynay
                    img0.src = 'images/Point/minus2.png';
                    img0.id = 1110;
                    img0.style.setProperty("position", "absolute");
                    img0.style.setProperty("top", "0%");
                    img0.style.setProperty("left", "-5%");
                    img0.style.setProperty("width", "2%");
                    img0.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img0);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            //3. IF IT WAS -VE,NOW +VE
            else if (previous_point < 0 && present_point >= 0) {
                document.getElementById("1110").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                document.getElementById("1110").style.opacity = "0";
                document.getElementById("1110").style.setProperty("top", "0%");
                document.getElementById("1110").style.setProperty("left", "-5%");

            }


            //4. IF IT WAS -VE,NOW -VE, DO NOTHING


            //NOW CHECK IF PRESENT_POINT AND PREVIOUS_POINT HAS SAME FIRST DIGIT
            //SECOND DIGIT CAN NEVER BE SAME

            if (working_string[0] !== previous_working_string[0]) {
                //NOT SAME,YOU HAVE TO REMOVE PREVIOUS BALL OF FIRST DIGIT

                //HIDE PREVIOUS CUSION POINTS

                //NOT FIRST TIME ENTRY OF BALLS


                first_ball = 1100 + parseInt(previous_working_string[0]);
                if (document.getElementById(first_ball) !== null) {
                    document.getElementById(first_ball).style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    //document.getElementById(first_ball).style.setProperty("top","110%");
                    document.getElementById(first_ball).style.setProperty("left", "-5%");
                    //document.getElementById(first_ball).style.opacity = "0";
                }


            }


            if (first_time_flag1 == 1) {
                //not the first entry in this method
                second_ball = 1200 + parseInt(previous_working_string[1]);
                if (document.getElementById(second_ball) !== null) {
                    document.getElementById(second_ball).style.setProperty("-webkit-transition", "all 0.4s ease-out");
                    document.getElementById(second_ball).style.setProperty("top", "0%");
                    //document.getElementById(second_ball).style.setProperty("left","-5%");
                    document.getElementById(second_ball).style.opacity = "0";
                    //audio.play();
                }


            }


            //FOR FIRST DIGIT


            if (working_string[0] == '0') {
                if (document.getElementById("1100") !== null) {
                    //age declare kora hoise

                    document.getElementById("1100").style.opacity = "1";
                    document.getElementById("1100").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    //document.getElementById("1110").style.opacity="1";
                    document.getElementById("1100").style.setProperty("top", "31%");
                    document.getElementById("1100").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/0.png';
                    img1.id = 1100;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }
            }


            else if (working_string[0] == '1') {

                if (document.getElementById("1101") !== null) {
                    //age declare kora hoise
                    document.getElementById("1101").style.opacity = "1";
                    document.getElementById("1101").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1101").style.setProperty("top", "31%");
                    document.getElementById("1101").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/1.png';
                    img1.id = 1101;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }


            }


            else if (working_string[0] == '2') {

                if (document.getElementById("1102") !== null) {
                    //age declare kora hoise
                    document.getElementById("1102").style.opacity = "1";
                    document.getElementById("1102").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1102").style.setProperty("top", "31%");
                    document.getElementById("1102").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/2.png';
                    img1.id = 1102;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }


            }


            else if (working_string[0] == '3') {
                if (document.getElementById("1103") !== null) {
                    //age declare kora hoise
                    document.getElementById("1103").style.opacity = "1";
                    document.getElementById("1103").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1103").style.setProperty("top", "31%");
                    document.getElementById("1103").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/3.png';
                    img1.id = 1103;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '4') {
                if (document.getElementById("1104") !== null) {
                    //age declare kora hoise
                    document.getElementById("1104").style.opacity = "1";
                    document.getElementById("1104").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1104").style.setProperty("top", "31%");
                    document.getElementById("1104").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/4.png';
                    img1.id = 1104;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '5') {
                if (document.getElementById("1105") !== null) {
                    //age declare kora hoise
                    document.getElementById("1105").style.opacity = "1";
                    document.getElementById("1105").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1105").style.setProperty("top", "31%");
                    document.getElementById("1105").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/5.png';
                    img1.id = 1105;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '6') {
                if (document.getElementById("1106") !== null) {
                    //age declare kora hoise
                    document.getElementById("1106").style.opacity = "1";
                    document.getElementById("1106").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1106").style.setProperty("top", "31%");
                    document.getElementById("1106").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/6.png';
                    img1.id = 1106;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '7') {
                if (document.getElementById("1107") !== null) {
                    //age declare kora hoise
                    document.getElementById("1107").style.opacity = "1";
                    document.getElementById("1107").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1107").style.setProperty("top", "31%");
                    document.getElementById("1107").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/7.png';
                    img1.id = 1107;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '8') {
                if (document.getElementById("1108") !== null) {
                    //age declare kora hoise
                    document.getElementById("1108").style.opacity = "1";
                    document.getElementById("1108").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1108").style.setProperty("top", "31%");
                    document.getElementById("1108").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/8.png';
                    img1.id = 1108;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '9') {
                if (document.getElementById("1109") !== null) {
                    //age declare kora hoise
                    document.getElementById("1109").style.opacity = "1";
                    document.getElementById("1109").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1109").style.setProperty("top", "31%");
                    document.getElementById("1109").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/9.png';
                    img1.id = 1109;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "31%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            //FOR 2ND DIGIT


            if (working_string[1] == '0') {
                if (document.getElementById("1200") !== null) {
                    //age declare kora hoise
                    document.getElementById("1200").style.opacity = "1";
                    document.getElementById("1200").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1200").style.setProperty("top", "31%");
                    document.getElementById("1200").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/0.png';
                    img2.id = 1200;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            else if (working_string[1] == '1') {
                if (document.getElementById("1201") !== null) {
                    //age declare kora hoise
                    document.getElementById("1201").style.opacity = "1";
                    document.getElementById("1201").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1201").style.setProperty("top", "31%");
                    document.getElementById("1201").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/1.png';
                    img2.id = 1201;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '2') {
                if (document.getElementById("1202") !== null) {
                    //age declare kora hoise
                    document.getElementById("1202").style.opacity = "1";
                    document.getElementById("1202").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1202").style.setProperty("top", "31%");
                    document.getElementById("1202").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/2.png';
                    img2.id = 1202;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '3') {
                if (document.getElementById("1203") !== null) {
                    //age declare kora hoise
                    document.getElementById("1203").style.opacity = "1";
                    document.getElementById("1203").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1203").style.setProperty("top", "31%");
                    document.getElementById("1203").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/3.png';
                    img2.id = 1203;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '4') {
                if (document.getElementById("1204") !== null) {
                    //age declare kora hoise
                    document.getElementById("1204").style.opacity = "1";
                    document.getElementById("1204").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1204").style.setProperty("top", "31%");
                    document.getElementById("1204").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/4.png';
                    img2.id = 1204;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '5') {
                if (document.getElementById("1205") !== null) {
                    //age declare kora hoise
                    document.getElementById("1205").style.opacity = "1";
                    document.getElementById("1205").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1205").style.setProperty("top", "31%");
                    document.getElementById("1205").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/5.png';
                    img2.id = 1205;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '6') {
                if (document.getElementById("1206") !== null) {
                    //age declare kora hoise
                    document.getElementById("1206").style.opacity = "1";
                    document.getElementById("1206").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1206").style.setProperty("top", "31%");
                    document.getElementById("1206").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/6.png';
                    img2.id = 1206;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '7') {
                if (document.getElementById("1207") !== null) {
                    //age declare kora hoise
                    document.getElementById("1207").style.opacity = "1";
                    document.getElementById("1207").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1207").style.setProperty("top", "31%");
                    document.getElementById("1207").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/7.png';
                    img2.id = 1207;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '8') {
                if (document.getElementById("1208") !== null) {
                    //age declare kora hoise
                    document.getElementById("1208").style.opacity = "1";
                    document.getElementById("1208").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1208").style.setProperty("top", "31%");
                    document.getElementById("1208").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/8.png';
                    img2.id = 1208;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '9') {
                if (document.getElementById("1209") !== null) {
                    //age declare kora hoise
                    document.getElementById("1209").style.opacity = "1";
                    document.getElementById("1209").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("1209").style.setProperty("top", "31%");
                    document.getElementById("1209").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/9.png';
                    img2.id = 1209;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "0%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            if (first_time_flag1 == 0) {
                first_time_flag1 = 1;

            }

        }
        else if (player_no == 2) {


            //ID--->FIRST DIGIT  -->2100-2109
            //ID-->SECOND DIGIT  -->2200-2209
            //ID--->MINUS SIGN   -->2110


            //CHECK IF IT IS THE FIRST TIME OF CUSION_POINT_SHOW
            //first_time_flag4=0 if it is first time


            if (present_point == previous_point) {
                //first time,both are zero


                //first zero show
                if (document.getElementById("2100") !== null) {

                    document.getElementById("2100").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2100").style.setProperty("top", "31%");
                    document.getElementById("2100").style.opacity = "1";
                    //clearTimeout(cusion_point_display_animate);
                }
                else {

                    img1.src = 'images/Point/0.png';
                    img1.id = 2100;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }


                //second zero show
                if (document.getElementById("2200") !== null) {
                    document.getElementById("2200").style.setProperty("-webkit-transition", "all 0.5s ease-out");
                    document.getElementById("2200").style.setProperty("left", "76%");
                    document.getElementById("2200").style.opacity = "1";
                    clearTimeout(cusion_point_display_animate);
                }
                else {
                    img2.src = 'images/Point/0.png';
                    img2.id = 2200;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);


                }

            }


            //CHECK MINUS SIGN CASE


            //1. IF IT WAS +VE,NOW +VE, DO NOTHING

            //2. IF IT WAS +VE,NOW -VE
            if (previous_point >= 0 && present_point < 0) {

                if (document.getElementById("2110") !== null) {
                    //age declare kora hoise
                    document.getElementById("2110").style.setProperty("-webkit-transition", "all 0.6s ease-out");
                    document.getElementById("2110").style.opacity = "1";
                    document.getElementById("2110").style.setProperty("top", "31%");
                    document.getElementById("2110").style.setProperty("left", "71.5%");
                    clearTimeout(cusion_point_display_animate);
                }

                else {
                    //age declare kora hynay
                    img0.src = 'images/Point/minus2.png';
                    img0.id = 2110;
                    img0.style.setProperty("position", "absolute");
                    img0.style.setProperty("top", "0%");
                    img0.style.setProperty("left", "105%");
                    img0.style.setProperty("width", "2%");
                    img0.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img0);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }



            //3. IF IT WAS -VE,NOW +VE
            else if (previous_point < 0 && present_point >= 0) {
                document.getElementById("2110").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                document.getElementById("2110").style.opacity = "0";
                document.getElementById("2110").style.setProperty("top", "0%");
                document.getElementById("2110").style.setProperty("left", "105%");

            }


            //4. IF IT WAS -VE,NOW -VE, DO NOTHING


            //NOW CHECK IF PRESENT_POINT AND PREVIOUS_POINT HAS SAME FIRST DIGIT
            //SECOND DIGIT CAN NEVER BE SAME

            if (working_string[0] !== previous_working_string[0]) {
                //NOT SAME,YOU HAVE TO REMOVE PREVIOUS BALL OF FIRST DIGIT

                //HIDE PREVIOUS CUSION POINTS

                //NOT FIRST TIME ENTRY OF BALLS

                first_ball = 2100 + parseInt(previous_working_string[0]);
                if (document.getElementById(first_ball) !== null) {
                    document.getElementById(first_ball).style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    //document.getElementById(first_ball).style.setProperty("top","110%");
                    document.getElementById(first_ball).style.setProperty("left", "105%");
                    //document.getElementById(first_ball).style.opacity = "0";
                }


            }


            if (first_time_flag2 == 1) {
                //not the first entry in this method
                second_ball = 2200 + parseInt(previous_working_string[1]);
                if (document.getElementById(second_ball) !== null) {
                    document.getElementById(second_ball).style.setProperty("-webkit-transition", "all 0.4s ease-out");
                    document.getElementById(second_ball).style.setProperty("top", "0%");
                    //document.getElementById(second_ball).style.setProperty("left","-5%");
                    document.getElementById(second_ball).style.opacity = "0";
                }

            }


            //FOR FIRST DIGIT


            if (working_string[0] == '0') {
                if (document.getElementById("2100") !== null) {
                    //age declare kora hoise

                    document.getElementById("2100").style.opacity = "1";
                    document.getElementById("2100").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    //document.getElementById("2110").style.opacity="1";
                    document.getElementById("2100").style.setProperty("top", "31%");
                    document.getElementById("2100").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/0.png';
                    img1.id = 2100;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }
            }


            else if (working_string[0] == '1') {

                if (document.getElementById("2101") !== null) {
                    //age declare kora hoise
                    document.getElementById("2101").style.opacity = "1";
                    document.getElementById("2101").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2101").style.setProperty("top", "31%");
                    document.getElementById("2101").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/1.png';
                    img1.id = 2101;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }


            }


            else if (working_string[0] == '2') {

                if (document.getElementById("2102") !== null) {
                    //age declare kora hoise
                    document.getElementById("2102").style.opacity = "1";
                    document.getElementById("2102").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2102").style.setProperty("top", "31%");
                    document.getElementById("2102").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/2.png';
                    img1.id = 2102;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }


            }


            else if (working_string[0] == '3') {
                if (document.getElementById("2103") !== null) {
                    //age declare kora hoise
                    document.getElementById("2103").style.opacity = "1";
                    document.getElementById("2103").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2103").style.setProperty("top", "31%");
                    document.getElementById("2103").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/3.png';
                    img1.id = 2103;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '4') {
                if (document.getElementById("2104") !== null) {
                    //age declare kora hoise
                    document.getElementById("2104").style.opacity = "1";
                    document.getElementById("2104").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2104").style.setProperty("top", "31%");
                    document.getElementById("2104").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/4.png';
                    img1.id = 2104;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '5') {
                if (document.getElementById("2105") !== null) {
                    //age declare kora hoise
                    document.getElementById("2105").style.opacity = "1";
                    document.getElementById("2105").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2105").style.setProperty("top", "31%");
                    document.getElementById("2105").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/5.png';
                    img1.id = 2105;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '6') {
                if (document.getElementById("2106") !== null) {
                    //age declare kora hoise
                    document.getElementById("2106").style.opacity = "1";
                    document.getElementById("2106").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2106").style.setProperty("top", "31%");
                    document.getElementById("2106").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/6.png';
                    img1.id = 2106;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '7') {
                if (document.getElementById("2107") !== null) {
                    //age declare kora hoise
                    document.getElementById("2107").style.opacity = "1";
                    document.getElementById("2107").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2107").style.setProperty("top", "31%");
                    document.getElementById("2107").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/7.png';
                    img1.id = 2107;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '8') {
                if (document.getElementById("2108") !== null) {
                    //age declare kora hoise
                    document.getElementById("2108").style.opacity = "1";
                    document.getElementById("2108").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2108").style.setProperty("top", "31%");
                    document.getElementById("2108").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/8.png';
                    img1.id = 2108;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '9') {
                if (document.getElementById("2109") !== null) {
                    //age declare kora hoise
                    document.getElementById("2109").style.opacity = "1";
                    document.getElementById("2109").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2109").style.setProperty("top", "31%");
                    document.getElementById("2109").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/9.png';
                    img1.id = 2109;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "0%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            //FOR 2ND DIGIT


            if (working_string[1] == '0') {
                if (document.getElementById("2200") !== null) {
                    //age declare kora hoise
                    document.getElementById("2200").style.opacity = "1";
                    document.getElementById("2200").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2200").style.setProperty("top", "31%");
                    document.getElementById("2200").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/0.png';
                    img2.id = 2200;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            else if (working_string[1] == '1') {
                if (document.getElementById("2201") !== null) {
                    //age declare kora hoise
                    document.getElementById("2201").style.opacity = "1";
                    document.getElementById("2201").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2201").style.setProperty("top", "31%");
                    document.getElementById("2201").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/1.png';
                    img2.id = 2201;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '2') {
                if (document.getElementById("2202") !== null) {
                    //age declare kora hoise
                    document.getElementById("2202").style.opacity = "1";
                    document.getElementById("2202").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2202").style.setProperty("top", "31%");
                    document.getElementById("2202").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/2.png';
                    img2.id = 2202;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '3') {
                if (document.getElementById("2203") !== null) {
                    //age declare kora hoise
                    document.getElementById("2203").style.opacity = "1";
                    document.getElementById("2203").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2203").style.setProperty("top", "31%");
                    document.getElementById("2203").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/3.png';
                    img2.id = 2203;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '4') {
                if (document.getElementById("2204") !== null) {
                    //age declare kora hoise
                    document.getElementById("2204").style.opacity = "1";
                    document.getElementById("2204").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2204").style.setProperty("top", "31%");
                    document.getElementById("2204").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/4.png';
                    img2.id = 2204;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '5') {
                if (document.getElementById("2205") !== null) {
                    //age declare kora hoise
                    document.getElementById("2205").style.opacity = "1";
                    document.getElementById("2205").style.setProperty("-webkit76nsition", "all 0.3s ease-out");
                    document.getElementById("2205").style.setProperty("top", "31%");
                    document.getElementById("2205").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/5.png';
                    img2.id = 2205;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '6') {
                if (document.getElementById("2206") !== null) {
                    //age declare kora hoise
                    document.getElementById("2206").style.opacity = "1";
                    document.getElementById("2206").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2206").style.setProperty("top", "31%");
                    document.getElementById("2206").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/6.png';
                    img2.id = 2206;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '7') {
                if (document.getElementById("2207") !== null) {
                    //age declare kora hoise
                    document.getElementById("2207").style.opacity = "1";
                    document.getElementById("2207").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2207").style.setProperty("top", "31%");
                    document.getElementById("2207").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/7.png';
                    img2.id = 2207;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '8') {
                if (document.getElementById("2208") !== null) {
                    //age declare kora hoise
                    document.getElementById("2208").style.opacity = "1";
                    document.getElementById("2208").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2208").style.setProperty("top", "31%");
                    document.getElementById("2208").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/8.png';
                    img2.id = 2208;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '9') {
                if (document.getElementById("2209") !== null) {
                    //age declare kora hoise
                    document.getElementById("2209").style.opacity = "1";
                    document.getElementById("2209").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("2209").style.setProperty("top", "31%");
                    document.getElementById("2209").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/9.png';
                    img2.id = 2209;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "31%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            if (first_time_flag2 == 0) {
                first_time_flag2 = 1;
            }


        }
        else if (player_no == 3) {


            //ID--->FIRST DIGIT  -->3100-3109
            //ID-->SECOND DIGIT  -->3200-3209
            //ID--->MINUS SIGN   -->3110


            //CHECK IF IT IS THE FIRST TIME OF CUSION_POINT_SHOW
            //first_time_flag3=0 if it is first time

            if (present_point == previous_point) {
                //first time,both are zero


                //first zero show
                if (document.getElementById("3100") !== null) {
                    document.getElementById("3100").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3100").style.setProperty("left", "11.5%");
                    document.getElementById("3100").style.opacity = "1";
                    //clearTimeout(cusion_point_display_animate);
                }
                else {
                    img1.src = 'images/Point/0.png';
                    img1.id = 3100;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }


                //second zero show
                if (document.getElementById("3200") !== null) {
                    document.getElementById("3200").style.setProperty("-webkit-transition", "all 0.5s ease-out");
                    document.getElementById("3200").style.setProperty("top", "71%");
                    document.getElementById("3200").style.opacity = "1";
                    clearTimeout(cusion_point_display_animate);
                }
                else {
                    img2.src = 'images/Point/0.png';
                    img2.id = 3200;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);


                }

            }


            //CHECK MINUS SIGN CASE


            //1. IF IT WAS +VE,NOW +VE, DO NOTHING

            //2. IF IT WAS +VE,NOW -VE
            if (previous_point >= 0 && present_point < 0) {

                if (document.getElementById("3110") !== null) {
                    //age declare kora hoise
                    document.getElementById("3110").style.setProperty("-webkit-transition", "all 0.6s ease-out");
                    document.getElementById("3110").style.opacity = "1";
                    document.getElementById("3110").style.setProperty("top", "71%");
                    document.getElementById("3110").style.setProperty("left", "9%");
                    clearTimeout(cusion_point_display_animate);
                }

                else {
                    //age declare kora hynay
                    img0.src = 'images/Point/minus2.png';
                    img0.id = 3110;
                    img0.style.setProperty("position", "absolute");
                    img0.style.setProperty("top", "110%");
                    img0.style.setProperty("left", "-5%");
                    img0.style.setProperty("width", "2%");
                    img0.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img0);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            //3. IF IT WAS -VE,NOW +VE
            else if (previous_point < 0 && present_point >= 0) {
                document.getElementById("3110").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                document.getElementById("3110").style.opacity = "0";
                document.getElementById("3110").style.setProperty("top", "100%");
                document.getElementById("3110").style.setProperty("left", "-5%");

            }


            //4. IF IT WAS -VE,NOW -VE, DO NOTHING


            //NOW CHECK IF PRESENT_POINT AND PREVIOUS_POINT HAS SAME FIRST DIGIT
            //SECOND DIGIT CAN NEVER BE SAME

            if (working_string[0] !== previous_working_string[0]) {
                //NOT SAME,YOU HAVE TO REMOVE PREVIOUS BALL OF FIRST DIGIT

                //HIDE PREVIOUS CUSION POINTS

                //NOT FIRST TIME ENTRY OF BALLS


                first_ball = 3100 + parseInt(previous_working_string[0]);
                if (document.getElementById(first_ball) !== null) {
                    document.getElementById(first_ball).style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    //document.getElementById(first_ball).style.setProperty("top","110%");
                    document.getElementById(first_ball).style.setProperty("left", "-5%");
                    //document.getElementById(first_ball).style.opacity = "0";
                }


            }


            if (first_time_flag3 == 1) {
                //not the first entry in this method
                second_ball = 3200 + parseInt(previous_working_string[1]);
                if (document.getElementById(second_ball) !== null) {
                    document.getElementById(second_ball).style.setProperty("-webkit-transition", "all 0.4s ease-out");
                    document.getElementById(second_ball).style.setProperty("top", "100%");
                    //document.getElementById(second_ball).style.setProperty("left","-5%");
                    document.getElementById(second_ball).style.opacity = "0";
                    //audio.play();
                }


            }


            //FOR FIRST DIGIT


            if (working_string[0] == '0') {
                if (document.getElementById("3100") !== null) {
                    //age declare kora hoise

                    document.getElementById("3100").style.opacity = "1";
                    document.getElementById("3100").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    //document.getElementById("3110").style.opacity="1";
                    document.getElementById("3100").style.setProperty("top", "71%");
                    document.getElementById("3100").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/0.png';
                    img1.id = 3100;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }
            }


            else if (working_string[0] == '1') {

                if (document.getElementById("3101") !== null) {
                    //age declare kora hoise
                    document.getElementById("3101").style.opacity = "1";
                    document.getElementById("3101").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3101").style.setProperty("top", "71%");
                    document.getElementById("3101").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/1.png';
                    img1.id = 3101;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }


            }


            else if (working_string[0] == '2') {

                if (document.getElementById("3102") !== null) {
                    //age declare kora hoise
                    document.getElementById("3102").style.opacity = "1";
                    document.getElementById("3102").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3102").style.setProperty("top", "71%");
                    document.getElementById("3102").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/2.png';
                    img1.id = 3102;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }


            }


            else if (working_string[0] == '3') {
                if (document.getElementById("3103") !== null) {
                    //age declare kora hoise
                    document.getElementById("3103").style.opacity = "1";
                    document.getElementById("3103").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3103").style.setProperty("top", "71%");
                    document.getElementById("3103").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/3.png';
                    img1.id = 3103;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '4') {
                if (document.getElementById("3104") !== null) {
                    //age declare kora hoise
                    document.getElementById("3104").style.opacity = "1";
                    document.getElementById("3104").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3104").style.setProperty("top", "71%");
                    document.getElementById("3104").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/4.png';
                    img1.id = 3104;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '5') {
                if (document.getElementById("3105") !== null) {
                    //age declare kora hoise
                    document.getElementById("3105").style.opacity = "1";
                    document.getElementById("3105").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3105").style.setProperty("top", "71%");
                    document.getElementById("3105").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/5.png';
                    img1.id = 3105;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '6') {
                if (document.getElementById("3106") !== null) {
                    //age declare kora hoise
                    document.getElementById("3106").style.opacity = "1";
                    document.getElementById("3106").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3106").style.setProperty("top", "71%");
                    document.getElementById("3106").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/6.png';
                    img1.id = 3106;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '7') {
                if (document.getElementById("3107") !== null) {
                    //age declare kora hoise
                    document.getElementById("3107").style.opacity = "1";
                    document.getElementById("3107").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3107").style.setProperty("top", "71%");
                    document.getElementById("3107").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/7.png';
                    img1.id = 3107;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '8') {
                if (document.getElementById("3108") !== null) {
                    //age declare kora hoise
                    document.getElementById("3108").style.opacity = "1";
                    document.getElementById("3108").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3108").style.setProperty("top", "71%");
                    document.getElementById("3108").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/8.png';
                    img1.id = 3108;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '9') {
                if (document.getElementById("3109") !== null) {
                    //age declare kora hoise
                    document.getElementById("3109").style.opacity = "1";
                    document.getElementById("3109").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3109").style.setProperty("top", "71%");
                    document.getElementById("3109").style.setProperty("left", "11.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/9.png';
                    img1.id = 3109;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "71%");
                    img1.style.setProperty("left", "-5%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            //FOR 2ND DIGIT


            if (working_string[1] == '0') {
                if (document.getElementById("3200") !== null) {
                    //age declare kora hoise
                    document.getElementById("3200").style.opacity = "1";
                    document.getElementById("3200").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3200").style.setProperty("top", "71%");
                    document.getElementById("3200").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/0.png';
                    img2.id = 3200;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            else if (working_string[1] == '1') {
                if (document.getElementById("3201") !== null) {
                    //age declare kora hoise
                    document.getElementById("3201").style.opacity = "1";
                    document.getElementById("3201").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3201").style.setProperty("top", "71%");
                    document.getElementById("3201").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/1.png';
                    img2.id = 3201;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '2') {
                if (document.getElementById("3202") !== null) {
                    //age declare kora hoise
                    document.getElementById("3202").style.opacity = "1";
                    document.getElementById("3202").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3202").style.setProperty("top", "71%");
                    document.getElementById("3202").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/2.png';
                    img2.id = 3202;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '3') {
                if (document.getElementById("3203") !== null) {
                    //age declare kora hoise
                    document.getElementById("3203").style.opacity = "1";
                    document.getElementById("3203").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3203").style.setProperty("top", "71%");
                    document.getElementById("3203").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/3.png';
                    img2.id = 3203;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '4') {
                if (document.getElementById("3204") !== null) {
                    //age declare kora hoise
                    document.getElementById("3204").style.opacity = "1";
                    document.getElementById("3204").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3204").style.setProperty("top", "71%");
                    document.getElementById("3204").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/4.png';
                    img2.id = 3204;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '5') {
                if (document.getElementById("3205") !== null) {
                    //age declare kora hoise
                    document.getElementById("3205").style.opacity = "1";
                    document.getElementById("3205").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3205").style.setProperty("top", "71%");
                    document.getElementById("3205").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/5.png';
                    img2.id = 3205;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '6') {
                if (document.getElementById("3206") !== null) {
                    //age declare kora hoise
                    document.getElementById("3206").style.opacity = "1";
                    document.getElementById("3206").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3206").style.setProperty("top", "71%");
                    document.getElementById("3206").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/6.png';
                    img2.id = 3206;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '7') {
                if (document.getElementById("3207") !== null) {
                    //age declare kora hoise
                    document.getElementById("3207").style.opacity = "1";
                    document.getElementById("3207").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3207").style.setProperty("top", "71%");
                    document.getElementById("3207").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/7.png';
                    img2.id = 3207;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '8') {
                if (document.getElementById("3208") !== null) {
                    //age declare kora hoise
                    document.getElementById("3208").style.opacity = "1";
                    document.getElementById("3208").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3208").style.setProperty("top", "71%");
                    document.getElementById("3208").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/8.png';
                    img2.id = 3208;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '9') {
                if (document.getElementById("3209") !== null) {
                    //age declare kora hoise
                    document.getElementById("3209").style.opacity = "1";
                    document.getElementById("3209").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("3209").style.setProperty("top", "71%");
                    document.getElementById("3209").style.setProperty("left", "13.5%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/9.png';
                    img2.id = 3209;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "110%");
                    img2.style.setProperty("left", "13.5%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            if (first_time_flag3 == 0) {
                first_time_flag3 = 1;

            }

        }


        else if (player_no == 4) {


            //ID--->FIRST DIGIT  -->4100-4109
            //ID-->SECOND DIGIT  -->4200-4209
            //ID--->MINUS SIGN   -->4110


            //CHECK IF IT IS THE FIRST TIME OF CUSION_POINT_SHOW
            //first_time_flag4=0 if it is first time


            if (present_point == previous_point) {
                //first time,both are zero


                //first zero show
                if (document.getElementById("4100") !== null) {

                    document.getElementById("4100").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4100").style.setProperty("top", "71%");
                    document.getElementById("4100").style.opacity = "1";
                    //clearTimeout(cusion_point_display_animate);
                }
                else {

                    img1.src = 'images/Point/0.png';
                    img1.id = 4100;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }


                //second zero show
                if (document.getElementById("4200") !== null) {
                    document.getElementById("4200").style.setProperty("-webkit-transition", "all 0.5s ease-out");
                    document.getElementById("4200").style.setProperty("left", "76%");
                    document.getElementById("4200").style.opacity = "1";
                    clearTimeout(cusion_point_display_animate);
                }
                else {
                    img2.src = 'images/Point/0.png';
                    img2.id = 4200;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);


                }

            }


            //CHECK MINUS SIGN CASE


            //1. IF IT WAS +VE,NOW +VE, DO NOTHING

            //2. IF IT WAS +VE,NOW -VE
            if (previous_point >= 0 && present_point < 0) {

                if (document.getElementById("4110") !== null) {
                    //age declare kora hoise
                    document.getElementById("4110").style.setProperty("-webkit-transition", "all 0.6s ease-out");
                    document.getElementById("4110").style.opacity = "1";
                    document.getElementById("4110").style.setProperty("top", "71%");
                    document.getElementById("4110").style.setProperty("left", "71.5%");
                    clearTimeout(cusion_point_display_animate);
                }

                else {
                    //age declare kora hynay
                    img0.src = 'images/Point/minus2.png';
                    img0.id = 4110;
                    img0.style.setProperty("position", "absolute");
                    img0.style.setProperty("top", "110%");
                    img0.style.setProperty("left", "105%");
                    img0.style.setProperty("width", "2%");
                    img0.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img0);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }



            //3. IF IT WAS -VE,NOW +VE
            else if (previous_point < 0 && present_point >= 0) {
                document.getElementById("4110").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                document.getElementById("4110").style.opacity = "0";
                document.getElementById("4110").style.setProperty("top", "100%");
                document.getElementById("4110").style.setProperty("left", "105%");

            }


            //4. IF IT WAS -VE,NOW -VE, DO NOTHING


            //NOW CHECK IF PRESENT_POINT AND PREVIOUS_POINT HAS SAME FIRST DIGIT
            //SECOND DIGIT CAN NEVER BE SAME

            if (working_string[0] !== previous_working_string[0]) {
                //NOT SAME,YOU HAVE TO REMOVE PREVIOUS BALL OF FIRST DIGIT

                //HIDE PREVIOUS CUSION POINTS

                //NOT FIRST TIME ENTRY OF BALLS

                first_ball = 4100 + parseInt(previous_working_string[0]);
                if (document.getElementById(first_ball) !== null) {
                    document.getElementById(first_ball).style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    //document.getElementById(first_ball).style.setProperty("top","110%");
                    document.getElementById(first_ball).style.setProperty("left", "-5%");
                    //document.getElementById(first_ball).style.opacity = "0";
                }


            }


            if (first_time_flag4 == 1) {
                //not the first entry in this method
                second_ball = 4200 + parseInt(previous_working_string[1]);
                if (document.getElementById(second_ball) !== null) {
                    document.getElementById(second_ball).style.setProperty("-webkit-transition", "all 0.4s ease-out");
                    document.getElementById(second_ball).style.setProperty("top", "100%");
                    //document.getElementById(second_ball).style.setProperty("left","-5%");
                    document.getElementById(second_ball).style.opacity = "0";
                }

            }


            //FOR FIRST DIGIT


            if (working_string[0] == '0') {
                if (document.getElementById("4100") !== null) {
                    //age declare kora hoise

                    document.getElementById("4100").style.opacity = "1";
                    document.getElementById("4100").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    //document.getElementById("4110").style.opacity="1";
                    document.getElementById("4100").style.setProperty("top", "71%");
                    document.getElementById("4100").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/0.png';
                    img1.id = 4100;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }
            }


            else if (working_string[0] == '1') {

                if (document.getElementById("4101") !== null) {
                    //age declare kora hoise
                    document.getElementById("4101").style.opacity = "1";
                    document.getElementById("4101").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4101").style.setProperty("top", "71%");
                    document.getElementById("4101").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/1.png';
                    img1.id = 4101;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }


            }


            else if (working_string[0] == '2') {

                if (document.getElementById("4102") !== null) {
                    //age declare kora hoise
                    document.getElementById("4102").style.opacity = "1";
                    document.getElementById("4102").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4102").style.setProperty("top", "71%");
                    document.getElementById("4102").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/2.png';
                    img1.id = 4102;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }


            }


            else if (working_string[0] == '3') {
                if (document.getElementById("4103") !== null) {
                    //age declare kora hoise
                    document.getElementById("4103").style.opacity = "1";
                    document.getElementById("4103").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4103").style.setProperty("top", "71%");
                    document.getElementById("4103").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/3.png';
                    img1.id = 4103;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '4') {
                if (document.getElementById("4104") !== null) {
                    //age declare kora hoise
                    document.getElementById("4104").style.opacity = "1";
                    document.getElementById("4104").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4104").style.setProperty("top", "71%");
                    document.getElementById("4104").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/4.png';
                    img1.id = 4104;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '5') {
                if (document.getElementById("4105") !== null) {
                    //age declare kora hoise
                    document.getElementById("4105").style.opacity = "1";
                    document.getElementById("4105").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4105").style.setProperty("top", "71%");
                    document.getElementById("4105").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/5.png';
                    img1.id = 4105;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '6') {
                if (document.getElementById("4106") !== null) {
                    //age declare kora hoise
                    document.getElementById("4106").style.opacity = "1";
                    document.getElementById("4106").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4106").style.setProperty("top", "71%");
                    document.getElementById("4106").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/6.png';
                    img1.id = 4106;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '7') {
                if (document.getElementById("4107") !== null) {
                    //age declare kora hoise
                    document.getElementById("4107").style.opacity = "1";
                    document.getElementById("4107").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4107").style.setProperty("top", "71%");
                    document.getElementById("4107").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/7.png';
                    img1.id = 4107;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '8') {
                if (document.getElementById("4108") !== null) {
                    //age declare kora hoise
                    document.getElementById("4108").style.opacity = "1";
                    document.getElementById("4108").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4108").style.setProperty("top", "71%");
                    document.getElementById("4108").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/8.png';
                    img1.id = 4108;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            else if (working_string[0] == '9') {
                if (document.getElementById("4109") !== null) {
                    //age declare kora hoise
                    document.getElementById("4109").style.opacity = "1";
                    document.getElementById("4109").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4109").style.setProperty("top", "71%");
                    document.getElementById("4109").style.setProperty("left", "74%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img1.src = 'images/Point/9.png';
                    img1.id = 4109;
                    img1.style.setProperty("position", "absolute");
                    img1.style.setProperty("top", "110%");
                    img1.style.setProperty("left", "74%");
                    img1.style.setProperty("width", "2.6%");
                    img1.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img1);

                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);
                }

            }


            //FOR 2ND DIGIT


            if (working_string[1] == '0') {
                if (document.getElementById("4200") !== null) {
                    //age declare kora hoise
                    document.getElementById("4200").style.opacity = "1";
                    document.getElementById("4200").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4200").style.setProperty("top", "71%");
                    document.getElementById("4200").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/0.png';
                    img2.id = 4200;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            else if (working_string[1] == '1') {
                if (document.getElementById("4201") !== null) {
                    //age declare kora hoise
                    document.getElementById("4201").style.opacity = "1";
                    document.getElementById("4201").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4201").style.setProperty("top", "71%");
                    document.getElementById("4201").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/1.png';
                    img2.id = 4201;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '2') {
                if (document.getElementById("4202") !== null) {
                    //age declare kora hoise
                    document.getElementById("4202").style.opacity = "1";
                    document.getElementById("4202").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4202").style.setProperty("top", "71%");
                    document.getElementById("4202").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/2.png';
                    img2.id = 4202;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '3') {
                if (document.getElementById("4203") !== null) {
                    //age declare kora hoise
                    document.getElementById("4203").style.opacity = "1";
                    document.getElementById("4203").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4203").style.setProperty("top", "71%");
                    document.getElementById("4203").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/3.png';
                    img2.id = 4203;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '4') {
                if (document.getElementById("4204") !== null) {
                    //age declare kora hoise
                    document.getElementById("4204").style.opacity = "1";
                    document.getElementById("4204").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4204").style.setProperty("top", "71%");
                    document.getElementById("4204").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/4.png';
                    img2.id = 4204;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '5') {
                if (document.getElementById("4205") !== null) {
                    //age declare kora hoise
                    document.getElementById("4205").style.opacity = "1";
                    document.getElementById("4205").style.setProperty("-webkit76nsition", "all 0.3s ease-out");
                    document.getElementById("4205").style.setProperty("top", "71%");
                    document.getElementById("4205").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/5.png';
                    img2.id = 4205;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '6') {
                if (document.getElementById("4206") !== null) {
                    //age declare kora hoise
                    document.getElementById("4206").style.opacity = "1";
                    document.getElementById("4206").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4206").style.setProperty("top", "71%");
                    document.getElementById("4206").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/6.png';
                    img2.id = 4206;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '7') {
                if (document.getElementById("4207") !== null) {
                    //age declare kora hoise
                    document.getElementById("4207").style.opacity = "1";
                    document.getElementById("4207").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4207").style.setProperty("top", "71%");
                    document.getElementById("4207").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/7.png';
                    img2.id = 4207;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '8') {
                if (document.getElementById("4208") !== null) {
                    //age declare kora hoise
                    document.getElementById("4208").style.opacity = "1";
                    document.getElementById("4208").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4208").style.setProperty("top", "71%");
                    document.getElementById("4208").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/8.png';
                    img2.id = 4208;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }
            else if (working_string[1] == '9') {
                if (document.getElementById("4209") !== null) {
                    //age declare kora hoise
                    document.getElementById("4209").style.opacity = "1";
                    document.getElementById("4209").style.setProperty("-webkit-transition", "all 0.3s ease-out");
                    document.getElementById("4209").style.setProperty("top", "71%");
                    document.getElementById("4209").style.setProperty("left", "76%");
                    clearTimeout(cusion_point_display_animate);

                }
                else {
                    //age declare kora hynay
                    img2.src = 'images/Point/9.png';
                    img2.id = 4209;
                    img2.style.setProperty("position", "absolute");
                    img2.style.setProperty("top", "71%");
                    img2.style.setProperty("left", "105%");
                    img2.style.setProperty("width", "2.6%");
                    img2.style.setProperty("height", "auto");

                    document.getElementById("play_section").appendChild(img2);
                    cusion_point_display_animate = setTimeout(function () {
                        cusion_point_display(present_point, previous_point, player_no)
                    }, 50);

                }

            }


            if (first_time_flag4 == 0) {
                first_time_flag4 = 1;
            }


        }


    }


    window.addEventListener("load", display_start, false);
    /*
     ###################################################Game.js############################################
     ############################################################################################################
     ############################################################################################################

     */
    // create a new queue
// // create a new queue
//     var queue = new Queue();
//
// // enqueue an item
//     queue.enqueue('item');
//     queue.enqueue('item2');
//
// // dequeue an item
//     var item = queue.peek();
//     console.log(item);
//     console.log(queue.getLength());
//
    socket.on("donald trump eshe geche",function (data) {
        trumpedSuitFunc(trumpedSuits,data.toString()[0]-1,data);
    });

    socket.on("hide ai button", function () {
        var elem = document.getElementById('ai_emerge');
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
    });


    socket.on("card has come", function (data) {
        cardQueue.enqueue(data);
    });

    socket.on("global lock open", function (data) {
        lockQueue.enqueue(data);

    });
    socket.on("global lock init", function (data) {
        globalLock = data;

    });

    // socket.on("ai lock init",function (data) {
    //     aiLock1 = data;
    //     aiLock2 = data;
    //     aiLock3 = data;
    //     aiLock4 = data;
    // });
    socket.on("ai emerged", function (data) {
        console.log("AI emerged: " + data);
        if (data == 1) {
            aiLock1 = data;
        }
        else if (data == 2) {
            aiLock2 = data;
        }
        else if (data == 3) {
            aiLock3 = data;
        }
        else {
            aiLock4 = data;
        }

    });


    function player1() {

        var temp;
        if (inputFlag == 1) {
            if (ultimate == 1) {
                clickFlag = 0;
                var temp = curClick;
                socket.emit("card is going", {card: temp, inputFlag: 1}, function (data) {
                    if (data) {
                        removeCard(player1Suits, curClick.toString()[0] - '1', curClick);
                        // given suit ta jodi amar kache na thake then trumpedsuit e add kore dei
                        if (boardCards.length != 0) {
                            if (boardCards[0].toString()[0] != curClick.toString()[0]) {
                                trumpedSuitFunc(trumpedSuits, curClick.toString()[0] - '1', temp);
                                socket.emit("donald trump hoyeche",temp);
                            }

                        }
                        boardCards.push((temp));
                        curTurn++;

                        if (lastWinner == 3) {
                            console.log("I am here 1");
                            var temp2 = winning_card(boardCards);
                            lastWinner = winPlayer(temp2);
                            curTurn = 1;
                            emptyBoard(winning_card(boardCards));
                            inputFlag = lastWinner;
                        }
                        else {
                            inputFlag = 3;
                        }
                        socket_sending_done = 1;
                        console.log("I am in player1 if");
                        console.log("Input flag: " + inputFlag);
                        console.log("ultimate: " + ultimate);
                        console.log("click flag: " + clickFlag);
                        console.log("nunu flag: " + nunuFlag);
                        console.log("current turn" + curTurn);

                    }
                    else {
                        console.log("Error occured in player 1");
                    }
                });
            }
            else {
                if (aiLock1 == 1) {
                    chudi = 1;
                    temp = cardSelector(curTurn, player1Suits, player1Call, playerPoints[0]);
                    curTurn++;

                    player1_play_card(temp);

                }
                else {


                    if (lockQueue.peek() == 1) {
                        lockQueue.dequeue();
                        var data = cardQueue.dequeue();
                        // globalLock = 0;
                        players_card_rearrange(data, player1Suits);
                        chudi = 1;
                        // temp=cardSelector(curTurn,player1Suits,player1Call,playerPoints[0]);
                        // card ti amar jhuli theke remove kore dichchi
                        removeCard(player1Suits, data.toString()[0] - '1', data);
                        // card ti ke board card e handie dichchi
                        boardCards.push(data);


                        curTurn++;
                        // inputFlag=3;
                        player1_play_card(data);

                        console.log("I am in player1 else");
                        console.log("ultimate: " + ultimate);
                        console.log("click flag: " + clickFlag);
                        console.log("nunu flag: " + nunuFlag);
                        console.log("current turn" + curTurn);

                    }


                    //cardShowOnBoard(temp,"rotate(-36deg)","29%","34%");
                }
            }
        }
    }

    function player2() {

        var temp;
        if (inputFlag == 2) {
            if (ultimate == 2) {
                clickFlag = 0;
                var temp = curClick;
                socket.emit("card is going", {card: temp, inputFlag: 2}, function (data) {
                    if (data) {
                        removeCard(player2Suits, curClick.toString()[0] - '1', curClick);
                        // given suit ta jodi amar kache na thake then trumpedsuit e add kore dei
                        if (boardCards.length != 0) {
                            if (boardCards[0].toString()[0] != curClick.toString()[0]) {
                                trumpedSuitFunc(trumpedSuits, curClick.toString()[0] - '1', temp);
                                socket.emit("donald trump hoyeche",temp);
                            }

                        }
                        boardCards.push((temp));
                        curTurn++;

                        if (lastWinner == 1) {
                            console.log("I am here 2");
                            var temp2 = winning_card(boardCards);
                            lastWinner = winPlayer(temp2);
                            curTurn = 1;
                            emptyBoard(winning_card(boardCards));
                            inputFlag = lastWinner;
                        }
                        else {
                            inputFlag = 1;
                        }
                        socket_sending_done = 1;
                        console.log("I am in player2 if");
                        console.log("Input flag: " + inputFlag);
                        console.log("ultimate: " + ultimate);
                        console.log("click flag: " + clickFlag);
                        console.log("nunu flag: " + nunuFlag);
                        console.log("current turn" + curTurn);

                    }
                    else {
                        console.log("Error occured in player 2");
                    }
                });
            }
            else {
                if (aiLock2 == 2) {
                    chudi = 1;
                    temp = cardSelector(curTurn, player2Suits, player2Call, playerPoints[1]);
                    curTurn++;

                    player2_play_card(temp);

                }
                else {


                    if (lockQueue.peek() == 2) {
                        lockQueue.dequeue();
                        var data = cardQueue.dequeue();
                        // globalLock = 0;

                        players_card_rearrange(data, player2Suits);
                        chudi = 1;
                        // temp=cardSelector(curTurn,player1Suits,player1Call,playerPoints[0]);
                        // card ti amar jhuli theke remove kore dichchi
                        removeCard(player2Suits, data.toString()[0] - '1', data);
                        // card ti ke board card e handie dichchi
                        boardCards.push(data);


                        curTurn++;
                        // inputFlag=1;
                        player2_play_card(data);

                        console.log("I am in player2 else");
                        console.log("Input flag: " + inputFlag);
                        console.log("ultimate: " + ultimate);
                        console.log("click flag: " + clickFlag);
                        console.log("nunu flag: " + nunuFlag);
                        console.log("current turn" + curTurn);

                    }


                    //cardShowOnBoard(temp,"rotate(36deg)","29%","47%");
                }

            }

        }

    }

    function player3() {
        if (inputFlag == 3) {
            if (ultimate == 3) {
                clickFlag = 0;
                var temp = curClick;
                socket.emit("card is going", {card: temp, inputFlag: 3}, function (data) {
                    if (data) {
                        removeCard(player3Suits, curClick.toString()[0] - '1', curClick);
                        // given suit ta jodi amar kache na thake then trumpedsuit e add kore dei
                        if (boardCards.length != 0) {
                            if (boardCards[0].toString()[0] != curClick.toString()[0]) {
                                trumpedSuitFunc(trumpedSuits, curClick.toString()[0] - '1', temp);
                                socket.emit("donald trump hoyeche",temp);
                            }

                        }
                        boardCards.push((temp));
                        curTurn++;

                        if (lastWinner == 4) {
                            console.log("I am here 3");
                            var temp2 = winning_card(boardCards);
                            lastWinner = winPlayer(temp2);
                            curTurn = 1;
                            emptyBoard(winning_card(boardCards));
                            inputFlag = lastWinner;
                        }
                        else {
                            inputFlag = 4;
                        }
                        socket_sending_done = 1;
                        console.log("I am in player3 if");
                        console.log("Input flag: " + inputFlag);
                        console.log("ultimate: " + ultimate);
                        console.log("click flag: " + clickFlag);
                        console.log("nunu flag: " + nunuFlag);
                        console.log("current turn" + curTurn);


                    }
                    else {
                        console.log("Error occured in player 3")
                    }
                });

            }
            else {
                if (aiLock3 == 3) {
                    chudi = 1;
                    temp = cardSelector(curTurn, player3Suits, player3Call, playerPoints[2]);
                    curTurn++;

                    player3_play_card(temp);

                }
                else {


                    if (lockQueue.peek() == 3) {
                        lockQueue.dequeue();
                        var data = cardQueue.dequeue();
                        // globalLock = 0;

                        players_card_rearrange(data, player3Suits);
                        chudi = 1;
                        // temp=cardSelector(curTurn,player1Suits,player1Call,playerPoints[0]);
                        // card ti amar jhuli theke remove kore dichchi
                        removeCard(player3Suits, data.toString()[0] - '1', data);
                        // card ti ke board card e handie dichchi
                        boardCards.push(data);

                        curTurn++;
                        // inputFlag=4;
                        player3_play_card(data);
                        console.log("I am in player3 else");
                        console.log("Input flag: " + inputFlag);
                        console.log("ultimate: " + ultimate);
                        console.log("click flag: " + clickFlag);
                        console.log("nunu flag: " + nunuFlag);
                        console.log("current turn" + curTurn);

                    }


                    //cardShowOnBoard(temp,"rotate(36deg)","29%","47%");
                }
            }

        }
        //clickFlag=0;
    }

    function player4() {

        var temp;
        if (inputFlag == 4) {
            if (ultimate == 4) {
                clickFlag = 0;
                var temp = curClick;
                socket.emit("card is going", {card: temp, inputFlag: 4}, function (data) {
                    if (data) {
                        removeCard(player4Suits, curClick.toString()[0] - '1', curClick);
                        // given suit ta jodi amar kache na thake then trumpedsuit e add kore dei
                        if (boardCards.length != 0) {
                            if (boardCards[0].toString()[0] != curClick.toString()[0]) {
                                trumpedSuitFunc(trumpedSuits, curClick.toString()[0] - '1', temp);
                                socket.emit("donald trump hoyeche",temp);
                            }

                        }
                        boardCards.push((temp));
                        curTurn++;

                        if (lastWinner == 2) {
                            console.log("I am here 4");
                            var temp2 = winning_card(boardCards);
                            lastWinner = winPlayer(temp2);
                            curTurn = 1;
                            emptyBoard(winning_card(boardCards));
                            inputFlag = lastWinner;
                        }
                        else {
                            inputFlag = 2;
                        }
                        socket_sending_done = 1;
                        console.log("I am in player4 if");
                        console.log("Input flag: " + inputFlag);
                        console.log("ultimate: " + ultimate);
                        console.log("click flag: " + clickFlag);
                        console.log("nunu flag: " + nunuFlag);
                        console.log("current turn" + curTurn);


                    }
                    else {
                        console.log("Error Occured in player 4");
                    }
                });

            }
            else {
                if (aiLock4 == 4) {
                    chudi = 1;
                    temp = cardSelector(curTurn, player4Suits, player4Call, playerPoints[3]);
                    curTurn++;

                    player4_play_card(temp);

                }
                else {


                    if (lockQueue.peek() == 4) {
                        lockQueue.dequeue();
                        var data = cardQueue.dequeue();
                        // globalLock = 0;

                        players_card_rearrange(data, player4Suits);
                        chudi = 1;
                        // temp=cardSelector(curTurn,player1Suits,player1Call,playerPoints[0]);
                        // card ti amar jhuli theke remove kore dichchi
                        removeCard(player4Suits, data.toString()[0] - '1', data);
                        // card ti ke board card e handie dichchi
                        boardCards.push(data);


                        curTurn++;
                        // inputFlag=2;
                        player4_play_card(data);
                        console.log("I am in player4 else");
                        console.log("Input flag: " + inputFlag);
                        console.log("ultimate: " + ultimate);
                        console.log("click flag: " + clickFlag);
                        console.log("nunu flag: " + nunuFlag);
                        console.log("current turn" + curTurn);

                    }


                    //cardShowOnBoard(temp,"rotate(-36deg)","49%","47%");
                }
            }
        }
    }

    function cardSelector(curTurn, playerSuits, myCall, myPoint) {
        var temp;
        if (curTurn == 1) {
            temp = (hand1(playerSuits, myCall, myPoint));
        }
        else if (curTurn == 2) {
            temp = (hand2(playerSuits, myCall, myPoint));
        }
        else if (curTurn == 3) {
            temp = (hand3(playerSuits, myCall, myPoint));
        }
        else {
            temp = (hand4(playerSuits, myCall, myPoint));
        }
        return temp;
    }

    function cardShowOnBoard(temp, rotate, top, left) {
        document.getElementById(temp).style.opacity = "1";
        document.getElementById((temp)).style.setProperty("-webkit-transition", "all 0.7s ease-out");
        document.getElementById((temp)).style.webkitTransform = rotate;
        document.getElementById((temp)).style.setProperty("top", top);
        document.getElementById((temp)).style.setProperty("left", left);

    }

    function play() {
        if (globalLock != -1) {

            if (vanishFlag == 0 && chudi == 0) {
                if (ultimate == 1 && inputFlag == 1 && clickFlag == 1 && nunuFlag == 0) {
                    player1();
                }
                else if (ultimate == 2 && inputFlag == 2 && clickFlag == 1 && nunuFlag == 0) {
                    player2();
                }
                else if (ultimate == 3 && inputFlag == 3 && clickFlag == 1 && nunuFlag == 0) {
                    player3();

                }
                else if (ultimate == 4 && inputFlag == 4 && clickFlag == 1 && nunuFlag == 0) {

                    player4();
                }
                else if (ultimate != 1 && inputFlag == 1 && player1_card_play_flag == 0) {
                    console.log("Here I am 1");
                    player1();
                }
                else if (ultimate != 2 && inputFlag == 2 && player2_card_play_flag == 0) {
                    console.log("Here I am 2");
                    player2();
                }
                else if (ultimate != 3 && inputFlag == 3 && player3_card_play_flag == 0) {
                    console.log("Here I am 3");
                    player3();

                }
                else if (ultimate != 4 && inputFlag == 4 && player4_card_play_flag == 0) {
                    console.log("Here I am 4");
                    player4();
                }
            }


        }

        if (inputFlag == 1) {
            document.getElementById("player1_slab").style.setProperty("filter", "brightness(150%)");
            document.getElementById("player2_slab").style.setProperty("filter", "brightness(85%)");
            document.getElementById("player3_slab").style.setProperty("filter", "brightness(85%)");
            document.getElementById("player4_slab").style.setProperty("filter", "brightness(85%)");
        }
        else if (inputFlag == 3) {
            // document.getElementById("player2_slab").style.setProperty("opacity","1");
            document.getElementById("player2_slab").style.setProperty("filter", "brightness(150%)");
            document.getElementById("player1_slab").style.setProperty("filter", "brightness(85%)");
            document.getElementById("player3_slab").style.setProperty("filter", "brightness(85%)");
            document.getElementById("player4_slab").style.setProperty("filter", "brightness(85%)");
        }
        else if (inputFlag == 4) {
            document.getElementById("player3_slab").style.setProperty("filter", "brightness(150%)");
            document.getElementById("player1_slab").style.setProperty("filter", "brightness(85%)");
            document.getElementById("player2_slab").style.setProperty("filter", "brightness(85%)");
            document.getElementById("player4_slab").style.setProperty("filter", "brightness(85%)");
        }
        else if (inputFlag == 2) {
            document.getElementById("player4_slab").style.setProperty("filter", "brightness(150%)");
            document.getElementById("player1_slab").style.setProperty("filter", "brightness(85%)");
            document.getElementById("player2_slab").style.setProperty("filter", "brightness(85%)");
            document.getElementById("player3_slab").style.setProperty("filter", "brightness(85%)");
        }
    }


    function player1_play_card(card_id) {
        //THIS METHOD WILL MOVE FIRST PLAYER'S CARD TO THE PLAY FLOOR
        //AT FIRST IT WILL MOVE ONE CARD OUT
        //THEN IT WILL MOVE TO THE CENTER PLAY FLOOR

        //STARTING POSITION
        //top: 18%; left:  23%;
        //DESIRED POSITION
        //top: 33%;   left:  34.5%;


        document.getElementById("card_single").style.top = "18%";
        document.getElementById("card_single").style.left = "23%";
        document.getElementById("card_single").style.opacity = "0";
        document.getElementById("card_single").style.zIndex = "999";
        document.getElementById("card_single").style.transform = "scale(1)";
        document.getElementById(card_id).style.top = "18%";
        document.getElementById(card_id).style.left = "25%";
        document.getElementById(card_id).style.opacity = "0";
        document.getElementById(card_id).style.zIndex = "998";
        document.getElementById(card_id).style.transform = "rotateY(-90deg)";
        document.getElementById(card_id).style.transform = "scale(1.05)";

        if (player1_card_play_flag == 0) {
            animate = setTimeout(function () {
                player1_play_card(card_id)
            }, 1000);
            player1_card_play_flag = 1;
        }
        else if (player1_card_play_flag == 1) {
            document.getElementById("card_single").style.opacity = "1";
            document.getElementById("card_single").style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            document.getElementById("card_single").style.setProperty("left", "25%");
            document.getElementById("card_single").style.webkitTransform = "scale(1.05)";
            document.getElementById("card_single").style.webkitTransform = "rotateY(90deg)";


            clearTimeout(animate);
            animate = setTimeout(function () {
                player1_play_card(card_id)
            }, 280);
            player1_card_play_flag = 2;
        }

        else if (player1_card_play_flag == 2) {
            document.getElementById(card_id).style.opacity = "1";
            document.getElementById("card_single").style.opacity = "0";
            document.getElementById(card_id).style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            document.getElementById(card_id).style.webkitTransform = "rotateY(0deg)";
            document.getElementById(card_id).style.webkitTransform = "scale(1.05)";

            //document.getElementById("card_single").style.webkitTransform = "rotate(120deg)";
            clearTimeout(animate);
            animate = setTimeout(function () {
                player1_play_card(card_id)
            }, 500);
            player1_card_play_flag = 3;

        }

        else if (player1_card_play_flag == 3) {

            //CHECK IF IT IS THE LAST CARD
            if (player1Suits[0].length + player1Suits[1].length + player1Suits[2].length + player1Suits[3].length == 0) {
                document.getElementById("player1_fixed_card").style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
                document.getElementById("player1_fixed_card").style.opacity = "0";
            }

            document.getElementById(card_id).style.opacity = "1";
            document.getElementById("card_single").style.opacity = "0";
            document.getElementById(card_id).style.setProperty("-webkit-transition", "all 0.6s ease-in-out");
            document.getElementById(card_id).style.setProperty("top", "33%");
            document.getElementById(card_id).style.setProperty("left", "34.5%");
            document.getElementById(card_id).style.webkitTransform = "scale(1)";
            document.getElementById(card_id).style.webkitTransform = "rotate(-45deg)";
            player1_card_play_flag = 0;
            chudi = 0;
            if (lastWinner == 3) {
                lastWinner = winPlayer(winning_card(boardCards));
                curTurn = 1;

                emptyBoard(winning_card(boardCards));
                inputFlag = lastWinner;
            }
            else {
                inputFlag = 3;
                console.log("Input flag: " + inputFlag);
            }

            clearTimeout(animate);

        }
    }


    function player2_play_card(card_id) {
        //THIS METHOD WILL MOVE SECOND PLAYER'S CARD TO THE PLAY FLOOR
        //AT FIRST IT WILL MOVE ONE CARD OUT
        //THEN IT WILL MOVE TO THE CENTER PLAY FLOOR

        //FOR PLAYER TWO

        //STARTING POSITION
        //top: 18%; left:  60%;
        //DESIRED POSITION
        //top: 33%;  left:  45.5%;


        document.getElementById("card_single").style.top = "18%";
        document.getElementById("card_single").style.left = "60%";
        document.getElementById("card_single").style.opacity = "0";
        document.getElementById("card_single").style.transform = "scale(1)";
        document.getElementById("card_single").style.transform = "rotateY(0deg)";
        //document.getElementById("card_single").style.zIndex = "999";
        document.getElementById(card_id).style.top = "18%";
        document.getElementById(card_id).style.left = "58%";
        document.getElementById(card_id).style.opacity = "0";
        //document.getElementById(card_id).style.zIndex = "998";
        document.getElementById(card_id).style.transform = "rotateY(-90deg)";
        document.getElementById(card_id).style.transform = "scale(1.05)";

        if (player2_card_play_flag == 0) {
            animate = setTimeout(function () {
                player2_play_card(card_id)
            }, 1000);
            player2_card_play_flag = 1;
        }
        else if (player2_card_play_flag == 1) {
            document.getElementById("card_single").style.opacity = "1";
            document.getElementById("card_single").style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            document.getElementById("card_single").style.setProperty("left", "58%");
            document.getElementById("card_single").style.webkitTransform = "scale(1.05)";
            document.getElementById("card_single").style.webkitTransform = "rotateY(90deg)";


            clearTimeout(animate);
            animate = setTimeout(function () {
                player2_play_card(card_id)
            }, 280);
            player2_card_play_flag = 2;
        }

        else if (player2_card_play_flag == 2) {
            document.getElementById(card_id).style.opacity = "1";
            document.getElementById("card_single").style.opacity = "0";
            document.getElementById(card_id).style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            document.getElementById(card_id).style.webkitTransform = "rotateY(0deg)";
            document.getElementById(card_id).style.webkitTransform = "scale(1.05)";

            //document.getElementById("card_single").style.webkitTransform = "rotate(120deg)";
            clearTimeout(animate);
            animate = setTimeout(function () {
                player2_play_card(card_id)
            }, 500);
            player2_card_play_flag = 3;

        }

        else if (player2_card_play_flag == 3) {

            //CHECK IF IT IS THE LAST CARD
            if (player2Suits[0].length + player2Suits[1].length + player2Suits[2].length + player2Suits[3].length == 0) {
                document.getElementById("player2_fixed_card").style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
                document.getElementById("player2_fixed_card").style.opacity = "0";
            }


            document.getElementById(card_id).style.opacity = "1";
            document.getElementById("card_single").style.opacity = "0";
            document.getElementById(card_id).style.setProperty("-webkit-transition", "all 0.6s ease-in-out");
            document.getElementById(card_id).style.setProperty("top", "33%");
            document.getElementById(card_id).style.setProperty("left", "45.5%");
            document.getElementById(card_id).style.webkitTransform = "scale(1)";
            document.getElementById(card_id).style.webkitTransform = "rotate(45deg)";
            player2_card_play_flag = 0;
            chudi = 0;
            if (lastWinner == 1) {
                lastWinner = winPlayer(winning_card(boardCards));
                curTurn = 1;
                emptyBoard(winning_card(boardCards));
                inputFlag = lastWinner;
                //inputFlag=1000;
            }
            else {
                inputFlag = 1;
                // globalLock = queue.dequeue();
                //inputFlag=1000;
                console.log("Input flag: " + inputFlag);
            }

            clearTimeout(animate);

        }
    }

    function player3_play_card(card_id) {
        //THIS METHOD WILL MOVE THIRD PLAYER'S CARD TO THE PLAY FLOOR
        //AT FIRST IT WILL MOVE ONE CARD OUT
        //THEN IT WILL MOVE TO THE CENTER PLAY FLOOR

        //STARTING POSITION
        //top: 60%; left:  23%;
        //DESIRED POSITION
        //top: 49%;   left:  34.5%;


        document.getElementById("card_single").style.top = "60%";
        document.getElementById("card_single").style.left = "23%";
        document.getElementById("card_single").style.opacity = "0";
        document.getElementById("card_single").style.zIndex = "999";
        document.getElementById("card_single").style.transform = "scale(1)";
        document.getElementById(card_id).style.top = "60%";
        document.getElementById(card_id).style.left = "25%";
        document.getElementById(card_id).style.opacity = "0";
        document.getElementById(card_id).style.zIndex = "998";
        document.getElementById(card_id).style.transform = "rotateY(-90deg)";
        document.getElementById(card_id).style.transform = "scale(1.05)";

        if (player3_card_play_flag == 0) {
            animate = setTimeout(function () {
                player3_play_card(card_id)
            }, 1000);
            player3_card_play_flag = 1;
        }
        else if (player3_card_play_flag == 1) {
            document.getElementById("card_single").style.opacity = "1";
            document.getElementById("card_single").style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            document.getElementById("card_single").style.setProperty("left", "25%");
            document.getElementById("card_single").style.webkitTransform = "scale(1.05)";
            document.getElementById("card_single").style.webkitTransform = "rotateY(90deg)";


            clearTimeout(animate);
            animate = setTimeout(function () {
                player3_play_card(card_id)
            }, 280);
            player3_card_play_flag = 2;
        }

        else if (player3_card_play_flag == 2) {
            document.getElementById(card_id).style.opacity = "1";
            document.getElementById("card_single").style.opacity = "0";
            document.getElementById(card_id).style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            document.getElementById(card_id).style.webkitTransform = "rotateY(0deg)";
            document.getElementById(card_id).style.webkitTransform = "scale(1.05)";

            //document.getElementById("card_single").style.webkitTransform = "rotate(120deg)";
            clearTimeout(animate);
            animate = setTimeout(function () {
                player3_play_card(card_id)
            }, 500);
            player3_card_play_flag = 3;

        }

        else if (player3_card_play_flag == 3) {

            //CHECK IF IT IS THE LAST CARD
            if (player3Suits[0].length + player3Suits[1].length + player3Suits[2].length + player3Suits[3].length == 0) {
                document.getElementById("player3_fixed_card").style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
                document.getElementById("player3_fixed_card").style.opacity = "0";
            }

            document.getElementById(card_id).style.opacity = "1";
            document.getElementById("card_single").style.opacity = "0";
            document.getElementById(card_id).style.setProperty("-webkit-transition", "all 0.6s ease-in-out");
            document.getElementById(card_id).style.setProperty("top", "49%");
            document.getElementById(card_id).style.setProperty("left", "34.5%");
            document.getElementById(card_id).style.webkitTransform = "scale(1)";
            document.getElementById(card_id).style.webkitTransform = "rotate(45deg)";
            player3_card_play_flag = 0;
            chudi = 0;
            if (lastWinner == 4) {
                lastWinner = winPlayer(winning_card(boardCards));
                curTurn = 1;

                emptyBoard(winning_card(boardCards));
                inputFlag = lastWinner;
            }
            else {
                inputFlag = 4;
                // globalLock = queue.dequeue();
                console.log("Input flag: " + inputFlag);
            }

            clearTimeout(animate);

        }
    }

    function player4_play_card(card_id) {
        //THIS METHOD WILL MOVE FOURTH PLAYER'S CARD TO THE PLAY FLOOR
        //AT FIRST IT WILL MOVE ONE CARD OUT
        //THEN IT WILL MOVE TO THE CENTER PLAY FLOOR

        //FOR PLAYER FOUR

        //STARTING POSITION
        //top: 60%; left:  60%;
        //DESIRED POSITION
        //top: 49%;  left:  45.5%;


        if (player4_card_play_flag == 0) {
            document.getElementById("card_single").style.top = "60%";
            document.getElementById("card_single").style.left = "60%";
            document.getElementById("card_single").style.opacity = "0";
            document.getElementById("card_single").style.transform = "scale(1)";
            document.getElementById("card_single").style.transform = "rotateY(0deg)";
            //document.getElementById("card_single").style.zIndex = "999";
            document.getElementById(card_id).style.top = "60%";
            document.getElementById(card_id).style.left = "58%";
            document.getElementById(card_id).style.opacity = "0";
            //document.getElementById(card_id).style.zIndex = "998";
            document.getElementById(card_id).style.transform = "rotateY(-90deg)";
            document.getElementById(card_id).style.transform = "scale(1.05)";
            animate = setTimeout(function () {
                player4_play_card(card_id)
            }, 1000);
            player4_card_play_flag = 1;
        }
        else if (player4_card_play_flag == 1) {
            document.getElementById("card_single").style.opacity = "1";
            document.getElementById("card_single").style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            document.getElementById("card_single").style.setProperty("left", "58%");
            document.getElementById("card_single").style.webkitTransform = "scale(1.05)";
            document.getElementById("card_single").style.webkitTransform = "rotateY(90deg)";


            clearTimeout(animate);
            animate = setTimeout(function () {
                player4_play_card(card_id)
            }, 280);
            player4_card_play_flag = 2;
        }

        else if (player4_card_play_flag == 2) {
            document.getElementById(card_id).style.opacity = "1";
            document.getElementById("card_single").style.opacity = "0";
            document.getElementById(card_id).style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
            document.getElementById(card_id).style.webkitTransform = "rotateY(0deg)";
            document.getElementById(card_id).style.webkitTransform = "scale(1.05)";

            //document.getElementById("card_single").style.webkitTransform = "rotate(120deg)";
            clearTimeout(animate);
            animate = setTimeout(function () {
                player4_play_card(card_id)
            }, 500);
            player4_card_play_flag = 3;

        }

        else if (player4_card_play_flag == 3) {

            //CHECK IF IT IS THE LAST CARD
            if (player4Suits[0].length + player4Suits[1].length + player4Suits[2].length + player4Suits[3].length == 0) {
                document.getElementById("player4_fixed_card").style.setProperty("-webkit-transition", "all 0.3s ease-in-out");
                document.getElementById("player4_fixed_card").style.opacity = "0";
            }

            document.getElementById(card_id).style.opacity = "1";
            document.getElementById("card_single").style.opacity = "0";
            document.getElementById(card_id).style.setProperty("-webkit-transition", "all 0.6s ease-in-out");
            document.getElementById(card_id).style.setProperty("top", "49%");
            document.getElementById(card_id).style.setProperty("left", "45.5%");
            document.getElementById(card_id).style.webkitTransform = "scale(1)";
            document.getElementById(card_id).style.webkitTransform = "rotate(-45deg)";

            clearTimeout(animate);
            animate = setTimeout(function () {
                player4_play_card(card_id)
            }, 1000);
            player4_card_play_flag = 4;
        }
        else if (player4_card_play_flag == 4) {
            clearTimeout(animate);
            player4_card_play_flag = 0;
            chudi = 0;
            if (lastWinner == 2) {
                lastWinner = winPlayer(winning_card(boardCards));
                curTurn = 1;

                emptyBoard(winning_card(boardCards));
                inputFlag = lastWinner;

            }
            else {
                inputFlag = 2;
                // globalLock = queue.dequeue();
                console.log("Input flag: " + inputFlag);
            }

        }

    }

    var myVar = setInterval(play, 200);


    /*
     ###################################################Call.js############################################
     ############################################################################################################
     ############################################################################################################

     */
    function showAllPlayerBalloon(call1, call2, call3, call4) {
        //NOW ALL PLAYER's BALLOONS ARE GOING TO BE DISPLAYED

        //player1 balloon display
        if (call1 == -1) {
            player1Call = callGenerator(player1Suits);

        }
        else {
            player1Call = call1;
        }
        ShowAllBalloon(44, 19, 1, player1Call);

        //player2 balloon display
        if (call2 == -1) {
            player2Call = callGenerator(player2Suits);

        }
        else {
            player2Call = call2;
        }
        ShowAllBalloon(44, 90, 2, player2Call);

        //player3 balloon Display
        if (call3 == -1) {
            player3Call = callGenerator(player3Suits);

        }
        else {
            player3Call = call3;
        }
        ShowAllBalloon(85, 19, 3, player3Call);

        //player4 balloon display
        if (call4 == -1) {
            player4Call = callGenerator(player4Suits);

        }
        else {
            player4Call = call4;
        }
        ShowAllBalloon(85, 90, 4, player4Call);
        document.getElementById("player1_call_bubble").style.setProperty("opacity", "0");
        document.getElementById("player2_call_bubble").style.setProperty("opacity", "0");
        document.getElementById("player3_call_bubble").style.setProperty("opacity", "0");
        document.getElementById("player4_call_bubble").style.setProperty("opacity", "0");

    }

    function ShowAllBalloon(top, StartOfleft, playerID, playerCall) {
        //FIRST ROW OF 7 BALLONS DISPLAY
        for (var i = 0; i < playerCall; i++) {
            if (i == 7) {
                break;
            }
            show_balloon('images/CallDisplay/chip.png', top, StartOfleft - 3 * i, playerID * 1000 + playerCall - i, 3);

        }

        //SECOND ROW OF OTHER BALLONS
        if (playerCall - 7 > 0) {
            for (var i = 0; i < (playerCall % 7); i++) {
                show_balloon('images/CallDisplay/chip.png', top + 6.3, StartOfleft - 3 * i, (playerID * 1000 + (playerCall % 7)) - i, 3);

            }
        }

    }

    function callGenerator(playerSuits) {
        // eikhane shob call er summation rakha hoppe
        var sum = 0;
        var trumpSum = 0;

        for (var i = 3; i >= 0; i--) {
            // spade bade shokol card er jonno ek rokom chinta vabna
            if (i != 3) {
                // normally ace ebong king er jonno summation
                sum += leadsNormal(playerSuits[i], i);

                //trump er jonno summation korlam
                if (playerSuits[i].length <= 2 && playerSuits[3].length - trumpSum + 1 > 0) {
                    trumpSum++;
                }
                if (i == 0) {
                    if (playerSuits[3].length - trumpSum > 3) {
                        trumpSum += (playerSuits[3].length - trumpSum) % 3;
                    }
                }

            }

            // spade er jonno vinno chinta vabna
            else {
                trumpSum += serialLeadsSpade(3, playerSuits[3]);

            }

        }

        return sum + trumpSum;
    }

    function serialLeadsSpade(suitIndex, ara) {
        var sum = 0;
        var leader = myMax(ara);
        for (var i = 0; i < ara.length; i++) {
            if (ara.length > 414 - leader && ara.indexOf(leader) >= 0) {
                sum++;
                leader--;
            }
            else {


                break;

            }
        }
        return sum;


    }

    function leadsNormal(ara, suitIndex) {
        var sum = 0;
        var leader = (suitIndex + 1) * 100 + 14;
        if (ara.indexOf(leader) >= 0) {
            sum++;
        }
        if (ara.length <= 4 && ara.length >= 2 && ara.indexOf(leader - 1) >= 0) {
            sum++;
        }
        return sum;
    }

    /*
     ###################################################experiment.js############################################
     ############################################################################################################
     ############################################################################################################

     */
    var butt = document.getElementById("ai_emerge");

    butt.style.width = "100%";
    butt.addEventListener("click", function () {
        socket.emit("its now or never");
    });
    butt.style.visibility = "hidden";
    // (function () {
    //     var getNode = function (s) {
    //         return document.querySelector(s);
    //     };
    //     var messages = getNode('.chat-messages');
    //     var textArea = getNode('.chat-textarea');
    //     if(socket !== undefined){
    //         // listen for output
    //         socket.on('output',function (data) {
    //             if(data.length){
    //                 for(var i=0;i<data.length;i++){
    //                     var message = document.createElement('div');
    //                     message.setAttribute('class','chat-message');
    //                     message.textContent = data[i].name + ': ' + data[i].message;
    //                     messages.appendChild(message);
    //                     messages.insertBefore(message,messages.firstChild);
    //                 }
    //
    //
    //             }
    //         });
    //
    //         textArea.addEventListener('keydown', function (event) {
    //             var self  = this;
    //             if(event.which===13 && event.shiftKey === false ){
    //                 var player = "PLAYER"+ultimate;
    //                 socket.emit('input',{
    //                     name: player,
    //                     message: self.value
    //                 });
    //
    //                 event.preventDefault();
    //                 self.value ="";
    //
    //             }
    //
    //
    //         });
    //
    //
    //     }
    //
    //
    // })();


    /*
     ###################################################Reinitialize.js############################################
     ############################################################################################################
     ############################################################################################################

     */
    function reinitialize() {


        deck = [102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214
            , 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414];
        player1Cards = [];
        player2Cards = [];
        player3Cards = [];
        player4Cards = [];
        player1Suits = [[], [], [], []];
        player2Suits = [[], [], [], []];
        player3Suits = [[], [], [], []];
        player4Suits = [[], [], [], []];
        boardCards = [];
        allCards = [[], [], [], []];

        // *********************************** DECK.JS ER SHOKOL VARIABLE

        lastWinner = 1;
        curTurn = 1;
        clickFlag = 0;
        vanishFlag = 0;
        leadCards = [114, 214, 314, 414];
        trumpedSuits = [];
        pile_flag = 0;
        pass_flag = 0;
        empty_flag = 0;
        playerPoints = [0, 0, 0, 0];
        trumpFlag = 0;


// ********************** CALLBRIDGE.JS ER SHOKOL VARIABLE ******************************
//These variable are for move_card_suit function
        move_card_suit_top_flag = 0;
//These variable are for move_card_single function
        move_card_single_top_flag = 43;
//These variable are for move_player_1st_card function
        move_player_1st_card_top_flag = 39;
        move_player_1st_card_left_flag = 41.5;
        card_distribute_counter = 1;
        time_flag = 0;
        inputFlag = -1;
        remaining_call1 = 0;
        remaining_call2 = 0;
        remaining_call3 = 0;
        remaining_call4 = 0;
        negetive_call1 = 0;
        negetive_call2 = 0;
        negetive_call3 = 0;
        negetive_call4 = 0;

        first_time_flag = 0;
        game_cycle_start = 0;


//************************************* GAME.JS ER SHOKOL VARIABLE **********************************
        player1_card_play_flag = 0;
        player2_card_play_flag = 0;
        player4_card_play_flag = 0;
        chudi = 0;
        nunuFlag = 0;
        globalLock = -1;

        var lockQueue = new Queue();
        var cardQueue = new Queue();

        // aiLock1 = -1;
        // aiLock2 = -1;
        // aiLock3 = -1;
        // aiLock4 = -1;

//************************************SHADMAN'S WORK***********************************************

//INITIALIZE CARD_SUIT POSITION

//card_suit
        document.getElementById("card_suit").style.top = "0%";
        document.getElementById("card_suit").style.left = "41.0156%";


//card_single
        document.getElementById("card_single").style.top = "43%";
        document.getElementById("card_single").style.left = "41.5%";

        document.getElementById("player1_card_single").style.opacity = "0";
        document.getElementById("player1_card_single").style.top = "39%";
        document.getElementById("player1_card_single").style.left = "41.5%";

        document.getElementById("player2_card_single").style.opacity = "0";
        document.getElementById("player2_card_single").style.top = "39%";
        document.getElementById("player2_card_single").style.left = "41.5%";

        document.getElementById("player3_card_single").style.opacity = "0";
        document.getElementById("player3_card_single").style.top = "39%";
        document.getElementById("player3_card_single").style.left = "41.5%";

        document.getElementById("player4_card_single").style.opacity = "0";
        document.getElementById("player4_card_single").style.top = "39%";
        document.getElementById("player4_card_single").style.left = "41.5%";


//fixed_card
        document.getElementById("player1_fixed_card").style.opacity = "0";
        document.getElementById("player1_fixed_card").style.top = "18%";
        document.getElementById("player1_fixed_card").style.left = "24%";

        document.getElementById("player2_fixed_card").style.opacity = "0";
        document.getElementById("player2_fixed_card").style.top = "18%";
        document.getElementById("player2_fixed_card").style.left = "59%";

        document.getElementById("player3_fixed_card").style.transitionDuration = "0s";
        document.getElementById("player3_fixed_card").style.opacity = "0";
        document.getElementById("player3_fixed_card").style.top = "60%";
        document.getElementById("player3_fixed_card").style.left = "24%";
        document.getElementById("player3_fixed_card").style.webkitTransform = "scale(1)";


        document.getElementById("player4_fixed_card").style.opacity = "0";
        document.getElementById("player4_fixed_card").style.top = "60%";
        document.getElementById("player4_fixed_card").style.left = "59%";


//call_token
        var temp_left;
        var playerCallTemp;
        if (ultimate == 1)
            playerCallTemp = player1Call;
        else if (ultimate == 2)
            playerCallTemp = player2Call;
        else if (ultimate == 3)
            playerCallTemp = player3Call;
        else
            playerCallTemp = player4Call;


        document.getElementById(playerCallTemp).style.webkitTransform = "scale(1)";


        if (playerCallTemp < 6) {
            temp_left = 27.8 + playerCallTemp * 5.8;
            document.getElementById(playerCallTemp).style.top = "35%";
        }
        else if (playerCallTemp >= 6 && playerCallTemp < 11) {
            temp_left = 30.7 + (playerCallTemp % 6) * 5.8;
            document.getElementById(playerCallTemp).style.top = "42%";
        }
        else if (playerCallTemp >= 11 && playerCallTemp < 13) {
            temp_left = 39.5 + (playerCallTemp % 11) * 5.8;
            document.getElementById(playerCallTemp).style.top = "49%";
        }
        else {
            temp_left = 42.4;
            document.getElementById(playerCallTemp).style.top = "56%";
        }

        document.getElementById(playerCallTemp).style.left = temp_left + "%";
        document.getElementById(playerCallTemp).style.transitionDuration = "0s";


//CARDS CLASS
        var elems = document.getElementsByClassName('cards');
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.opacity = '0';
            elems[i].style.top = '60%';
            elems[i].style.left = '24%';
            elems[i].style.transitionDuration = "0s";
            elems[i].style.webkitTransform = "rotate(0deg)";
            elems[i].style.display = 'block';
        }


//balloon vanish
        for (var i = 1; i <= 4; i++) {
            for (var k = 1; k <= 26; k++) {
                var temp_balloon = 1000 * i + k;
                if (document.getElementById(temp_balloon) !== null) {
                    document.getElementById(temp_balloon).style.opacity = '0';
                }
                else {
                    //break;
                }

            }
        }


        reinitialize_animate = setTimeout(reinitialize, 1000);

        if (reinitialize_flag == 1) {
            socket.emit('please reinitialize', ultimate, function (data) {
                player1Cards = data.player1Cards;
                player2Cards = data.player2Cards;
                player3Cards = data.player3Cards;
                player4Cards = data.player4Cards;
                //distributing suits among players
                distributeSuits(player1Cards, player1Suits);
                distributeSuits(player2Cards, player2Suits);
                distributeSuits(player3Cards, player3Suits);
                distributeSuits(player4Cards, player4Suits);
                //populate all cards array
                populateAllCards(allCards);
                clearTimeout(reinitialize_animate);
                player1Call = 0;
                player2Call = 0;
                player3Call = 0;
                player4Call = 0;
                display_start();
                reinitialize_flag = 0;


            });


        }
        else {
            reinitialize_flag = 1;
        }
    }


    /*
     ###################################################TokenListener.js############################################
     ############################################################################################################
     ############################################################################################################

     */

    for (var i = 0; i < 14; i++) {
        document.getElementById(i).addEventListener("click", function () {
            call_token_selected(this.id);
        }, false);
    }






    /*
     ###################################################Chat.js############################################
     ############################################################################################################
     ############################################################################################################

     */


     socket.on("output", function(data){
        var ultimate = data.ultimate;
        var message = data.message;
        if(ultimate==1){
            chat_show("player1_chat",message, ultimate);
        }
        else if(ultimate==2){
            chat_show("player3_chat",message, ultimate);
        }
        else if(ultimate==3){
            chat_show("player2_chat",message, ultimate);
        }
        else if(ultimate==4){
            chat_show("player4_chat",message, ultimate);
        }

     });

    document.getElementById("chat_window").addEventListener("keypress", chat_send, false);

    //         textArea.addEventListener('keydown', function (event) {
    //             var self  = this;
    //             if(event.which===13 && event.shiftKey === false ){
    //                 var player = "PLAYER"+ultimate;
    //                 socket.emit('input',{
    //                     name: player,
    //                     message: self.value
    //                 });
    //
    //                 event.preventDefault();
    //                 self.value ="";
    //
    //             }
    //
    //
    //         });


    function chat_send() {
        // SHOW IN PLAYER1 CHAT FOR TESTING
        var key = window.event.keyCode;

        // If the user has pressed enter
        if (key === 13) {
            var message = document.getElementById("chat_window").value;
            var whiteSpacePattern = /^\s*$/;
            if (whiteSpacePattern.test(message)) {
                 return false;       
            }

            socket.emit("input",{ultimate: ultimate, message: message})
            if(ultimate==1){
                chat_show("player1_chat",message,ultimate);
            }
            else if(ultimate==2){
                chat_show("player3_chat",message,ultimate);
            }
            else if(ultimate==3){
                chat_show("player2_chat",message,ultimate);
            }
            else if(ultimate==4){
                chat_show("player4_chat",message,ultimate);
            }
            
            document.getElementById("chat_window").value = "";
            chat_trim();
            return false;
        }
        else {
            return true;
        }
    }
    function chat_show(player_id_chat,msg, ultimate){
        var dummy;
        if(ultimate==1){
            player1_chat_clear++;
            dummy = player1_chat_clear;
        }
        else if(ultimate==2){
            player3_chat_clear++;
            dummy = player3_chat_clear;
        }
        else if(ultimate==3){
            player2_chat_clear++;
            dummy = player2_chat_clear;
        }
        else if(ultimate==4){
            player4_chat_clear++;
            dummy = player4_chat_clear;
        }

        document.getElementById(player_id_chat).innerHTML = msg;
        document.getElementById(player_id_chat).style.display = "inline-block";  
        var delay = setTimeout(function(){
            chat_clear(player_id_chat,msg, dummy);
            clearTimeout(delay);
        },6000);    
    }


    function chat_clear(player_id_chat,msg,dummy){
        if(ultimate==1 && dummy<player1_chat_clear){
            return;
        }
        else if(ultimate==2 && dummy<player3_chat_clear){
            return;
        }
        else if(ultimate==3 && dummy<player2_chat_clear){
            return;
        }
        else if(ultimate==4 && dummy<player4_chat_clear){
            return;
        }
        document.getElementById(player_id_chat).innerHTML = "";
        document.getElementById(player_id_chat).style.display = "none";   

        if(ultimate==1){
            player1_chat_clear = 0;
        }
        else if(ultimate==2){
            player3_chat_clear = 0;
        }
        else if(ultimate==3){
            player2_chat_clear = 0;
        }
        else if(ultimate==4){
            player4_chat_clear = 0;      
        }     
    }



    function chat_trim(){
        // FOR SHOWING MAXIMUM 68 CHARS

        document.getElementById("player1_chat").innerHTML = document.getElementById("player1_chat").innerHTML.substring(0,68);
        document.getElementById("player2_chat").innerHTML = document.getElementById("player2_chat").innerHTML.substring(0,68);
        document.getElementById("player3_chat").innerHTML = document.getElementById("player3_chat").innerHTML.substring(0,68);
        document.getElementById("player4_chat").innerHTML = document.getElementById("player4_chat").innerHTML.substring(0,68);
    }


});






















