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
                } else {
                    acc[val.suit] = { count: 1, index: [i] };
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


        return {
            isBonus: result,
            removeCardIndex: suitCount.notRoyalIndex,
            falshCardIndex: result ? suitCount[royalSuit].index : []
        }


    },
    findSameSuits(card) {
        var result = false;

        var suitCount = card.reduce((acc, val) => {
            if (val.value > 9) {
                if (acc[val.suit]) {
                    acc[val.suit]++;
                } else {
                    acc[val.suit] = 1;
                }
            }
            return acc;
        }, {});



        for (var key in suitCount) {
            if (suitCout[key] == 3 || suitCout[key] == 4) {
                result = true;
            }
        }

        return result
    }


};

export { bonusLogic as default }