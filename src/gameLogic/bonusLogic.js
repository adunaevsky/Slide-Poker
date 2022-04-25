var bonusLogic = {

    fiveCards(pCards) {
        var cards = [];
        pCards.forEach((a) => {
            cards.push({
                suit: a.charAt(0),
                value: parseInt(a.slice(1, a.length))
            });
        });


        return this.findAlmostRoyal(cards);



        /* console.log(cards) */
    },
    findAlmostRoyal(card) {
        var result = false;

        var suitCount = card.reduce((acc, val, i) => {
            if (val.value > 9) {
                if (acc[val.suit]) {
                    acc[val.suit].count++;
                    acc[val.suit].index.push(i);
                    acc[val.suit].values.push(val.value);
                } else {
                    acc[val.suit] = { count: 1, index: [i], values: [val.value] };
                }
            } else {
                acc.notRoyalIndex.push(i);
            }
            return acc;
        }, { notRoyalIndex: [] });

        var royalSuit;
        for (var key in suitCount) {
            if (key !== 'notRoyalIndex') {
                if (suitCount[key].count == 3 || suitCount[key].count == 4) {
                    result = true;
                    royalSuit = key;
                }
                else {
                    suitCount.notRoyalIndex = [...suitCount.notRoyalIndex, ...suitCount[key].index];
                }
            }

        }

        var missingCardsForRoyal = result ? this.determineMissingCards(suitCount[royalSuit].values, royalSuit) : [];


        return {
            isBonus: result,
            removeCardIndex: suitCount.notRoyalIndex,
            flashCardIndex: result ? suitCount[royalSuit].index : [],
            royalSuit: royalSuit,
            missingCardsForRoyal: missingCardsForRoyal
        }


    },
    determineMissingCards(values, royalSuit) {
      
        var result = [];
        for (var i = 10; i < 15; i++) {
            if (values.indexOf(i) === -1) {
                result.push(royalSuit + i);
            }
        }
        return result;
    }


};

export { bonusLogic as default }