import bonusLogic from './gameLogic/bonusLogic';
import dealer from './gameLogic/dealer';
var bonus = {
    data() {
        return {
            bonusRound: false,
            finalHandIndex: {
                start: undefined,
                end: undefined
            },
            nonBonusIndexes: undefined

        }
    },
    methods: {
        checkForBonus() {


            var test = this.mCards.slice(this.finalHandIndex.start, this.finalHandIndex.end);
            var bonusAnalysis = bonusLogic.fiveCards(test);
            console.log(bonusAnalysis);
            this.bonusRound = bonusAnalysis.isBonus;
            this.nonBonusIndexes = bonusAnalysis.removeCardIndex;

        },
    }

}
export { bonus as default }