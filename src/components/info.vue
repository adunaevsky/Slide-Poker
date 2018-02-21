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

                        <p class="pText">The RTP is 98.73% based on
                            <b>1 billion simulation rounds</b> that strictly followed a basic strategy.  When slide bonuses occur, there are multiple results per round.  On average, there are 88% more hand results seen in slide poker compared to classical poker.
                        </p>

                        <table class="simTbl">
                            <tr>
                                <th class="payTblHeader">Hand</th>
                                <th class="payTblHeader">Reward</th>
                                <th class="payTblHeader">Probability per hand</th>
                                <th class="payTblHeader">Probability per round</th>
                                <th class="payTblHeader">Probability difference</th>
                            </tr>
                            <tr v-for="(p,i) in simData" style="color: #00ff19">
                                <td>{{p.hand}}</td>
                                <td>{{p.reward}}</td>
                                <td>{{p.pPerHand}}</td>
                                <td>{{p.pPerRound}}</td>
                                <td>{{getBoost(p.pPerRound, p.pPerHand)}}</td>
                                
                            </tr>
                            <tr style=" color: #00ff19; font-weight:900">
                                <td>Total</td>
                                <td></td>
                                <td>1</td>
                                <td>1.8842</td>
                                <td>0.8842</td>

                            </tr>
                        </table>

                        <p class="pText"> While playing slide poker you have a 35.5 % chance at a slide bonus!  Most of the slides occur automatically (29.7 % chance):
                     
                          
                        </p>

                         <table class="simTbl" >
                            <tr>
                                <th>
                                    Chance of slide
                                </th>
                                <th>
                                   Description
                                </th>
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                  35.5 %
                                </td>
                                <td style=" text-align:left;">
                                   Chance of any slide (auto or manual when there is a player's choice).
                                </td>
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                  29.7 %
                                </td>
                                <td style=" text-align:left;">
                                   Chance of auto slide.  This could be a double or a triple slide to either the left or right direction depending on the position of the adjacent pair of cards.  A pair that is located on the edge of the hand will slide three times, while a pair located in the middle of the hand will slide twice.
                                </td>
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                  5.8 %
                                </td>
                                <td style=" text-align:left;">
                                   Chance of a manual slide.  This occurs when there are two pairs that are adjacent.  If this happens the player gets to choose which direction the slide bonus will go.
                                </td>
                            </tr>
                           
                        </table>

                        <p class="pText"> When a slide bonus is triggered, there is a chance that a reward multiplier will appear.  The chances of this happening and the value of the multiplier are based on the following table:</p>

                        <table class="simTbl" >
                            <tr>
                                <th>
                                    Multiplier value
                                </th>
                                <th>
                                    Chance
                                </th>                               
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                   1
                                </td>
                                <td>
                                    50 %
                                </td>                               
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                   2
                                </td>
                                <td>
                                    35 %
                                </td>                               
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                   3
                                </td>
                                <td>
                                    14 %
                                </td>                               
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                   5
                                </td>
                                <td>
                                    0.6 %
                                </td>                               
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                   8
                                </td>
                                <td>
                                    0.3 %
                                </td>                               
                            </tr>
                            <tr style=" color: #00ff19;">
                                <td>
                                   10
                                </td>
                                <td>
                                    0.1 %
                                </td>                               
                            </tr>
                        </table>





             


                         <p class="pText">
                         The following table lists all the possible ways the game may reward a player, taking into consideration all 
                         of the possible reward multipliers and the base pay table rewards.  
                         For example, a final reward of 3 may be achieved either from a Three of a Kind hand with a 
                         multiplier of 1 or from a multiplier of 3 combined with a Jacks or Better hand.  
                         </p>
                      
                        <table class="simTbl" style="max-width:20%;">
                            <tr>
                              
                                <th class="payTblHeader">Final Reward</th>
                                <th class="payTblHeader">Base Reward(s)</th>
                                <th class="payTblHeader">Multiplier(s)</th>
                                <th class="payTblHeader">Probability per result</th>
                              

                            </tr>
                            <tr v-for="(p,i) in virtualPaytable" style="color: #00ff19">
                                <td>{{p.fRewards}}</td>
                                <td><span v-for="(l,j) in p.bRewards">{{l}}<span v-if="isLast(p.bRewards, j)">, </span></span></td>
                                <td><span v-for="(m,n) in p.mult">{{m}}<span v-if="isLast(p.mult, n)">, </span></span></td>
                           <!--      <td>{{p.mult}}</td> -->
                               <!--  <td><span v-for="(l) in p.bRewards">{{l}} </span></td>
                                <td><span v-for="(m) in p.mult">{{m}} </span></td> -->
                                <td>{{p.p}}</td>                                
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

/* import bus from "./../bus"; */

export default {
  name: "info",
  props: ["open"],
  data() {
    return {
      openBOx: this.open,
      setImgWidth: "",
      tabs: [
        {
          label: "Game Statistics",
          active: true
        } /*{
                 label: 'Rules',
                 active: false
             }, {
                 label: 'Mode',
                 active: false
             },*/,
        {
          label: "About",
          active: false
        }
      ],
      simData: [
        {
          hand: "Royal Flush",
          reward: 800,
          pPerHand: "0.0000131",
          pPerRound: "0.0000246",
          pDifference: "0.0000115"
        },
        {
          hand: "Straight Flush",
          reward: 50,
          pPerHand: "0.0000507",
          pPerRound: "0.0000955",
          pDifference: "0.0000448"
        },
        {
          hand: "4 Aces w/ 2-4",
          reward: 400,
          pPerHand: "0.0000731",
          pPerRound: "0.0001377",
          pDifference: "0.0000646"
        },
        {
          hand: "4 2-4 w/ A-4",
          reward: 160,
          pPerHand: "0.0001785",
          pPerRound: "0.0003364",
          pDifference: "0.0001578"
        },
        {
          hand: "Four Aces",
          reward: 160,
          pPerHand: "0.0002224",
          pPerRound: "0.0004190",
          pDifference: "0.0001966"
        },
        {
          hand: "Four 2-4",
          reward: 80,
          pPerHand: "0.0005164",
          pPerRound: "0.0009730",
          pDifference: "0.0004566"
        },
        {
          hand: "Four 5-K",
          reward: 50,
          pPerHand: "0.0022689",
          pPerRound: "0.0042752",
          pDifference: "0.0020063"
        },
        {
          hand: "Full House",
          reward: 9,
          pPerHand: "0.0123932",
          pPerRound: "0.0233519",
          pDifference: "0.0109587"
        },
        {
          hand: "Flush",
          reward: 6,
          pPerHand: "0.0049300",
          pPerRound: "0.0092893",
          pDifference: "0.0043593"
        },
        {
          hand: "Straight",
          reward: 4,
          pPerHand: "0.0057901",
          pPerRound: "0.0109100",
          pDifference: "0.0051199"
        },
        {
          hand: "Three of a Kind",
          reward: 3,
          pPerHand: "0.1075555",
          pPerRound: "0.2026609",
          pDifference: "0.0951055"
        },
        {
          hand: "Two Pair",
          reward: 1,
          pPerHand: "0.1461628",
          pPerRound: "0.2754066",
          pDifference: "0.1292438"
        },
        {
          hand: "Jacks or Better",
          reward: 1,
          pPerHand: "0.2487002",
          pPerRound: "0.4686123",
          pDifference: "0.2199121"
        },
        {
          hand: "Non Qualifying Pair",
          reward: 0,
          pPerHand: "0.3301024",
          pPerRound: "0.6219940",
          pDifference: "0.2918916"
        },
        {
          hand: "High Card",
          reward: 0,
          pPerHand: "0.1410428",
          pPerRound: "0.2657592",
          pDifference: "0.1247165"
        }
      ],
      total: {
        pHand: 1,
        pRound: 1.8842,
        percent: 0.8842
      },
      virtualPaytable: [
        { fRewards: "1", bRewards: [1], mult: [1], p: 0.544286003 },
        { fRewards: "2", bRewards: [1], mult: [2], p: 0.139805472 },
        {
          fRewards: "3",
          bRewards: [1, 3],
          mult: [3, 1],
          p: 0.194479142
        },
        { fRewards: "4", bRewards: [4], mult: [1], p: 0.01091001 },
        { fRewards: "5", bRewards: [1], mult: [5], p: 0.00239881 },
        {
          fRewards: "6",
          bRewards: [6, 3],
          mult: [1, 2],
          p: 0.054172485
        },
        { fRewards: "8", bRewards: [1], mult: [8], p: 0.001193516 },
        {
          fRewards: "9",
          bRewards: [3, 9],
          mult: [3, 1],
          p: 0.035398255
        },
        { fRewards: "10", bRewards: [1], mult: [10], p: 0.00040505 },
        { fRewards: "15", bRewards: [3], mult: [5], p: 0.00076547 },
        { fRewards: "18", bRewards: [9], mult: [2], p: 0.004121486 },
        { fRewards: "24", bRewards: [3], mult: [8], p: 0.000391848 },
        { fRewards: "27", bRewards: [9], mult: [3], p: 0.00165627 },
        { fRewards: "30", bRewards: [3], mult: [10], p: 0.000131675 },
        { fRewards: "45", bRewards: [9], mult: [5], p: 0.000068017 },
        { fRewards: "50", bRewards: [50], mult: [1], p: 0.003066783 },
        { fRewards: "72", bRewards: [9], mult: [8], p: 0.000036083 },
        { fRewards: "80", bRewards: [80], mult: [1], p: 0.000684379 },
        { fRewards: "90", bRewards: [9], mult: [10], p: 0.000011386 },
        { fRewards: "100", bRewards: [50], mult: [2], p: 0.000912613 },
        { fRewards: "150", bRewards: [50], mult: [3], p: 0.000366832 },
        {
          fRewards: "160",
          bRewards: [160, 80],
          mult: [1, 2],
          p: 0.000721246
        },
        { fRewards: "240", bRewards: [80], mult: [3], p: 0.000077261 },
        { fRewards: "250", bRewards: [50], mult: [5], p: 0.000013403 },
        {
          fRewards: "320",
          bRewards: [160],
          mult: [2],
          p: 0.000167681
        },
        {
          fRewards: "400",
          bRewards: [400, 50, 80],
          mult: [1, 8, 5],
          p: 0.000101715
        },
        {
          fRewards: "480",
          bRewards: [160],
          mult: [3],
          p: 0.000066749
        },
        {
          fRewards: "500",
          bRewards: [50],
          mult: [10],
          p: 0.000002868
        },
        { fRewards: "640", bRewards: [80], mult: [8], p: 0.000002478 },
        {
          fRewards: "800",
          bRewards: [400, 800, 80, 160],
          mult: [2, 1, 10, 5],
          p: 0.000060756
        },
        {
          fRewards: "1200",
          bRewards: [400],
          mult: [3],
          p: 0.000014404
        },
        {
          fRewards: "1280",
          bRewards: [160],
          mult: [8],
          p: 0.000001008
        },
        { fRewards: "1600", bRewards: [160], mult: [10], p: 3.08e-7 },
        { fRewards: "2000", bRewards: [400], mult: [5], p: 3.11e-7 },
        { fRewards: "3200", bRewards: [400], mult: [8], p: 5.4e-7 },
        { fRewards: "4000", bRewards: [400], mult: [10], p: 7.7e-8 }
      ]
    };
  },
  methods: {
    isLast: function(list, index) {
      return list.length - 1 === index ? false : true;
    },
    closeBox: function() {
      this.$emit("closeInfo");
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
        this.setImgWidth = finalWidth + "px";
      }
    }
  },
  mounted() {
    this.simData.forEach(d => {
      this.total.percent = this.total.percent + d.percentOfTotalWins;
      this.total.pHand = this.total.pHand + d.pPerHand;
      this.total.pRound = this.total.pRound + d.pPerRound;
    });
  },
  filters: {
    formatNumber: function(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
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
  text-align: left;
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
  border-color: #0099cb;
  border-radius: 5px;
  cursor: pointer;
  color: #000000;
  font-size: 1em;
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
  text-align: center;
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

.rulesList > li {
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
  font-size: 1em;
}

.payTblHeader {
  width: 10%;
  font-size: 1.05em;
}

.simTbl {
  margin: 0 auto;
}

.simTbl td,
.simTbl th {
  padding: 10px;
  font-size: 1em;
}
</style>