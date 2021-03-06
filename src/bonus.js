import bonusLogic from './gameLogic/bonusLogic';


import handResult from "./gameLogic/handResult";

var finalResults = new handResult();

var bonus = {
    data() {
        return {
            bonusRound: false,
            finalHandIndex: {
                start: undefined,
                end: undefined
            },
            nonBonusIndexes: undefined,
            missingCardsForRoyal: undefined

        }
    },
    methods: {
        checkForBonus() {


            var test = this.mCards.slice(this.finalHandIndex.start, this.finalHandIndex.end);
            var bonusAnalysis = bonusLogic.fiveCards(test);
            this.missingCardsForRoyal = bonusAnalysis.missingCardsForRoyal;
            this.stage.startBonus = bonusAnalysis.isBonus;

            this.stage.bonusDone = false;
            this.nonBonusIndexes = bonusAnalysis.removeCardIndex;

        },
        getBonusResults() {
            var checkFinal = finalResults.fiveCards(this.mCards.slice(this.finalHandIndex.start, this.finalHandIndex.end));

            this.finalResults = [];
            this.finalResults.forEach(()=>{
                checkFinal.payMultiply = 0;
                checkFinal.rank = undefined;
            });

            if (checkFinal.rank === 1) {
               // checkFinal.label = "BONUS Royal Flush!";
                checkFinal.reward = this.recordReward(checkFinal);
                checkFinal.payMultiply = 1;

                this.finalResults = [checkFinal];
              //  console.log(this.finalResults);
            }

            this.analyzeCash();
            this.stage.startBonus = false;
            this.stage.bonusDone = true;
            this.stage.results = true;
        }
    }

}
export { bonus as default }