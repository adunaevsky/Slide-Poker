<template>
  <div class="fullScreen">
      
    <pay-table></pay-table>
    <logo></logo>
    <menu-btns v-on:openInfo="openInfoBox"></menu-btns>
    <info v-on:closeInfo="infoBoxOpen = false" :open="infoBoxOpen" ></info>

    <div></div>

    <cash-display v-bind:MDBet="cash.MDBet" v-bind:baseBet="cash.baseBet" v-bind:bal="cash.balance" v-bind:win="cash.win" v-on:playWin="playWinMsg()" v-on:endRound="endRound()" v-bind:showValue="stage.results"></cash-display>

    <div id="mainCards" class="cardArea" :class="slideSpecs">
      <main-cards v-bind:cardPositions="cPos" v-bind:showCard="showMainCard" v-bind:cards="mCards" v-bind:flip="mainFlip" v-bind:skipFly="skipFlyIn"></main-cards>
    </div>

    <div id="holdButtons" class="cardArea" :class="slideSpecs" >
      <div class="mainCards">
        <div v-for="(hold,i) in holds" class="cSize" :class="hold.class" @click="updateHold(i)" v-if="i < 8 && i > 2">
          <div class="holdButtons" :style="{display: setHoldDisplay(hold )=== true ? 'block':'none'}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30">
              <rect style="fill:#FFE401; stroke:#BB2601; stroke-width:3;" x="20" y="5" rx="5" width="60" height="20" />
              <text text-anchor="middle" font-weight="900" font-size="15" x="50" y="20.5" fill="#000000" opacity="1">
                HELD</text>
            </svg>
          </div>
        </div>
      </div>
    </div>

      <div class="cardArea"   v-for="(r,index) in finalResults"  :class="topShiftClass[index]" >
        <div v-if="stage.multiResults" style="position: absolute;" class="label">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91 12"   @click="reviewCards(index)">
            <rect :fill="r.fill" style="stroke:#bababa; stroke-miterlimit:10;" x="1" y="1" rx="2" width="89" height="10" :opacity="reviewHand[index] === true ? 1 : 0.7" />
            <text v-if="r.rank > 0" class="payTableText" text-anchor="left" font-weight="bold" font-size="6" x="5" y="8.5" fill="#ffffff"  :opacity="reviewHand[index] === true ? 1 : 0.7">
              {{r.label}}</text>
            <text v-if="r.rank === 0" class="payTableText" text-anchor="middle" font-weight="bold" font-size="7" x="45" y="8.5" fill="#ffffff" :opacity="reviewHand[index] === true ? 1 : 0.7">
              {{r.label}}</text>
            <text v-if="r.rank > 0" class="labelCash payTableText" text-anchor="end" font-weight="bold" font-size="7" x="85" y="8.5" fill="#02F53A"  :opacity="reviewHand[index] === true ? 1 : 0.7">
              {{dollarFormat(r.reward)}}
            </text>
          </svg>
        </div>
      </div>


    <div id="singleResult" class="singleResult" v-if="stage.singleResult">

      <div style="position:absolute; left: 14.8%; width: 60%;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60">
          <rect :fill="finalResults[0].fill" style="stroke:#bababa; stroke-miterlimit:10;" x="30" y="25" rx="2" width="105" height="10" />
          <text v-if="finalResults[0].rank > 0" class="payTableText" text-anchor="start" font-weight="bold" font-size="7" x="33" y="32.5" fill="#ffffff">
            {{finalResults[0].label}}</text>
          <text v-if="finalResults[0].rank === 0" class="payTableText" text-anchor="middle" font-weight="bold" font-size="8" x="82" y="32.5" fill="#ffffff">
            {{finalResults[0].label}}</text>
          <text v-if="finalResults[0].rank > 0" class="labelCash payTableText" text-anchor="end" font-weight="bold" font-size="7" x="130" y="32.5" fill="#02F53A">
            {{dollarFormat(finalResults[0].reward)}}</text>
        </svg>
      </div>
    </div>



    <div class="btnHeight" :style="{display: stage.newRound || stage.results ? 'block': 'none'}" >
      <div class="btnBase" v-on:click="deal">
        <btn-right-deal></btn-right-deal>
      </div>
    </div>

    <div class="btnHeight" :style="{display: stage.mainCardsDealt && !stage.removeUnheldCards ? 'block': 'none'}">
      <div class="btnBase" v-on:click="draw">
        <btn-right-draw></btn-right-draw>
      </div>

    </div>

<!--  <button v-if="stage.showSlideBtns" @click="slideCards('left')" style="position:absolute; bottom:0%; width: 10em; font-size:1em; cursor: pointer;">slide LEFT</button>
 <button v-if="stage.showSlideBtns" @click="slideCards('right')" style="position:absolute; bottom:0%; width: 10em; left:10em; font-size:1em; cursor: pointer;">slide RIGHT</button>
 <button v-if="stage.showSlideBtns" @click="noSlide()" style="position:absolute; bottom:0%; width: 10em; left:20em; font-size:1em; cursor: pointer;">no slide</button>
 -->
    <!--     <button @click="option.autohold = !option.autohold" style="position:absolute; bottom:0%; width: 10rem; font-size:1rem; cursor: pointer;">
            <span v-if="option.autohold">☑</span>
            <span v-if="!option.autohold">☐</span>
            Auto hold
            <span v-if="!option.autohold"> is OFF</span>
            <span v-if="option.autohold"> is ON</span>
          </button>
          <div v-if="holdReason !== ''" style="position:absolute; bottom:0.5%; left: 10.5rem; font-size:1rem; cursor: pointer; color: lightyellow; background:  rgba(0, 0, 0, 0.5); padding: 0.5rem; padding-bottom: 0rem; ">
            <b>Hold reason: </b>
            {{holdReason}}

          </div> -->
<transition name="fade">
          <water-mark v-if="stage.removeUnheldCards === false"></water-mark>
</transition>
<again v-if="stage.results"  v-on:deal="deal"></again>

    <div style="display:none;">
      <audio id="soundFlip">
        <source src="/static/sounds/cardFlip.mp3" type="audio/mpeg">
      </audio>
      <audio id="soundLabel">
        <source src="/static/sounds/msmh_wand.mp3" type="audio/mpeg"> Your browser does not support the audio element.
      </audio>
      <audio id="dSoundDeal">
        <source src="/static/sounds/cardFlip2.mp3" type="audio/mpeg">
      </audio>
      <audio id="soundClearCards">
        <source src="/static/sounds/mp_deal.mp3" type="audio/mpeg">
      </audio>
      <audio id="playerWins">
        <source src="/static/sounds/m_multiCashOut.mp3" type="audio/mpeg">
      </audio>
      <audio id="soundBtnPress">
        <source src="/static/sounds/mk_ballLaunch.mp3" type="audio/mpeg">
      </audio>
      <audio id="chipClick">
        <source src="/static/sounds/chipClick.mp3" type="audio/mpeg">
      </audio>
      <audio id="endRound">
        <source src="/static/sounds/playerWins.mp3" type="audio/mpeg">
      </audio>

      <img src="./assets/cards/AC.svg">
      <img src="./assets/cards/JC.svg">
      <img src="./assets/cards/JD.svg">
      <img src="./assets/cards/JH.svg">
      <img src="./assets/cards/JS.svg">
      <img src="./assets/cards/KC.svg">
      <img src="./assets/cards/KD.svg">
      <img src="./assets/cards/KH.svg">
      <img src="./assets/cards/KS.svg">
      <img src="./assets/cards/QC.svg">
      <img src="./assets/cards/QD.svg">
      <img src="./assets/cards/QH.svg">
      <img src="./assets/cards/QS.svg">
      <img src="./assets/cards/cardBack2.svg">

    </div>

  </div>
</template>

<script>
import bus from "./bus";
import logo from "./components/logo";
import waterMark from "./components/waterMark";
import menuBtns from "./components/menuBtns";
import cashDisplay from "./components/cashDisplay";
import btnRightDeal from "./components/btnRightDeal";
import btnRightDraw from "./components/btnRightDraw";
import btnLeftBet from "./components/btnLeftBet";
import mainCards from "./components/cards";
import bonusCards from "./components/bonusCards";
import payTable from "./components/payTable";
import dealerPerson from "./gameLogic/dealer";
import handResult from "./gameLogic/handResult";
import autoHolder from "./gameLogic/autoHolder";
import info from "./components/info";
import again from "./components/playAgain";

var finalResults = new handResult();
var getHolds = new autoHolder();

var dealer = new dealerPerson(),
  cardPos = [
    "c8LPos",
    "c7LPos",
    "c6LPos",
    "c1Pos",
    "c2Pos",
    "c3Pos",
    "c4Pos",
    "c5Pos",
    "c6RPos",
    "c7RPos",
    "c8RPos"
  ],
  cardHolds = cardPos.map((a, i) => {
    return {
      class: a,
      active: false,
      display: true
    };
  });

export default {
  name: "app",
  components: {
    menuBtns,
    logo,
    waterMark,
    cashDisplay,
    btnRightDeal,
    btnLeftBet,
    mainCards,
    btnRightDraw,
    bonusCards,
    payTable,
    info,
    again
  },
  data() {
    return {
      infoBoxOpen: false,
      stage: {
        newRound: true,
        mainCardsDealt: false,
        removeUnheldCards: false,
        cardSwapComplete: false,
        draw: false,
        singleResult: false,
        multiResults: false,
        showSlideBtns: false
      },
      slide: {
        left: [false, false, false],
        right: [false, false, false]
      },
      skipFlyIn: false,
      /*  MDIndex: -1, */
      cash: {
        balance: 1000000,
        totalBet: 0,
        baseBet: 0,
        MDBet: 0,
        betWin: 100,
        win: 0,
        coinValue: 10,
        MD_coin_cost: 5,
        base_coin_cost: 5
      },
      option: {
        autohold: false,
        autoplay: false
      },
      holdReason: "",
      defaultClasses: "cSize flip-container",
      topShiftClass: ["bCard1", "bCard2", "bCard3", "bCard4"],
      mCards: dealer.mainCards,
      //  bCards: dealer.bonusCards, //to fix!!!
      showMainCard: [false, false, false, false, false, false, false, false],
      /* showBonusCard: [false, false, false, false, false], */
      mainFlip: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      originalSlide: "",
      reviewHand: [false, false, false, false],
      /*  bonusFlip: [false, false, false, false, false], */
      cPos: cardPos,
      labelPos: ["label1", "label2", "label3", "label4", "label5"],
      holds: cardHolds,
      finalResults: [],
      reviewSlides: {
        rightS32: false,
        rightS31: false,
        rightS30: false,
        rightS23: false,
        rightS21: false,
        rightS20: false,
        rightS13: false,
        rightS12: false,
        rightS10: false,
        rightS01: false,
        rightS02: false,
        rightS03: false,
        leftS32: false,
        leftS31: false,
        leftS30: false,
        leftS23: false,
        leftS21: false,
        leftS20: false,
        leftS13: false,
        leftS12: false,
        leftS10: false,
        leftS01: false,
        leftS02: false,
        leftS03: false
      },
      slideOptions: {
        right: [3, 2, 1, 0],
        left: [3, 4, 5, 6]
      }
    };
  },
  computed: {
    slideSpecs: function() {
      var result = {};
      result.lSlide1 = this.slide.left[0];
      result.lSlide2 = this.slide.left[1];
      result.lSlide3 = this.slide.left[2];
      result.rSlide1 = this.slide.right[0];
      result.rSlide2 = this.slide.right[1];
      result.rSlide3 = this.slide.right[2];

      for (var slideType in this.reviewSlides) {
        result[slideType] = this.reviewSlides[slideType];
      }

      //  console.log(result)

      return result;
    }
  },
  methods: {
    reviewCards(n) {
      for (var i = 0; i < this.slide[this.originalSlide].length; i++) {
        this.slide[this.originalSlide].splice(i, 1, false);
      }

      var currentHand = this.reviewHand.indexOf(true);
      this.updateActiveHand(n);
      var newHand = this.reviewHand.indexOf(true);

      if (currentHand !== newHand) {
        var slideClass = this.originalSlide + "S" + currentHand + newHand;
        var cardLimits = this.removeRevCards(newHand);

        for (var slideType in this.reviewSlides) {
          if (slideClass === slideType) {
            this.reviewSlides[slideType] = true;
          } else {
            this.reviewSlides[slideType] = false;
          }
        }

        setTimeout(() => {
          for (let s = 0; s < this.showMainCard.length; s++) {
            setTimeout(() => {
               if (s >= cardLimits.fCard && s <= cardLimits.lCard) {
                this.showMainCard.splice(s, 1, true);
              }
            }, s * 100);
          }
        }, 800);
      }
    },
    removeRevCards(handNum) {
      var firstCard = this.slideOptions[this.originalSlide][handNum],
        lastCard = firstCard + 4;
      for (var s = 0; s < this.showMainCard.length; s++) {
        if (s < firstCard || s > lastCard) {
          this.showMainCard.splice(s, 1, false);
        }
      }
      return {
        lCard: lastCard,
        fCard: firstCard
      };
    },
    updateActiveHand(i) {
      for (var s = 0; s < this.reviewHand.length; s++) {
        this.reviewHand.splice(s, 1, false);
      }
      this.reviewHand.splice(i, 1, true);
    },
    setHoldDisplay(h) {
      if (h.display && h.active) {
        return true;
      }
      return false;
    },
    openInfoBox() {
      this.infoBoxOpen = true;
      document.getElementById("infoFrame").style.zIndex = "1";
    },
    dollarFormat(x) {
      if (x === "") {
        return x;
      }
      return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getHeldCards() {
      return this.holds.map(c => {
        return c.active;
      });
    },
    deal() {
      if (this.stage.results) {
        this.reset();
        /*        this.stage.newRound = false;
               this.stage.results = false; */
        this.playBtnSound();

        setTimeout(() => {
          this.prepDeckAndShowMainCards();
        }, 900);
      } else {
        this.prepDeckAndShowMainCards();
      }
    },
    prepDeckAndShowMainCards() {
      dealer.newDeck();
      this.stage.newRound = false;
      this.cash.totalBet =
        this.cash.coinValue *
        (this.cash.base_coin_cost + this.cash.MD_coin_cost);

      this.cash.balance = this.cash.balance - this.cash.totalBet;

      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          this.showMainCard.splice(i + 3, 1, true);
          this.playDealSound();
          if (i === 4) {
            this.flipMainCards(300, [3, 4, 5, 6, 7], false);
          }
        }, i * 200);
      }
    },
    swapUnheldCards() {
      // console.log('swapping??', this.holds)

      var cardsRemoved = 0,
        totalRemove = 0,
        removedCardsIndex = [];
      this.holds.forEach((held, i, a) => {
        if (i < 8 && i > 2) {
          if (i === 3) {
            a.forEach((a, s) => {
              if (s > 2 && !a.active && s <= 7) {
                totalRemove++;
                // console.log(totalRemove);
              }
            });
            // console.log(totalRemove);
            if (totalRemove === 0) {
              //  console.log('got here. 1');
              this.determineSlide();
              // this.completeGameRound();
            }
          }

          if (!held.active) {
            cardsRemoved++;
            setTimeout(() => {
              this.showMainCard.splice(i, 1, false);

              dealer.swapCard(i); /* *** */
              bus.$emit("cardsUpdated");
              this.playDealSound();
              setTimeout(() => {
                this.mainFlip.splice(i, 1, false);
              }, 100);
            }, 200 * cardsRemoved);
            removedCardsIndex.push(i);
          }
          //  console.log(i, totalRemove, held.active, removedCardsIndex);
        }
      });

      setTimeout(() => {
        removedCardsIndex.forEach((cardIndexNum, i, a) => {
          if (i <= a.length - 1) {
            setTimeout(() => {
              /* console.log(this.showMainCard, i, a.length); */
              this.showMainCard.splice(cardIndexNum, 1, true);
              this.playDealSound();
              if (i === a.length - 1) {
                this.flipMainCards(300, a, this.stage.cardSwapComplete);
              }
            }, i * 200);
          }
        });
      }, 200 * totalRemove + 500);

      this.stage.cardSwapComplete = true;
    },
    noSlide() {
      // this.finalResults = [];
      this.finalResults.push(finalResults.fiveCards(this.mCards.slice(3, 8)));
      this.finalResults[0].reward = this.recordReward(this.finalResults[0]);
      this.stage.singleResult = true;
      this.stage.results = true;
      // this.stage.showSlideBtns = false;
      this.completeGameRound();
    },
    slideCards(direction, rounds) {
      // this.stage.showSlideBtns = false;
      this.originalSlide = direction;
      if (direction === "right") {
        this.slideRight(rounds);
      } else {
        this.slideLeft(rounds);
      }
    },
    determineSlide() {
      //   FOR TESTING AND DEVLOPMENT
     //  this.slideCards("right", 3);

      //   FOR PRODUCTION
      var cardValues = [];
      _.forEach(this.mCards, (a, i) => {
        if (i > 2 && i <= 7) {
          cardValues.push(parseInt(a.slice(1, a.length)));
        }
      });
      setTimeout(() => {
        if (cardValues[0] === cardValues[1]) {
          this.slideCards("right", 3);
        } else if (cardValues[3] === cardValues[4]) {
          this.slideCards("left", 3);
        } else if (cardValues[1] === cardValues[2]) {
          this.slideCards("right", 2);
        } else if (cardValues[2] === cardValues[3]) {
          this.slideCards("left", 2);
        } else {
          this.noSlide();
        }
      }, 500);
    },
    slideRight(rounds) {
      //  this.finalResults = [];
      this.finalResults.push(finalResults.fiveCards(this.mCards.slice(3, 8)));
      this.finalResults[0].reward = this.recordReward(this.finalResults[0]);
      this.updateActiveHand(0);
      this.stage.multiResults = true;

      for (let i = 0; i < rounds; i++) {
        setTimeout(() => {
          this.showMainCard.splice(7 - i, 1, false);
          this.playDealSound();
          this.holds[7 - i].display = false;

          this.doSlide(2 - i, "right");
          setTimeout(() => {
            this.showMainCard.splice(2 - i, 1, true);
            this.playDealSound();
          }, 1500);

          setTimeout(() => {
            dealer.getCard(2 - i);
            bus.$emit("cardsUpdated");
            this.mainFlip.splice(2 - i, 1, true);

            setTimeout(() => {
              this.finalResults.push(
                finalResults.fiveCards(this.mCards.slice(2 - i, 7 - i))
              );
              this.finalResults[i + 1].reward = this.recordReward(
                this.finalResults[i + 1]
              );
            }, 500);

            this.updateActiveHand(i + 1);
            this.playDealSound();
            if (i === rounds - 1) {
              this.stage.results = true;
              this.completeGameRound();
            }
          }, 1800);
        }, 300 + i * 3700);
      }
    },
    slideLeft(rounds) {
      //  this.finalResults = [];
      this.finalResults.push(finalResults.fiveCards(this.mCards.slice(3, 8)));
      this.finalResults[0].reward = this.recordReward(this.finalResults[0]);
      this.updateActiveHand(0);
      this.stage.multiResults = true;

      for (let i = 0; i < rounds; i++) {
        setTimeout(() => {
          this.playDealSound();
          this.showMainCard.splice(i + 3, 1, false);
          this.holds[i + 3].display = false;

          this.doSlide(i, "left");
          setTimeout(() => {
            this.showMainCard.splice(8 + i, 1, true);
            this.playDealSound();
          }, 1500);

          setTimeout(() => {
            dealer.getCard(8 + i);
            bus.$emit("cardsUpdated");
            this.mainFlip.splice(8 + i, 1, true);

            setTimeout(() => {
              this.finalResults.push(
                finalResults.fiveCards(this.mCards.slice(i + 4, i + 9))
              );
              this.finalResults[i + 1].reward = this.recordReward(
                this.finalResults[i + 1]
              );
            }, 500);

            this.updateActiveHand(i + 1);
            this.playDealSound();

            if (i === rounds - 1) {
              this.stage.results = true;
              this.completeGameRound();
            }
          }, 1800);
        }, 300 + i * 3700);
      }
    },
    doSlide(cardNum, direction) {
      for (var i = 0; i < this.slide[direction].length; i++) {
        if (cardNum === i) {
          this.slide[direction].splice(i, 1, true);
        } else {
          this.slide[direction].splice(i, 1, false);
        }
      }
    },
    recordReward(d) {
      return this.cash.coinValue * this.cash.base_coin_cost * d.payout * 1;
    },
    analyzeCash() {
      this.cash.win = 0;
      this.finalResults.forEach(d => {
        /*  (this.MDIndex > -1 ? dealer.numPayMultiply : 1); */
        this.cash.win = this.cash.win + d.reward;
      });
      this.cash.balance = this.cash.balance + this.cash.win;

      /*   console.log(this.finalResults, this.cash.win); */
    },
    draw() {
      this.stage.removeUnheldCards = true;
      this.swapUnheldCards();
    },
    updateHold(i) {
      if (this.stage.mainCardsDealt && !this.stage.removeUnheldCards) {
        this.holds[i].active = !this.holds[i].active;
        this.playBtnSound();
      }
    },
    reset() {
      this.soundClearCards.play();

      dealer.newDeck();
      this.skipFlyIn = false;
      this.finalResults = [];
      this.stage.mainCardsDealt = false;
      this.stage.removeUnheldCards = false;
      this.stage.newRound = false;
      this.stage.draw = false;
      this.stage.singleResult = false;
      this.stage.multiResults = false;
      this.stage.cardSwapComplete = false;
      this.stage.results = false;
      this.holdReason = "";

      setTimeout(() => {
        for (var s = 0; s < this.slide.left.length; s++) {
          this.slide.left.splice(s, 1, false);
          this.slide.right.splice(s, 1, false);
        }
      }, 300);

      for (var i = 0; i < 11; i++) {
        this.mCards.splice(i, 1, "");
        /*    this.bCards.splice(i, 1, ""); */
        /*    this.showBonusCard.splice(i, 1, false); */
        this.mainFlip.splice(i, 1, false);
        /*  this.bonusFlip.splice(i, 1, false); */
        this.showMainCard.splice(i, 1, false);
        this.holds[i].active = false;
        this.holds[i].display = true;
      }
    },
    flipMainCards(initialDelay, cards, swapComplete) {
      _.forEach(cards, (c, i, a) => {
        if (i <= a.length - 1) {
          //  console.log('got here.', i,'swapComplete: ', swapComplete)
          if (this.mCards[c] === "") {
            dealer.getCard(c);
            bus.$emit("cardsUpdated");
          }
          setTimeout(() => {
            this.mainFlip.splice(c, 1, true);

            this.playFlipSound();
            if (i === a.length - 1) {
              setTimeout(() => {
                this.stage.mainCardsDealt = true;
                if (swapComplete) {
                  this.determineSlide();
                }
              }, 300);
            }
          }, initialDelay);
          initialDelay = initialDelay + 100;
        }
      });
      //console.log(dealer.mainCards);
    },
    /*  setHolds() {
      var hold = getHolds.setHolds(dealer.mainCards);
      this.holdReason = hold.reason;
      //  console.log(hold);
      hold.result.forEach((h, i) => {
        cardHolds[i].active = h;
      });
    }, */
    completeGameRound() {
      // console.log("completeGameRound??", this.finalResults);

      this.analyzeCash();

      //  this.stage.showSlideBtns = true;

      /*   setTimeout(() => {
        this.stage.results = true;
      }, 500); */
      // this.getResults();
      /*  this.MDIndex = this.mCards.indexOf("MD");
      if (this.MDIndex > -1) {
        setTimeout(() => {
          this.dealBonusCards();
        }, 800);
      } else {
        setTimeout(() => {
          this.stage.results = true;
        }, 500);
        this.getResults();
      } */
    },
    playDealSound() {
      this.soundDeal.pause();
      this.soundDeal.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundDeal.play() || nopromise).catch(function() {});
    },
    playCashSound() {
      this.soundCash.pause();
      this.soundCash.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundCash.play() || nopromise).catch(function() {});
    },
    playFlipSound() {
      this.soundDeal.pause();
      this.soundDeal.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundDeal.play() || nopromise).catch(function() {});
    },
    playStarSound() {
      if (this.pDeal) {
        this.soundStar.pause();
        this.soundStar.currentTime = 0;
        var nopromise = {
          catch: new Function()
        };
        (this.soundStar.play() || nopromise).catch(function() {});
      }
    },
    playBtnSound() {
      this.soundBtn.pause();
      this.soundBtn.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundBtn.play() || nopromise).catch(function() {});
    },
    playBetsPlease() {
      this.soundBets.pause();
      this.soundBets.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundBets.play() || nopromise).catch(function() {});
    },
    playChipClick() {
      this.soundChip.pause();
      this.soundChip.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundChip.play() || nopromise).catch(function() {});
    },
    playWinMsg() {
      this.soundPlayerWins.pause();
      this.soundPlayerWins.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundPlayerWins.play() || nopromise).catch(function() {});
    },
    endRound() {
      this.soundEndRound.pause();
      this.soundEndRound.currentTime = 0;
      var nopromise = {
        catch: new Function()
      };
      (this.soundEndRound.play() || nopromise).catch(function() {});
    }
  },
  mounted: function() {
    this.soundFlip = document.getElementById("soundFlip");
    this.soundClearCards = document.getElementById("soundClearCards");
    this.soundDeal = document.getElementById("dSoundDeal");
    this.soundCash = document.getElementById("soundCashOut");
    this.soundStar = document.getElementById("soundStar");
    this.soundBtn = document.getElementById("soundBtnPress");
    this.soundBets = document.getElementById("betsPlease");
    this.soundChip = document.getElementById("chipClick");
    this.soundIntro = document.getElementById("loadingDone");
    this.soundPlayerWins = document.getElementById("playerWins");
    this.soundPlayerWins.volume = 0.5;
    this.soundEndRound = document.getElementById("soundLabel");
    /*     this.playIntro(); */
    this.cash.baseBet = this.cash.coinValue * this.cash.base_coin_cost;
    this.cash.MDBet = this.cash.coinValue * this.cash.MD_coin_cost;
  }
};
</script>

<style>
body {
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: none;
  -webkit-user-select: none;
  user-select: none;
  background-attachment: fixed;
  font-family: "HelveticaNeue-Light", "HelveticaNeue", Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  width: 100%;
  overflow: hidden;

  background: #0000a0;
}

.fullScreen,
#app {
  /*   font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  width: 100%;
  height: 100%;
  background-color: #0000a0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.holdButtons {
  padding-top: 42%;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
</style>
