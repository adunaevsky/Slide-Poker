import bonusLogic from './gameLogic/bonusLogic';
var bonus = {
    data(){
        return{
            bonusRound:false,
            finalHandIndex:{
                start: undefined,
                end: undefined
            }
        }
    },
    methods: {
        checkForBonus() {
          

            var test = this.mCards.slice(this.finalHandIndex.start, this.finalHandIndex.end);
            var bonusAnalysis = bonusLogic.fiveCards(test);
            console.log(bonusAnalysis);
            this.bonusRound = bonusAnalysis.isBonus;
           
        },
        playBonus(){
            console.log('start bonus!')
        }
    }

}
export { bonus as default }