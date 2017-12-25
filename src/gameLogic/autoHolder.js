import handResult from './handResult'

var checkFor = new handResult();
var holdResult = [true, true, true, true, true];

class autoHolder {

    setHolds(playerCards) {
        var cards = [], r = {};
        holdResult = [true, true, true, true, true]; //reset holds for next analysis
        _.forEach(playerCards, (a, i) => {
            cards.push({
                suit: a.charAt(0),
                value: parseInt(a.slice(1, a.length)),
                id: i
            });
        });

        if (checkFor.royal(cards) || checkFor.straightFlush(cards)) {
            r.reason = 'royal flush or straight flush';
            r.result = holdResult;
        } else if (checkFor.fourOfKind(cards)) {
            r.reason = 'Four of a Kind';
            r.result = this.setHoldOnCardsOfDifValue(cards, 1);;
        } else if (this.almostRoyalFlush(cards)) {
            r.reason = '4 to a Royal Flush';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (checkFor.fullHouse(cards) || checkFor.flush(cards) || checkFor.straight(cards)) {
            r.reason = 'full-house, flush or straight';
            r.result = holdResult;
        } else if (checkFor.threeOfKind(cards)) {
            r.reason = 'three of a Kind';
            r.result = this.setHoldOnCardsOfDifValue(cards, 2);;
        } else if (this.fourToStrightFlush(cards)) {
            r.reason = '4 to a straight flush';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (checkFor.twoPair(cards)) {
            r.reason = 'two pair';
            r.result = this.setTwoPairHold(cards);
        } else if (checkFor.pair(cards)) {
            r.reason = 'high pair';
            r.result = this.setHighPairHold(cards);
        } else if (this.threeToRoyalFlush(cards)) {
            r.reason = '3 to a royal flush';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (this.fourToFlush(cards)) {
            r.reason = '4 to a flush';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (this.lowPair(cards)) {
            r.reason = 'low pair';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (this.fourToStraight(cards)) {
            r.reason = '4 to an outside straight (open ended straight)';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (this.twoSuitedHigh(cards)) {
            r.reason = '2 suited high cards';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (this.threeToStaight(cards)) {
            r.reason = '3 to a straight flush';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (this.twoUnsuitedHighCards(cards)) {
            r.reason = '2 unsuited high cards';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (this.twoSuitedTenToAce(cards)) {
            r.reason = 'Suited 10/J, 10/Q, or 10/K';
            r.result = holdResult; //holdResult was set in the if test!
        } else if (this.oneHighCard(cards)) {
            r.reason = 'One high card';
            r.result = holdResult; //holdResult was set in the if test!
        } else {
            r.reason = 'Nothing held. Cards are no good.'
            r.result = [false, false, false, false, false];
        }

        return r;

    }

    oneHighCard(cards) {

        var result = false, noGoodCards = [];
        cards.forEach((c) => {
            if (c.value <= 10) {
                noGoodCards.push(c);
            }
        });

        if(noGoodCards.length === 4){
            result = true;
            noGoodCards.forEach((j) => {
                holdResult[j.id] = false;
            });
        }



        return result;

    }

    twoSuitedTenToAce(cards) {
        var result = false;
        var cardSuits = this.getCardSuitCounts(cards);
        var noGoodCards = [], goodCards = [];

        for (var key in cardSuits) {
            cardSuits[key].forEach((c) => {
                if (c.value < 10) {
                    noGoodCards.push(c);
                } else {
                    goodCards.push(c);
                }
            });
        }

        if (noGoodCards.length === 3 && (goodCards[0].suit === goodCards[1].suit)) {

            result = true;
            noGoodCards.forEach((j) => {
                holdResult[j.id] = false;
            });
        }

        return result;

    }

    twoUnsuitedHighCards(cards) {
        var result = false;
        var sortedCards = _.sortBy(cards, [function (c) { return c.value; }]);
        /*  var lowCards = sortedCards.filter((d) => {
             return d.value <= 10;
         }); */

        var c = cards.reduce((acc, val) => {
            if (val.value <= 10) {
                acc.lowest.push(val);
            } else {
                acc.highest.push(val);
            }
            return acc;
        }, {
                lowest: [],
                highest: []
            });

        if (c.lowest.length === 3) {
            result = true;
            c.lowest.forEach((c) => {
                holdResult[c.id] = false;
            });
        } else if (c.highest.length === 3) {
            var sortedCards = _.sortBy(c.highest, [function (c) { return c.value; }]);
            result = true;
            c.lowest.forEach((j) => {
                holdResult[j.id] = false;
            });
            holdResult[sortedCards[2].id] = false;
        }

        return result;

    }

    threeToStaight(cards) {



        var sortedCards = _.sortBy(cards, [function (c) { return c.value; }]),
            c = sortedCards.map((v) => { return v.value }),  // c for card
            h = sortedCards.map((v) => { return v.id }),
            s = sortedCards.map((v) => { return v.suit });
        // h for hold
        var result = false;

        //  console.log('hold IDs:',h)
        //  console.log('card values:', c)

        //xxx cases --> 3 variations.
        if (!result && (s[0] === s[1] && s[1] === s[2]) && (
            (c[0] + 1 === c[1] && c[1] + 1 === c[2]) || //v1: xxx_ _
            (c[0] + 2 === c[1] && c[1] + 2 === c[2]) || //x_x_x with a sort order of xxx_ _
            (c[0] + 2 === c[1] && c[1] + 1 === c[2]) || //x_xx with a sort order of xxx_ _
            (c[0] + 1 === c[1] && c[1] + 2 === c[2])    //xx_x with a sort order of xxx_ _
        )
        ) {
            result = true;
            holdResult[h[3]] = false;
            holdResult[h[4]] = false;
        }

        if (!result && (s[1] === s[2] && s[1] === s[3]) && (
            (c[1] + 1 === c[2] && c[2] + 1 === c[3]) ||  //v2: _xxx_
            (c[1] + 2 === c[2] && c[2] + 2 === c[3]) ||  //x_x_x with a sort order of _xxx_
            (c[1] + 2 === c[2] && c[2] + 1 === c[3]) ||  //x_xx with a sort order of _xxx_
            (c[1] + 1 === c[2] && c[2] + 2 === c[3])     //xx_x with a sort order of _xxx_
        )) {
            result = true;
            holdResult[h[0]] = false;
            holdResult[h[4]] = false;
        }

        if (!result && (s[2] === s[3] && s[3] === s[4]) && (
            (c[2] + 1 === c[3] && c[3] + 1 === c[4]) ||   //v3: __xxx
            (c[2] + 2 === c[3] && c[3] + 2 === c[4]) ||   //x_x_x with a sort order of __xxx
            (c[2] + 2 === c[3] && c[3] + 1 === c[4]) ||   //x_xx  with a sort order of __xxx
            (c[2] + 1 === c[3] && c[3] + 2 === c[4])      //xx_x  with a sort order of __xxx
        )) {
            result = true;
            holdResult[h[0]] = false;
            holdResult[h[1]] = false;
        }

        if (c[4] === 14 && !result && (s[0] === s[1] && s[1] === s[4])) {
            // ace cases
            if ((c[0] === 2 && c[1] === 3) ||  //Axx_ _ a 2 3  sort order 2 3 _ _A
                (c[0] === 2 && c[1] === 4) ||    //Ax_x_ a 2 4  
                (c[0] === 2 && c[1] === 5) ||    //Ax_x_ a 2 5  
                (c[0] === 4 && c[1] === 5) ||    //Ax_x_ a 4 5  
                (c[0] === 3 && c[1] === 5) ||    //Ax_x_ a 3 5  
                (c[0] === 3 && c[1] === 4)     //Ax_x_ a 3 4  
            ) {
                result = true;
                holdResult[h[2]] = false;
                holdResult[h[3]] = false;
            }
        }

        return result;

    }

    twoSuitedHigh(cards) {
        var suits = this.getCardSuitCounts(cards),
            result = false,
            noGoodCards = [];
        for (var key in suits) {
            var sortedCards = _.sortBy(suits[key], [function (c) { return c.value; }]);
            if (sortedCards.length >= 2 &&
                sortedCards[sortedCards.length - 1].value >= 11 &&
                sortedCards[sortedCards.length - 2].value >= 11) {

                result = true;
                if (sortedCards.length === 3) {
                    holdResult[sortedCards[0].id] = false;
                }
            } else {
                suits[key].forEach((j) => {
                    noGoodCards.push(j);
                });
            }
        }

        if (result) {
            noGoodCards.forEach((l) => {
                holdResult[l.id] = false;
            });
        }

        return result;

    }

    fourToStraight(cards) {
        var sortedCards = _.sortBy(cards, [function (c) { return c.value; }]);
        var result = false;

        if (sortedCards[0].value + 1 === sortedCards[1].value &&
            sortedCards[1].value + 1 === sortedCards[2].value &&
            sortedCards[4].value === 14 && sortedCards[0].value === 2
        ) {
            //extra card is HIGH --- since ACE is LOW
            holdResult[sortedCards[3].id] = false;
            result = true;
        }

        if (sortedCards[0].value + 1 === sortedCards[1].value &&
            sortedCards[1].value + 1 === sortedCards[2].value &&
            sortedCards[2].value + 1 === sortedCards[3].value
        ) {
            //extra card is HIGH, so don't hold it.
            holdResult[sortedCards[4].id] = false;
            result = true;
        }

        if (sortedCards[3].value + 1 === sortedCards[4].value &&
            sortedCards[1].value + 1 === sortedCards[2].value &&
            sortedCards[2].value + 1 === sortedCards[3].value
        ) {

            //extra card is LOW, so don't hold it.
            holdResult[sortedCards[0].id] = false;
            result = true;

        }

        return result;
        return false;
    }

    lowPair(cards) {
        //a HIGH PAIR has was already tested by this if statement, so only low pairs are possible, if they exist.
        var cardValueCounts = this.getCardValueCounts(cards), badCards = [], result = false;
        for (var key in cardValueCounts) {
            if (cardValueCounts[key].length == 2) {
                result = true;
            } else {
                cardValueCounts[key].forEach((c) => {
                    badCards.push(c);
                });
            }
        }

        if (result) {
            badCards.forEach((c) => {
                holdResult[c.id] = false;
            });

        }
        return result;
    }

    fourToFlush(cards) {
        var suits = this.getCardSuitCounts(cards), result = false, badCard;
        for (var key in suits) {
            if (suits[key].length === 4) {
                result = true;
            } else {
                badCard = suits[key][0];
            }
        }

        if (result) {
            holdResult[badCard.id] = false;
        }

        return result;
    }

    threeToRoyalFlush(cards) {
        var suits = this.getCardSuitCounts(cards);
        var reqValues = [10, 11, 12, 13, 14], validCards = 0, result = false, noGoodCards = [];
        for (var key in suits) {
            if (suits[key].length === 3) {
                suits[key].forEach((j) => {
                    if (reqValues.indexOf(j.value) > -1) {
                        validCards++;
                    }
                });
            } else {
                suits[key].forEach((j) => {
                    noGoodCards.push(j);
                })
            }
        }
        if (validCards === 3) {
            noGoodCards.forEach((l) => {
                holdResult[l.id] = false;
            });
            result = true;
        }
        return result;
    }

    setHighPairHold(cards) {
        var result = [false, false, false, false, false];
        var cardValueCounts = this.getCardValueCounts(cards);

        for (var key in cardValueCounts) {
            if (cardValueCounts[key].length === 2) {
                result[cardValueCounts[key][0].id] = true;
                result[cardValueCounts[key][1].id] = true;
            }
        }
        return result;
    }

    setTwoPairHold(cards) {

        var result = [true, true, true, true, true];
        var cardValueCounts = this.getCardValueCounts(cards);

        for (var key in cardValueCounts) {
            if (cardValueCounts[key].length === 1) {
                result[cardValueCounts[key][0].id] = false;
            }
        }
        return result;
    }

    getCardSuitCounts(cards) {

        return cards.reduce((acc, val) => {
            if (typeof acc[val.suit] === 'undefined') {
                acc[val.suit] = [val];
            } else {
                acc[val.suit].push(val);
            }
            return acc;
        }, {});

    }
    getCardValueCounts(cards) {

        return cards.reduce((acc, val) => {
            if (typeof acc[val.value] === 'undefined') {
                acc[val.value] = [val];
            } else {
                acc[val.value].push(val);
            }
            return acc;
        }, {});

    }

    setHoldOnCardsOfDifValue(cards, maxCardsToDrop) {
        var result = [true, true, true, true, true];
        var cardCounts = checkFor.getValueCounts(cards);
        for (var key in cardCounts) {
            if (cardCounts[key] <= maxCardsToDrop) {
                cards.forEach((c, i) => {
                    if (c.value === parseInt(key)) {
                        result[i] = false;
                    }
                })
            }
        }
        return result;
    }


    fourToStrightFlush(cards) {
        var sortedCards = _.sortBy(cards, [function (c) { return c.value; }]);
        var result = false;

        if (sortedCards[0].value + 1 === sortedCards[1].value &&
            sortedCards[1].value + 1 === sortedCards[2].value &&
            sortedCards[2].value + 1 === sortedCards[3].value
        ) {
            if (sortedCards[0].suit === sortedCards[1].suit &&
                sortedCards[1].suit === sortedCards[2].suit &&
                sortedCards[2].suit === sortedCards[3].suit) {
                //extra card is HIGH, so don't hold it.
                holdResult[sortedCards[4].id] = false;
                result = true;
            }
        }

        if (sortedCards[3].value + 1 === sortedCards[4].value &&
            sortedCards[1].value + 1 === sortedCards[2].value &&
            sortedCards[2].value + 1 === sortedCards[3].value
        ) {

            if (sortedCards[3].suit === sortedCards[4].suit &&
                sortedCards[1].suit === sortedCards[2].suit &&
                sortedCards[2].suit === sortedCards[3].suit) {
                //extra card is LOW, so don't hold it.
                holdResult[sortedCards[0].id] = false;
                result = true;
            }

        }

        return result;
    }

    almostRoyalFlush(cards) {

        //  console.log('got here sdfsdfsdf');

        var result = true;
        //var sameSuits = this.findSameSuits(cards);
        var sameSuits = this.findSameSuits2(cards);

        // console.log(sameSuits);

        if (sameSuits.values.length === 5) {
            //checkIfAlmostCombo();
            holdResult = checkIfAlmostCombo();
        } else if (sameSuits.values.length === 4) {
            // console.log('same suit??');


            var tempHolds = checkIfAlmostCombo();
            //  console.log('what now/?', result);
            if (result) {
                holdResult = tempHolds
                // console.log('what givves this?');
                //the 4 suits are good, now find the missing one!
                var badCard = this.filterCardsToDrop(cards, sameSuits.cards);
                console.log(badCard);
                holdResult[badCard[0].id] = false;
            }
        }

        else {
            result = false;
        }

        // console.log(result);
        return result;

        function checkIfAlmostCombo() {
            var tempHolds = [true, true, true, true, true];
            var reqValues = [10, 11, 12, 13, 14];
            var spare = 0, dropCardIndex;

            _.forEach(sameSuits.values, (v, i) => {
                var valueCheck = reqValues.indexOf(v);
                // console.log(valueCheck);
                if (valueCheck === -1) {
                    if (spare == 0) {
                        spare++
                        tempHolds[i] = false;
                    } else {
                        result = false;
                    }
                }
            });
            return tempHolds;
        }

    }

    filterCardsToDrop(allCards, goodCards) {
        //https://stackoverflow.com/questions/32965688/comparing-two-arrays-of-objects-and-exclude-the-elements-who-match-values-into

        var props = ['suit', 'value', 'id'];
        var badCard = allCards.filter(function (o1) {
            // filter out (!) items in result2
            return !goodCards.some(function (o2) {
                return o1.id === o2.id;          // assumes unique id
            });
        }).map(function (o) {
            // use reduce to make objects with only the required properties
            // and map to apply this to the filtered array as a whole
            return props.reduce(function (newo, name) {
                newo[name] = o[name];
                return newo;
            }, {});
        });
        return badCard;
    }

    findSameSuits2(card) {

        var suitCounts = card.reduce((acc, val) => {
            acc[val.suit].push(val);
            return acc;
        }, { H: [], C: [], D: [], S: [] });

        var currentLongest = 0, currentSuit = '';
        for (var key in suitCounts) {
            if (suitCounts[key].length > currentLongest) {
                currentSuit = key;
                currentLongest = suitCounts[key].length;
            }
        }

        var valuesArray = suitCounts[currentSuit].map((c) => {
            return c.value;
        });

        var result = {
            values: valuesArray,
            cards: suitCounts[currentSuit]
        };

        return result;
    }

}

export { autoHolder as default }