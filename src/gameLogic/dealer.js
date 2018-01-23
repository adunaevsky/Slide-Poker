class dealerPerson {
    mainCards;
    deck;
    numPayMultiply;


    /* bonusCardsChances = {
        1: 2, 2: 2, 3: 2, 4: 2, 5: 3, 6: 3, 7: 3, 8: 4, 9: 4, 10: 5
    } */
    multiplyPayChances = {
        1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 2, 8: 2, 9: 2, 10: 3
    }


    clearCards() {
        this.mainCards = ['', '', '', '', '', '', '', '', '', '', ''];


    }
    getCard(cardNum, testCase, cardTypes) {

        if (typeof testCase === 'object' && cardTypes === 'mainCards' && testCase.length > 0) {

            this.mainCards[cardNum] = testCase[cardNum - 3];
            // console.log(this.deck);
            var cardInDeck = this.deck.indexOf(this.mainCards[cardNum]);
            this.deck.splice(cardInDeck, 1);

        } else {
            var cardsInDeck = this.deck.length;
            this.mainCards[cardNum] = this.deck[cardsInDeck - 1];
            this.deck.pop();
        }

    }


    setNumPayMultiply() {
        var num = Math.floor(Math.random() * 10) + 1;
        //  console.log('this.multiplyPayChances[num]', this.multiplyPayChances[num], num)
        this.numPayMultiply = this.multiplyPayChances[num];

    }

    swapCard(cardNum) {

        this.mainCards[cardNum] = this.deck[this.deck.length - 1];
        this.deck.pop();

    }

    newDeck() {
        /*  this.MDCard = false; */
        var suits = ['C', 'H', 'S', 'D'];
        this.deck = [];
        for (var s = 0; s < suits.length; s++) {
            for (var r = 2; r <= 14; r++) {
                this.deck.push(suits[s] + r
                );
            }
        }
        this.shuffle(this.deck);
    }

    shuffle(array) {
        var i = 0, j = 0, temp = null
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    constructor() {
        this.clearCards();
        /*        console.log('devMode:', this.devMode);*/
    }

}

export { dealerPerson as default }