class dealerPerson {
    mainCards;
    bonusCards;
    deck;
  
   /*  numBonusCards; */
    numPayMultiply;
    devMode = false;
    mdFrequency = 9


        /* bonusCardsChances = {
            1: 2, 2: 2, 3: 2, 4: 2, 5: 3, 6: 3, 7: 3, 8: 4, 9: 4, 10: 5
        } */
        multiplyPayChances = {
            1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 2, 8: 2, 9: 2, 10: 3
        }

   
    clearCards() {
        this.mainCards = ['', '', '', '', ''];
        this.bonusCards = ['', '', '', '', ''];

        // this.mainCards = ['H11', 'H13', 'H12', 'H10', 'H14']; // Royal flush
        //  this.mainCards = ['D10', 'D11', 'D12', 'D13', 'D14']; // Royal flush

        //  this.mainCards = ['H14', 'S14', 'D7','C14','D14'];  //Four of a Kind
        //  this.mainCards = ['H14', 'S14', 'D7','C14','D13'];  //Three of a Kind
        //  this.mainCards = ['S13', 'S14', 'S12','S8','S11'];  //Almost Royal Flush, all same suits
        //  this.mainCards = ['S13', 'S14', 'S12','D8','S11'];  //Almost Royal Flush, one different suit
        //  this.mainCards = ['S13', 'S14', 'S12','D10','S11'];  //Almost Royal Flush, one different suit
        //*   this.bonusCards = ['D6', 'H2', 'D3', 'D4', 'D5']; */
        //  this.mainCards =  ['H14', 'S14', 'D7','C14','D14']; // Four of a kind
        //  this.mainCards =  ['H7', 'S7', 'C7','D7', 'S12']; // Four of a kind
        //  this.mainCards =  ['H4', 'H5', 'H6', 'H7','H8']; // Straight flush
        // this.mainCards =  ['S7', 'S4', 'S3', 'S5', 'S6']; // Straight flush
        //     this.mainCards =   ['H2', 'H3', 'H4', 'C14', 'H5']; // straight flush ACE LOW
        //  this.mainCards =  ['H11', 'H13', 'H12', 'H10', 'H14']; // Royal flush
        //  this.mainCards =  ['D10', 'D11', 'D12', 'D13', 'D14']; // Royal flush
        //  this.mainCards =  ['H11', 'H13', 'H12', 'H10', 'D5']; // 4 to a royal flush
        //  this.mainCards =  ['D10', 'S2', 'D12', 'D13', 'D14']; // 4 to a royal flush
        //  this.mainCards =  ['H14', 'S14', 'D7', 'C14', 'D13']; //Three of kind
        //  this.mainCards =  ['H14', 'S7', 'D7', 'C7', 'D11']; //Three of kind
        // this.mainCards =  ['H2', 'S3', 'D4', 'C5', 'D6']; // Straight
        // this.mainCards =  ['H10', 'S7', 'D9','C8', 'D6']; // Straight
        // this.mainCards =   ['H2', 'H13', 'H7', 'H4', 'H9']; // Flush
        // this.mainCards =   ['D2', 'D7', 'D10', 'D14', 'D5']; // Flush
        // this.mainCards =   ['H10', 'S10', 'D14', 'C10', 'C14']; // Full house
        // this.mainCards =   ['H12', 'S12', 'D7', 'C7', 'H7']; // Full house
        //   this.mainCards =   ['H2', 'H3', 'H4', 'C11', 'H5']; // 4 to a straight flush  --- extra card (C11) is high
        //  this.mainCards =   ['H2', 'H3', 'H4', 'H14', 'D8']; // 4 to a straight flush  --- extra card (H8), with ace being low.
        //  this.mainCards =   ['D7', 'D8', 'D9', 'D10', 'H2']; // 4 to a straight flush  -- extra card (H2) is low
        //   this.mainCards =   ['H2', 'S2', 'S4', 'C14', 'D4']; // Two pair
        //   this.mainCards =   ['D7', 'S7', 'S10', 'C10', 'D2']; // Two pair
        //  this.mainCards =   ['H2', 'S6', 'S9', 'C14', 'D14']; // High pair
        //   this.mainCards =   ['S11', 'H3', 'S5', 'S2', 'H11']; // High pair
        //  this.mainCards =   ['H11', 'H13', 'H12', 'C4', 'D5']; // 3 to a royal flush
        //  this.mainCards =   ['C10', 'H3', 'D12', 'D13', 'D14']; // 3 to a royal flush
        // this.mainCards =   ['H2', 'H13', 'H7', 'C4', 'H5']; // 4 to a flush
        //  this.mainCards =   ['D2', 'H13', 'D10', 'D14', 'D5']; // 4 to a flush
        //  this.mainCards =   ['H2', 'S2', 'S7', 'C14', 'D4']; // Low pair
        //   this.mainCards =   ['H2', 'S12', 'S10', 'C14', 'D10']; // Low pair
        //  this.mainCards =   ['C2', 'D8', 'D10', 'D12', 'H2']; // low pair
        //  this.mainCards =   ['H2', 'D3', 'H4', 'D8', 'S5']; // 4 to an outside straight  --- extra card is high.
        //   this.mainCards =   ['D11', 'C8', 'S9', 'H10', 'H2']; // 4 to an outside straight -- extra card is low.
        //   this.mainCards =   ['C4', 'D11', 'S3', 'H14', 'H2']; // 4 to an outside straight -- extra card is HIGH, since ACE is low.
        //  this.mainCards =   ['H2', 'S6', 'S9', 'D11', 'D14']; // 2 suited high cards
        //   this.mainCards =   ['S11', 'H7', 'S6', 'C9', 'S14']; // 2 suited high cards

        /*****  3 to a straight flush FAKES *****/
        //GENERAL 
        // this.mainCards = ['D5', 'D3', 'D4', 'C11', 'H7'];  // hand complete at xxx with sort order of xxx__
        // this.mainCards = ['D8', 'D9', 'D7', 'C11', 'H2'];  // hand complete at xxx with sort order of _xxx_
        // this.mainCards = ['D8', 'D9', 'D7', 'C3', 'H2'];   // hand complete at xxx with sort order of __xxx
        // this.mainCards = ['D4', 'H9', 'D3', 'C11', 'D2'];  // hand complete at xxx with sort order of xxx__ 
        // this.mainCards = ['S4', 'D10', 'D8', 'C2', 'D6'];  // hand complete at x_x_x with a sort order of __xxx
        // this.mainCards = ['S13', 'D10', 'D8', 'C2', 'D6']; // hand complete at x_x_x with a sort order of _xxx_
        // this.mainCards = ['S12', 'H10', 'D6', 'D2', 'D4']; // hand complete at x_x_x with a sort order of xxx__
        // this.mainCards = ['S12', 'H10', 'D5', 'D2', 'D4']; // hand complete at x_xx with a sort order of  xxx__
        // this.mainCards = ['S12', 'H2', 'D8', 'D5', 'D7'];  // hand complete at x_xx with a sort order of  _xxx_
        // this.mainCards = ['S3', 'H2', 'D10', 'D7', 'D9'];  // hand complete at x_xx with a sort order of  __xxx
        // this.mainCards = ['S3', 'H2', 'D10', 'D7', 'D8'];  // hand complete at xx_x with a sort order of  __xxx
        // this.mainCards = ['S14', 'H2', 'D10', 'D7', 'D8']; // hand complete at xx_x with a sort order of  _xxx_
        // this.mainCards = ['S14', 'H13', 'D8', 'D5', 'D6']; // hand complete at xx_x with a sort order of  xxx__

        //REAL
        //  this.mainCards = ['H7', 'H9', 'S4', 'H11', 'C14']; 
        //  this.mainCards = ['C14', 'H7', 'H9', 'S4', 'H11']; 
        //  this.mainCards = ['H11', 'C14', 'H7', 'H9', 'S4']; 
        //  this.mainCards = ['S4', 'H11', 'C14', 'H7', 'H9']; 
        //  this.mainCards = ['H7', 'S4', 'H9', 'C14', 'H11']; 
        //  this.mainCards = ['H7', 'H9', 'H11', 'S4', 'C14']; 
        //  this.mainCards = ['S4', 'H7', 'H9', 'H11', 'C14']; 
        //  this.mainCards = ['S4', 'C14', 'H7', 'H9', 'H11']; 
        //  this.mainCards = ['H7', 'S4', 'C14', 'H9', 'H11']; 
        //  this.mainCards = ['H7', 'H9', 'S4', 'C14', 'H11']; 

        //ACE LOW CASES 
        //  this.mainCards = ['H7', 'D14', 'D3', 'D2', 'S11'];  //Axx_ _ a 2 3 
        //  this.mainCards = ['D4', 'D14', 'S11', 'D2', 'S10'];  //Ax_x_ a 2 4
        //  this.mainCards = ['D5', 'D14', 'S11', 'D2', 'S10'];  //Ax_x_ a 2 5
        //  this.mainCards = ['D3', 'D14', 'S11', 'D2', 'S10'];  //Ax_x_ a 3 5
        //  this.mainCards = ['D3', 'D14', 'S11', 'D4', 'S10'];  //Ax_x_ a 3 4
        //   this.mainCards = ['D5', 'D14', 'S11', 'D4', 'S10'];  //Ax_x_ a 3 4

        //REAL
        //  this.mainCards = ['H14', 'H3', 'S7', 'H5', 'C10']; // 3 to a straight flush
        //  this.mainCards = ['C10', 'H14', 'H3', 'S7', 'H5']; // 3 to a straight flush
        //  this.mainCards = ['H5', 'C10', 'H14', 'H3', 'S7']; // 3 to a straight flush
        //  this.mainCards = ['S7', 'H5', 'C10', 'H14', 'H3']; // 3 to a straight flush
        //  this.mainCards = ['H14', 'S7', 'H3', 'C10', 'H5']; // 3 to a straight flush
        //  this.mainCards = ['H14', 'H3', 'H5', 'C10', 'S7']; // 3 to a straight flush
        //  this.mainCards = ['S7', 'H14', 'H3', 'H5', 'C10']; // 3 to a straight flush
        //  this.mainCards = ['C10', 'S7', 'H14', 'H3', 'H5']; // 3 to a straight flush
        //  this.mainCards = ['H14', 'S7', 'C10', 'H3', 'H5']; // 3 to a straight flush
        //   this.mainCards = ['H14', 'H3', 'S7', 'C10', 'H5']; // 3 to a straight flush





        // this.mainCards =   ['H2', 'S6', 'S9', 'C11', 'D14']; // 2 unsuited high cards
        //  this.mainCards =   ['S11', 'H8', 'S5', 'S2', 'H13']; // 2 unsuited high cards
        //  this.mainCards =   ['H13', 'S6', 'S3', 'C11', 'D14']; // 2 lowest unsuited high cards
        //  this.mainCards =   ['S14', 'D12', 'S5', 'C2', 'H13']; // 2 lowest unsuited high cards


        // this.mainCards =   ['H2', 'S6', 'S9', 'C10', 'C11']; // Suited 10/J
        // this.mainCards =   ['S11', 'H3', 'D5', 'C2', 'S10']; // Suited 10/J
        // this.mainCards =   ['H2', 'S6', 'S9', 'C10', 'C12']; // Suited 10/Q
        // this.mainCards =   ['S12', 'H3', 'D5', 'C2', 'S10']; // Suited 10/Q
        // this.mainCards =   ['H2', 'S6', 'S9', 'C10', 'C13']; // Suited 10/K
        // this.mainCards =   ['S13', 'H3', 'D5', 'C2', 'S10']; // Suited 10/K

        // this.mainCards =    ['H2', 'S6', 'D7', 'C14', 'D9']; // One high card
        //  this.mainCards =   ['S6', 'H3', 'S5', 'C2', 'H11']; // One high card


    }
    getCard(cardNum, belongsTo) {
        if (!this.devMode) {
            var cardsInDeck = this.deck.length;
            if (belongsTo === 'main') {
                this.mainCards[cardNum] = this.deck[cardsInDeck - 1];
            }
            if (belongsTo === 'bonus') {
                this.bonusCards[cardNum] = this.deck[cardsInDeck - 1];
            }
            this.deck.pop();
        }
    }



   /*  setNumBonusCards() {
        var num = Math.floor(Math.random() * 10) + 1;      
        this.numBonusCards = this.bonusCardsChances[num];
    } */
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