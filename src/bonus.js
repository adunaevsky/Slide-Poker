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
            console.log(bonusAnalysis);
            this.missingCardsForRoyal = bonusAnalysis.missingCardsForRoyal;
            this.stage.startBonus = bonusAnalysis.isBonus;
            
            this.stage.bonusDone = false;
            this.nonBonusIndexes = bonusAnalysis.removeCardIndex;

        },
        getBonusResults() {
            var test = finalResults.fiveCards(this.mCards.slice(this.finalHandIndex.start, this.finalHandIndex.end));
            console.log(test)
            this.stage.startBonus = false;
            this.stage.bonusDone = true;
            this.stage.results = true;
        }
    }

}
export { bonus as default }