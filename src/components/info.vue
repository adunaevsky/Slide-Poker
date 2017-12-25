<template>
    <div class="infoFrame" id="infoFrame">

        <transition name="fade">

            <div v-if="open" class="infoBox">

                <div class="tabBox">
                    <div v-on:click="updateTabs(index)" class="tableTab" v-for="(t, index) in tabs" :class="{'tabActive': t.active, 'tabinActive': !t.active}">{{t.label}}</div>
                </div>

                <div v-if="tabs[1].active">

                    <div class="textBox">

                        <p style="text-align:left; padding-left:10px;">Realize Gaming, LLC specializes in designing and inventing new video poker and slot game concepts.&nbsp; We are building a portfolio of gaming patents with the goal of licensing them to companies for use in online or land based casinos. Please feel free to reach out to me at
                            <a href="mailto:tnottke@realizegamingllc.com" target="_blank">tnottke@realizegamingllc.com</a> or visit my website
                            <a href="http://www.realizegamingllc.com/" target="_blank">www.realizegamingllc.com&nbsp;</a> to learn more about our products.</p>

                        <br>
                        <br>

                        <img src="http://www.realizegamingllc.com/static/RealizeLogo.jpg" style="width:80%;">
                    </div>

                </div>

                <div v-if="tabs[0].active">

                    <div class="textBox">

                        <p class="pText">The RTP is 96.38% based on
                            <b>1 billion simulation rounds</b> that strictly followed a
                            <a target="blank" href="https://wizardofodds.com/games/video-poker/strategy/jacks-or-better/9-6/simple/">simple 16 rule strategy.</a>
                        </p>

                        <table class="simTbl">
                            <tr>
                                <th class="payTblHeader">Hand</th>
                                <th class="payTblHeader">Reward</th>
                                <th class="payTblHeader">Probability per hand</th>
                                <th class="payTblHeader">Probability per round</th>
                                <th class="payTblHeader">Probability difference</th>
                                <th class="payTblHeader">Percent of winnings</th>
                                <!--        <th class="payTblHeader">6x</th>
                                                                                                                        <th class="payTblHeader">Max</th> -->
                            </tr>
                            <tr v-for="(p,i) in simData" style="color: #00ff19">
                                <td>{{p.hand}}</td>
                                <td>{{p.reward}}</td>
                                <td>{{p.pPerHand}}</td>
                                <td>{{p.pPerRound}}</td>
                                <td>{{getBoost(p.pPerRound, p.pPerHand)}}</td>
                                <td>{{p.percentOfTotalWins}}</td>
                                <!-- <td>${{p['max'] * coin | formatNumber}}</td> -->
                            </tr>
                            <tr style=" color: #00ff19; font-weight:900">
                                <td>Total</td>
                                <td></td>
                                <td>1</td>
                                <td>1.6368</td>
                                <td>0.6368</td>
                                <td>100</td>

                            </tr>
                        </table>

                        <p class="pText"> The game was set to draw the multi-draw (MD) card with a 1 in 9 chance each time a card is drawn.</p>
                        <p class="pText"> Once an MD card is drawn, the chances of getting bonus cards and a pay multiplier are the following:</p>

                        <table class="simTbl" >
                            <tr>
                                <th>
                                    Bonus cards
                                </th>
                                <th>
                                    Chance per MD card
                                </th>
                                <th>
                                    Probability per round
                                </th>
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                    +2 <br> +3 <br> +4 <br> +5 <br>

                                </td>
                                <td>
                                    40% <br> 30% <br> 20% <br> 10% <br>
                                </td>
                                <td>
                                    0.12736 <br> 0.09552 <br> 0.063689 <br> 0.031836 <br>
                                </td>
                            </tr>
                        </table>

                        <table class="simTbl">
                            <tr>
                                <th>
                                    Pay multiplier
                                </th>
                                <th>
                                    Chance per MD card
                                </th>
                                <th>
                                    Probability per round
                                </th>
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                    x1 <br> x2 <br> x3 <br>

                                </td>
                                <td>
                                    60% <br> 30% <br> 10% <br>
                                </td>
                                <td>
                                    0.19103 <br> 0.09553 <br> 0.03184 <br>
                                </td>
                            </tr>
                        </table>

                    </div>

                </div>

            </div>
        </transition>

        <transition name="fade">
            <div v-if="open" class="closeBox" v-on:click="closeBox">×</div>
        </transition>

    </div>
</template>


<script>


/* import cashCounter from '../services/cashAnalyzer'
import bus from '../services/bus' */


export default {
    name: 'info',
    props: ['open'],
    data() {
        return {
            openBOx: this.open,
            setImgWidth: '',
            tabs: [
                {
                    label: 'Game Statistics',
                    active: true
                },  /*{
                 label: 'Rules',
                 active: false
             }, {
                 label: 'Mode',
                 active: false
             },*/
                {
                    label: 'About',
                    active: false
                }
            ],
            simData: [{
                hand: 'Royal Flush',
                reward: 800,
                percentOfTotalWins: 1.732,
                pPerHand: 0.00002096,
                pPerRound: 0.00003432
            },
            {
                hand: 'Straight Flush',
                reward: 50,
                percentOfTotalWins: 0.3860,
                pPerHand: 0.00007729,
                pPerRound: 0.0001265
            },
            {
                hand: 'Four of a Kind',
                reward: 25,
                percentOfTotalWins: 6.011,
                pPerHand: 0.002236,
                pPerRound: 0.003661
            },
            {
                hand: 'Full House',
                reward: 9,
                percentOfTotalWins: 9.302,
                pPerHand: 0.009972,
                pPerRound: 0.01632
            },
            {
                hand: 'Flush',
                reward: 6,
                percentOfTotalWins: 4.541,
                pPerHand: 0.007513,
                pPerRound: 0.01230
            },
            {
                hand: 'Straight',
                reward: 4,
                percentOfTotalWins: 3.304,
                pPerHand: 0.008424,
                pPerRound: 0.01379
            },
            {
                hand: 'Three of a Kind',
                reward: 3,
                percentOfTotalWins: 24.193,
                pPerHand: 0.07375,
                pPerRound: 0.1207
            },
            {
                hand: 'Two Pair',
                reward: 2,
                percentOfTotalWins: 25.989,
                pPerHand: 0.1213,
                pPerRound: 0.1986
            },
            {
                hand: 'Jacks or Better',
                reward: 1,
                percentOfTotalWins: 24.541,
                pPerHand: 0.22143,
                pPerRound: 0.3624
            }, {
                hand: 'Non-qualifying pair',
                pPerRound: 0.4682,
                pPerHand: 0.28604,
                reward: 0,
                percentOfTotalWins: 0
            }, {
                hand: 'High card',
                reward: 0,
                pPerRound: 0.4406,
                pPerHand: 0.2691,
                percentOfTotalWins: 0
            }],
            total: {
                pHand: 0,
                pRound: 0,
                percent: 0
            }
        }
    },
    methods: {
        closeBox: function() {
            this.$emit('closeInfo');
            document.getElementById("infoFrame").style.zIndex = "-1";
        },
        updateTabs: function(index) {
            _.forEach(this.tabs, (t, i) => {
                t.active = i === index ? true : false;
            });
        },
        getBoost(v1, v2) {
            return (v1 - v2).toFixed(4);
        }
    },
    watch: {
        open: function() {
            if (this.open) {
                var w = window.innerWidth;
                var h = window.innerHeight;
                var finalWidth = Math.min(w, h);
                this.setImgWidth = finalWidth + 'px';

            }
        }
    },
    mounted() {
        this.simData.forEach((d) => {
            this.total.percent = this.total.percent + d.percentOfTotalWins;
            this.total.pHand = this.total.pHand + d.pPerHand;
            this.total.pRound = this.total.pRound + d.pPerRound;
        });
    }, filters: {
        formatNumber: function(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}

</script>

<style scoped>
.pText {
    text-align: left;
    margin-left: 2em;
    line-height: 1.5em;
    margin-right: 2em;
}

.infoText {
    padding: 0% 5%;
    font-size: 1em;
    color: white;
    text-align: left
}

.tabBox {
    overflow: hidden;
    margin: auto;
    text-align: center;
    margin-top: 85px;
    margin-bottom: 20px;
}

.tabActive {
    background-color: #a0abff;
}

.tabinActive {
    background-color: #efefef;
}

.tabActive:hover {
    background-color: #a0abff;
}

.tabinActive:hover {
    background-color: #7e889e;
    color: #fff;
}

.tableTab {
    border-color: #0099CB;
    border-radius: 5px;
    cursor: pointer;
    color: #000000;
    font-size: 1.0em;
    text-align: center;
    border-style: none;
    padding: 4px 10px;
    margin-right: 15px;
    font-family: sans-serif;
    font-weight: bold;
    margin-top: 10px;
    display: inline-block;
}

a:link {
    color: #7aceff;
    background-color: transparent;
    text-decoration: none;
}

a:visited {
    color: #7aceff;
    background-color: transparent;
    text-decoration: none;
}

a:hover {
    color: #bdbec9;
    background-color: transparent;
    text-decoration: underline;
}

a:active {
    color: #91ffb5;
    background-color: transparent;
    text-decoration: underline;
}

.textBox {
    width: 100%;
    text-align: center
}

.rulesList {
    width: 80%;
    margin: 0 auto;
    padding: 0px;
    padding-bottom: 20px;
    line-height: 1.2em;
    font-size: 1em;
    padding-left: 10px;
    padding-right: 10px;
}

.rulesList>li {
    padding-top: 10px;
}

.closeBox {
    position: absolute;
    top: 0px;
    right: 0px;
    margin-right: 30px;
    margin-top: 15px;
    background-color: rgba(0, 0, 0, 1);
    height: 50px;
    width: 50px;
    border: 6px solid white;
    border-radius: 30px;
    text-align: center;
    line-height: 50px;
    font-size: 60px;
    color: white;
    cursor: pointer;
}

.infoFrame {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
}

.infoBox {
    position: relative;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    overflow: auto;
    height: 100%;
    font-size: 1.0em;
}

.payTblHeader {
    width: 10%;
    font-size: 1.05em;
}

.simTbl {
    margin: 0 auto;
}

.simTbl td, .simTbl th  {
    padding: 10px;
    font-size: 1em;
}
</style>