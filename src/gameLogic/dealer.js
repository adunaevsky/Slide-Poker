class dealerPerson {
    mainCards;
    deck;
    numPayMultiply;


    /* bonusCardsChances = {
        1: 2, 2: 2, 3: 2, 4: 2, 5: 3, 6: 3, 7: 3, 8: 4, 9: 4, 10: 5
    } */
    multiplyPayChances = {};

    muplitplyParams = [{ limit: 630, value: 1 },
    { limit: 900, value: 2 },
    { limit: 990, value: 3 },
    { limit: 996, value: 5 },
    { limit: 999, value: 8 },
    { limit: 1000, value: 10 },
    ];

    clearCards() {
        this.mainCards = ['', '', '', '', '', '', '', '', '', '', ''];
    }
    getCard(cardNum, testCase, cardTypes) {
        console.log(cardNum, testCase, cardTypes);

        if (typeof testCase === 'object' && cardTypes === 'mainCards' && testCase.length > 0) {

            this.mainCards[cardNum] = testCase[cardNum - 3];

            var cardInDeck = this.deck.indexOf(this.mainCards[cardNum]);
            this.deck.splice(cardInDeck, 1);

            //  console.log(cardInDeck, this.deck.length, this.mainCards, testCase, cardNum - 3, cardNum);

        } else {
            var cardsInDeck = this.deck.length;
            this.mainCards[cardNum] = this.deck[cardsInDeck - 1];
            this.deck.pop();
        }

    }



    setMultiplyChances() {

        this.muplitplyParams.forEach((k, i) => {
            if (i === 0) {
                k.percent = (k.limit / 1000 * 100).toFixed(1) + '%';
            } else {
                var chunk = this.muplitplyParams[i].limit - this.muplitplyParams[i - 1].limit;
                k.percent = (chunk / 1000 * 100).toFixed(1) + '%';
            }
        });

        var result = {};
        for (var i = 1; i <= 1000; i++) {

            this.muplitplyParams.forEach((k) => {

                if (i <= k.limit && typeof result[i] === 'undefined') {
                    result[i] = k.value;
                }
            });
        }
        return result;

    }

    getMultiply(){
        return this.multiplyPayChances[Math.floor(Math.random() * 1000) + 1];
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
        this.multiplyPayChances = this.setMultiplyChances();
        /*        console.log('devMode:', this.devMode);*/
    }

}

export { dealerPerson as default }