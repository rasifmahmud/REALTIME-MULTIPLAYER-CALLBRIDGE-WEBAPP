/**
 * Created by razon on 11/8/16.
 */
// *********************************** DECK.JS ER SHOKOL VARIABLE
function Deck() {
    this.deck = [102,103,104,105,106,107,108,109,110,111,112,113,114,202,203,204,205,206,207,208,209,210,211,212,213,214
        ,302,303,304,305,306,307,308,309,310,311,312,313,314,402,403,404,405,406,407,408,409,410,411,412,413,414];
    this.player1Cards = [];
    this.player2Cards = [];
    this.player3Cards = [];
    this.player4Cards = [];
    this.shuffle = function (o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
    };
    this.sortThem = function () {
        this.player1Cards.sort();
        this.player2Cards.sort();
        this.player3Cards.sort();
        this.player4Cards.sort();

    };
    this.distribute = function () {
        var i;
        var j;
        for (i = 0, j = 0; i < 52; i += 4) {
            this.player1Cards[j] = this.deck[i];
            this.player2Cards[j] = this.deck[i + 1];
            this.player3Cards[j] = this.deck[i + 2];
            this.player4Cards[j] = this.deck[i + 3];
            j++;
        }
    };
    this.super_init = function () {
        //shuffling cards here
        this.shuffle(this.deck);

        //distributing cards
        this.distribute();

        //sorting cards of 4 players
        this.sortThem();

    }


}
module.exports = Deck;