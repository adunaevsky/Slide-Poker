<template>
  <div class="fullScreen" :style="bgImg">
    <pay-table
      v-bind:adjustFactor="cash.adjustFactor"
      v-bind:coinValue="cash.coinValue"
    ></pay-table>
    <logo></logo>
    <menu-btns v-on:openInfo="openInfoBox"></menu-btns>
    <info v-on:closeInfo="infoBoxOpen = false" :open="infoBoxOpen"></info>
    <cash-display
      v-bind:glow="stage.results || stage.newRound"
      v-on:updateBet="changeBet()"
      v-bind:cash="cash"
      v-on:playWin="playWinMsg()"
      v-on:endRound="endRound()"
      v-bind:showValue="stage.results"
    ></cash-display>

    <div id="mainCards" class="cardArea" :class="slideSpecs">
      <main-cards
        v-bind:cardPositions="cPos"
        v-bind:showCard="showMainCard"
        v-bind:cards="mCards"
        v-bind:flip="mainFlip"
      ></main-cards>
    </div>

    <div id="holdButtons" class="cardArea" :class="slideSpecs">
      <div class="mainCards">
        <div
          v-for="(hold, i) in holds"
          class="cSize"
          :class="hold.class"
          @click="updateHold(i)"
          v-if="i < 8 && i > 2"
        >
          <div
            class="holdButtons"
            :style="{
              display: setHoldDisplay(hold) === true ? 'block' : 'none',
            }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30">
              <rect
                style="fill: #ffe401; stroke: #bb2601; stroke-width: 3"
                x="20"
                y="5"
                rx="5"
                width="60"
                height="20"
              />
              <text
                text-anchor="middle"
                font-weight="900"
                font-size="15"
                x="50"
                y="20.5"
                fill="#000000"
                opacity="1"
              >
                HELD
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div
      class="cardArea"
      v-for="(r, index) in finalResults"
      :class="topShiftClass[index]"
    >
      <div v-if="stage.multiResults && !stage.bonusDone" style="position: absolute" class="label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 110 12"
          @click="reviewCards(index)"
        >
          <rect
            :fill="r.fill"
            style="stroke: #bababa; stroke-miterlimit: 10"
            x="1"
            y="1"
            rx="2"
            width="89"
            height="10"
            :opacity="reviewHand[index] === true ? 1 : 0.4"
          />
          <text
            v-if="r.rank > 0"
            class="payTableText"
            text-anchor="left"
            font-weight="bold"
            font-size="6"
            x="5"
            y="8.5"
            fill="#ffffff"
            :opacity="reviewHand[index] === true ? 1 : 0.4"
          >
            {{ r.label }}
          </text>
          <text
            v-if="r.rank === 0"
            class="payTableText"
            text-anchor="middle"
            font-weight="bold"
            font-size="7"
            x="45"
            y="8.5"
            fill="#ffffff"
            :opacity="reviewHand[index] === true ? 1 : 0.4"
          >
            {{ r.label }}
          </text>
          <text
            v-if="r.rank > 0"
            class="labelCash payTableText"
            text-anchor="end"
            font-weight="bold"
            font-size="7"
            x="85"
            y="8.5"
            fill="#02F53A"
            :opacity="reviewHand[index] === true ? 1 : 0.4"
          >
            {{ dollarFormat(r.reward) }}
          </text>
          <g v-if="r.payMultiply > 1 && r.rank > 0">
            <circle
              cx="96"
              cy="6"
              r="5.5"
              stroke="yellow"
              stroke-width="1"
              fill="red"
              :opacity="reviewHand[index] === true ? 1 : 0.4"
            ></circle>
            <text
              class="payTableText"
              text-anchor="middle"
              font-weight="bold"
              font-size="6"
              x="96"
              y="8.5"
              fill="#ffffff"
              :opacity="reviewHand[index] === true ? 1 : 0.4"
            >
              ×{{ r.payMultiply }}
            </text>
          </g>
        </svg>
      </div>
    </div>

    <tap-labels
      v-if="stage.results && stage.animationDone && !stage.singleResult && !stage.bonusDone"
    ></tap-labels>
    <slide-btns
      v-if="stage.slideChoice"
      v-on:slideRight="slideChoice('right')"
      v-on:slideLeft="slideChoice('left')"
    />

    <div id="singleResult" class="singleResult" v-if="stage.singleResult || (stage.bonusDone && finalResults.length > 0)">
      <div style="position: absolute; left: 14.8%; width: 60%">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60">
          <rect
            :fill="finalResults[0].fill"
            style="stroke: #bababa; stroke-miterlimit: 10"
            x="30"
            y="25"
            rx="2"
            width="105"
            height="10"
          />
          <text
            v-if="finalResults[0].rank > 0"
            class="payTableText"
            text-anchor="start"
            font-weight="bold"
            font-size="7"
            x="33"
            y="32.5"
            fill="#ffffff"
          >
            {{ finalResults[0].label }}
          </text>
          <text
            v-if="finalResults[0].rank === 0"
            class="payTableText"
            text-anchor="middle"
            font-weight="bold"
            font-size="8"
            x="82"
            y="32.5"
            fill="#ffffff"
          >
            {{ finalResults[0].label }}
          </text>
          <text
            v-if="finalResults[0].rank > 0"
            class="labelCash payTableText"
            text-anchor="end"
            font-weight="bold"
            font-size="7"
            x="130"
            y="32.5"
            fill="#02F53A"
          >
            {{ dollarFormat(finalResults[0].reward) }}
          </text>
        </svg>
      </div>
    </div>

    <div
      class="btnHeight"
      :style="{ display: stage.newRound || stage.results ? 'block' : 'none' }"
    >
      <div v-if="!stage.startBonus" class="btnBase" v-on:click="deal">
        <btn-right-deal></btn-right-deal>
      </div>

      <div v-if="stage.startBonus" class="btnBase" v-on:click="playBonus">
        <bonus-btn></bonus-btn>
      </div>
    </div>
    <!--     <div
      class="btnHeight"
      :style="{ display: bonusRound ? 'block' : 'none' }"
    >
      <div class="btnBase" v-on:click="playBonus">
        <bonus-btn></bonus-btn>
      </div>
    </div> -->

    <div
      class="btnHeight"
      :style="{
        display:
          stage.mainCardsDealt && !stage.removeUnheldCards ? 'block' : 'none',
      }"
    >
      <div class="btnBase" v-on:click="draw">
        <btn-right-draw></btn-right-draw>
      </div>
    </div>

    <div class="changeBG" @click="changeBG()"></div>

    <!-- FOR TESTING (start) -->
    <button
      @click="option.winBonus = !option.winBonus"
      style="
        position: absolute;
        bottom: 0%;
        width: 10rem;
        font-size: 1rem;
        cursor: pointer;
      "
    >
      <span v-if="option.winBonus">☑</span>
      <span v-if="!option.winBonus">☐</span>
      Win Bonus
      <span v-if="!option.winBonus"> OFF</span>
      <span v-if="option.winBonus"> ON</span>
    </button>
<!--     <button
      @click="option.autohold = !option.autohold"
      style="
        position: absolute;
        bottom: 0%;
        width: 10rem;
        font-size: 1rem;
        cursor: pointer;
      "
    >
      <span v-if="option.autohold">☑</span>
      <span v-if="!option.autohold">☐</span>
      Auto hold
      <span v-if="!option.autohold"> is OFF</span>
      <span v-if="option.autohold"> is ON</span>
    </button> -->
    <label for="" style="position: absolute; bottom: 0.5%; left: 10.5rem; width: 10rem">Draw</label>
    <select
      v-model="selectedTest"
      style="position: absolute; bottom: 0.5%; left: 13.5rem; width: 10rem"
    >
      <option v-for="o in testScenarios" :value="o.cards">{{ o.desc }}</option>
    </select>

<label for="" style="position: absolute; bottom: 0.5%; left: 25.5rem; width: 10rem">Slide</label>
    <select
      v-model="selectedSlide"
      style="position: absolute; bottom: 0.5%; left: 28.5rem; width: 10rem"
    >  <option v-for="o in slideScenarios" :value="o.cards">{{ o.desc }}</option>
   
    </select>


    <div
      v-if="holdReason !== ''"
      style="
        position: absolute;
        bottom: 0.5%;
        left: 20.5rem;
        font-size: 1rem;
        cursor: pointer;
        color: lightyellow;
        background: rgba(0, 0, 0, 0.5);
        padding: 0.5rem;
        padding-bottom: 0rem;
      "
    >



      <b>Hold reason: </b>
      {{ holdReason }}
    </div>

    <div
      style="
        color: white;
        position: absolute;
        bottom: 5%;
        left: 10%;
        width: 50%;
        font-size: 1.5rem;
        cursor: pointer;
      "
      v-if="option.bestSlide !== ''"
    >
      <b>Best slide</b> <br />
      <span v-if="option.bestSlide === 'left'"><<<</span>
      <span v-if="option.bestSlide === 'right'">>>></span>({{
        option.bestSlide
      }})
    </div>

    <!-- FOR TESTING (end) -->

    <transition name="fade">
      <water-mark v-if="stage.removeUnheldCards === false"></water-mark>
    </transition>
    <again v-if="stage.results && !stage.startBonus" v-on:deal="deal"></again>
    <!-- ENABLE WHEN IN PROD... annoying flashing. -->
        <flashBonus v-if="stage.results && stage.startBonus" v-on:playBonus="playBonus"></flashBonus>

    <div style="display: none">
      <audio id="soundFlip">
        <source src="/static/sounds/cardFlip.mp3" type="audio/mpeg" />
      </audio>
      <audio id="soundLabel">
        <source src="/static/sounds/msmh_wand.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="dSoundDeal">
        <source src="/static/sounds/cardFlip2.mp3" type="audio/mpeg" />
      </audio>
      <audio id="soundClearCards">
        <source src="/static/sounds/mp_deal.mp3" type="audio/mpeg" />
      </audio>
      <audio id="playerWins">
        <source src="/static/sounds/m_multiCashOut.mp3" type="audio/mpeg" />
      </audio>
      <audio id="soundBtnPress">
        <source src="/static/sounds/button.ogg" type="audio/ogg" />
      </audio>
      <audio id="chipClick">
        <source src="/static/sounds/chipClick.mp3" type="audio/mpeg" />
      </audio>
      <audio id="endRound">
        <source src="/static/sounds/playerWins.mp3" type="audio/mpeg" />
      </audio>

      <img src="./assets/cards/AC.svg" />
      <img src="./assets/cards/JC.svg" />
      <img src="./assets/cards/JD.svg" />
      <img src="./assets/cards/JH.svg" />
      <img src="./assets/cards/JS.svg" />
      <img src="./assets/cards/KC.svg" />
      <img src="./assets/cards/KD.svg" />
      <img src="./assets/cards/KH.svg" />
      <img src="./assets/cards/KS.svg" />
      <img src="./assets/cards/QC.svg" />
      <img src="./assets/cards/QD.svg" />
      <img src="./assets/cards/QH.svg" />
      <img src="./assets/cards/QS.svg" />
      <img src="./assets/cards/cardBack2.svg" />
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
import slideBtns from "./components/slideBtns";
import dealerPerson from "./gameLogic/dealer";
import handResult from "./gameLogic/handResult";

import info from "./components/info";
import again from "./components/playAgain";
import tapLabels from "./components/tapLabels";

import autoHolder from "./gameLogic/autoHolder";
import autoSlider from "./gameLogic/autoSlider";
import tests from "./gameLogic/testCases";

import bonus from "./bonus";
import flashBonus from "./components/flashBonus.vue";
import bonusBtn from "./components/bonusBtn.vue";

var finalResults = new handResult();
var getHolds = new autoHolder();
var getBestSlide = new autoSlider();

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
    "c8RPos",
  ],
  cardHolds = cardPos.map((a, i) => {
    return {
      class: a,
      active: false,
      display: true,
    };
  });

//console.log(dealer.getMultiply());

export default {
  mixins: [bonus],
  name: "app",
  components: {
    flashBonus,
    bonusBtn,
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
    again,
    tapLabels,
    slideBtns,
  },
  data() {
    return {
      bgImg: "background-image: url('./static/BBGG1.jpg')",
      bgImgs: ["1", "2", "3"],
      currentImg: 2,
      testScenarios: tests.test,
      slideScenarios: tests.presetSlides,
      selectedTest: tests.test[0].cards,
      selectedSlide: tests.presetSlides[0].cards,
      option: {
        autohold: false,
        autoplay: false,
        bestSlide: "", 
        winBonus: false
      },
      infoBoxOpen: false,
      stage: {
        newRound: true,
        mainCardsDealt: false,
        removeUnheldCards: false,
        cardSwapComplete: false,
        draw: false,
        singleResult: false,
        multiResults: false,
        showSlideBtns: false,
        animationDone: true,
        slideChoice: false,
        startBonus: false,
        bonusDone: false
      },
      slide: {
        left: [false, false, false],
        right: [false, false, false],
      },
      /*  MDIndex: -1, */
      cash: {
        balance: 1000,
        totalBet: 0,
        betWin: 100,
        win: 0,
        coinValue: 5,
        coinOptions: [1, 5, 10, 25, 50, 100, 200],
        activeCoinOption: 1,
        adjustFactor: 1,
        slideCost: 1,
        base_coin_cost: 1,
      },
      holdReason: "",
      defaultClasses: "cSize flip-container",
      topShiftClass: ["bCard1", "bCard2", "bCard3", "bCard4"],
      mCards: dealer.mainCards,
      showMainCard: Array(8).fill(false),
      mainFlip: Array(11).fill(false),
      originalSlide: "",
      reviewHand: [false, false, false, false],
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
        leftS03: false,
      },
      slideOptions: {
        right: [3, 2, 1, 0],
        left: [3, 4, 5, 6],
      },
    };
  },
  computed: {
    slideSpecs: function () {
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
      return result;
    },
  },
  methods: {
    reviewCards(n) {
      if (this.stage.results && this.stage.animationDone) {
        var currentHand = this.reviewHand.indexOf(true);
        this.updateActiveHand(n);
        var newHand = this.reviewHand.indexOf(true);

        if (currentHand !== newHand) {
          this.stage.animationDone = false;
          for (var i = 0; i < this.slide[this.originalSlide].length; i++) {
            this.slide[this.originalSlide].splice(i, 1, false);
          }

          var slideClass = this.originalSlide + "S" + currentHand + newHand;
          var cardLimits = this.removeRevCards(newHand);

          for (var slideType in this.reviewSlides) {
            if (slideClass === slideType) {
              this.reviewSlides[slideType] = true;
            } else {
              this.reviewSlides[slideType] = false;
            }
          }
          var revealNum = 0;
          setTimeout(() => {
            for (let s = 0; s < this.showMainCard.length; s++) {
              if (
                s >= cardLimits.fCard &&
                s <= cardLimits.lCard &&
                !this.showMainCard[s]
              ) {
                setTimeout(() => {
                  this.showMainCard.splice(s, 1, true);

                  setTimeout(() => {
                    this.holds[s].display = true;
                  }, 200);

                  this.playDealSound();
                }, revealNum * 100);
                revealNum++;
              }
              if (s === this.showMainCard.length - 1) {
                setTimeout(() => {
                  this.stage.animationDone = true;
                }, revealNum * 100);
              }
            }
          }, 800);
          for (let c = 0; c < this.showMainCard.length; c++) {
            if (
              c >= cardLimits.fCard &&
              c <= cardLimits.lCard &&
              this.showMainCard[c]
            ) {
              this.holds[c].display = true;
            } else {
              this.holds[c].display = false;
            }
          }
        }
      }
    },
    changeBet() {
      if (this.cash.activeCoinOption >= this.cash.coinOptions.length - 1) {
        this.cash.activeCoinOption = 0;
      } else {
        this.cash.activeCoinOption++;
      }
      this.playChipClick();
      this.cash.coinValue = this.cash.coinOptions[this.cash.activeCoinOption];
    },
    removeRevCards(handNum) {
      var firstCard = this.slideOptions[this.originalSlide][handNum],
        lastCard = firstCard + 4;
      for (var s = 0; s < this.showMainCard.length; s++) {
        if (s < firstCard || s > lastCard) {
          this.showMainCard.splice(s, 1, false);
        }
      }
      this.playDealSound();
      return {
        lCard: lastCard,
        fCard: firstCard,
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
      return this.holds.map((c) => {
        return c.active;
      });
    },
    deal() {
      if (this.stage.results) {
        this.reset();
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
        this.cash.coinValue * (this.cash.base_coin_cost + this.cash.slideCost);
        
      this.cash.balance = this.cash.balance - this.cash.totalBet;

      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          this.showMainCard.splice(i + 3, 1, true);
          this.playDealSound();
          if (i === 4) {
            this.flipMainCards(300, [3, 4, 5, 6, 7], false);
            setTimeout(() => {
              if (this.option.autohold) {
                this.setHolds();
              }
            }, 1200);
          }
        }, i * 200);
      }
    },
    swapUnheldCards() {
      var cardsRemoved = 0,
        totalRemove = 0,
        removedCardsIndex = [];
      this.holds.forEach((held, i, a) => {
        if (i < 8 && i > 2) {
          if (i === 3) {
            a.forEach((a, s) => {
              if (s > 2 && !a.active && s <= 7) {
                totalRemove++;
              }
            });
            if (totalRemove === 0) {
              this.determineSlide();
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
        }
      });
      setTimeout(() => {
        removedCardsIndex.forEach((cardIndexNum, i, a) => {
          if (i <= a.length - 1) {
            setTimeout(() => {
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
     // console.log('no slide!');
      this.finalResults.push(finalResults.fiveCards(this.mCards.slice(3, 8)));
      this.finalResults[0].reward = this.recordReward(this.finalResults[0]);
      this.stage.singleResult = true;
      this.stage.results = true;
      this.finalHandIndex.start = 3;
      this.finalHandIndex.end = 8;
      this.checkForBonus();
      this.analyzeCash();
    },
    slideCards(direction, rounds) {
    //  console.log(direction, rounds);
      this.originalSlide = direction;
      if (direction === "right") {
        this.slideRight(rounds);
      } else {
        this.slideLeft(rounds);
      }
    },
    determineSlide() {
      //   FOR TESTING AND DEVLOPMENT
      // this.slideCards("right", 3);

      //   FOR PRODUCTION
      var cardValues = [];
      let allHolds = this.getHeldCards(), cardsHeld = [];
      _.forEach(this.mCards, (a, i) => {
        if (i > 2 && i <= 7) {
          cardValues.push(parseInt(a.slice(1, a.length)));
          cardsHeld.push(allHolds[i]);
        }
      });
    //  console.log(cardValues, cardsHeld);
      setTimeout(() => {
        if (
          (cardValues[0] === cardValues[1] && 
            cardValues[3] === cardValues[4] && cardsHeld[0] && cardsHeld[1] && cardsHeld[3] && cardsHeld[4]) /* || // xx_xx
          (cardValues[0] === cardValues[1] &&
            cardValues[2] === cardValues[3]) || //xxxx_
          (cardValues[1] === cardValues[2] &&
            cardValues[3] === cardValues[4])  */|| //_xxxx
          (cardValues[1] === cardValues[2] &&
            cardValues[3] === cardValues[2] && cardsHeld[1] && cardsHeld[2] && cardsHeld[3]) /* || //_xxx_
          (cardValues[1] === cardValues[2] &&
            cardValues[2] === cardValues[4]) || //_xx_x
          (cardValues[0] === cardValues[2] && cardValues[3] === cardValues[2]) //x_xx_ */
        ) {
          this.stage.slideChoice = true;

          if (this.option.autohold) {
            this.option.bestSlide = getBestSlide.analyze(cardValues);
          }
        } else if (cardValues[0] === cardValues[1] && cardsHeld[0] && cardsHeld[1] && !cardsHeld[2]) {
          this.slideCards("right", 3);
        } else if (cardValues[3] === cardValues[4] && cardsHeld[3] && cardsHeld[4] && !cardsHeld[2]) {
          this.slideCards("left", 3);
        } else if (cardValues[1] === cardValues[2] && cardsHeld[1] && cardsHeld[2]) {
          this.slideCards("right", 2);
        } else if (cardValues[2] === cardValues[3] && cardsHeld[2] && cardsHeld[3]) {
          this.slideCards("left", 2);
        } else {
          this.noSlide();
        }
      }, 500);
    },
    slideChoice(direction) {
      this.stage.slideChoice = false;

      var cardValues = [];
      let allHolds = this.getHeldCards(), cardsHeld = [];
      _.forEach(this.mCards, (a, i) => {
        if (i > 2 && i <= 7) {
          cardValues.push(parseInt(a.slice(1, a.length)));
          cardsHeld.push(allHolds[i]);
        }
      });

      if (direction === "left") {
        if (cardValues[3] === cardValues[4]  && cardsHeld[3] && cardsHeld[4] && !cardsHeld[2]) {
          this.slideCards("left", 3);
        } else if (cardValues[2] === cardValues[3] && cardsHeld[2] && cardsHeld[3]) {
          this.slideCards("left", 2);
        } else if (cardValues[2] === cardValues[1] && cardsHeld[1] && cardsHeld[2]) {
          this.slideCards("left", 1);
        }
      }
      if (direction === "right") {
        if (cardValues[0] === cardValues[1] && cardsHeld[0] && cardsHeld[1] && !cardsHeld[2]) {
          this.slideCards("right", 3);
        } else if (cardValues[1] === cardValues[2] && cardsHeld[1] && cardsHeld[2]) {
          this.slideCards("right", 2);
        } else if (cardValues[2] === cardValues[3] && cardsHeld[2] && cardsHeld[3]) {
          this.slideCards("right", 1);
        }
      }
    },
    slideRight(rounds) {
      this.finalResults.push(finalResults.fiveCards(this.mCards.slice(3, 8)));
      this.finalResults[0].payMultiply = 1;
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
            dealer.getCard(2 - i, this.selectedSlide, 'slideCard');
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
              this.finalHandIndex.start = 2 - i;
              this.finalHandIndex.end = 7 - i;
              this.checkForBonus();
              this.stage.results = true;
              setTimeout(() => {
                this.analyzeCash();
              }, 800);
            }
          }, 1800);
        }, 300 + i * 3700);
      }
    },
    slideLeft(rounds) {
      this.finalResults.push(finalResults.fiveCards(this.mCards.slice(3, 8)));
      this.finalResults[0].payMultiply = 1;
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
            dealer.getCard(8 + i, this.selectedSlide, 'slideCard');
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
              this.finalHandIndex.start = i + 4;
              this.finalHandIndex.end = i + 9;
              this.checkForBonus();
              this.stage.results = true;
              setTimeout(() => {
                this.analyzeCash();
              }, 800);
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
      return (
        (this.cash.coinValue * this.cash.base_coin_cost * d.payout) /
        this.cash.adjustFactor
      );
    },
    analyzeCash() {
      this.cash.win = 0;
      this.finalResults.forEach((d) => {
       // console.log(d.reward, d.payMultiply)
        this.cash.win = this.cash.win + d.reward * d.payMultiply;
      });
//console.log('analyzeCash',  this.cash.win)
      this.cash.balance = this.cash.balance + this.cash.win;

      bus.$emit("updateCashDisplay", this.cash);
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
      for (var slideType in this.reviewSlides) {
        this.reviewSlides[slideType] = false;
      }
      this.option.bestSlide = "";
      dealer.newDeck();
      this.finalResults = [];
      this.stage.mainCardsDealt = false;
      this.stage.removeUnheldCards = false;
      this.stage.newRound = false;
      this.stage.draw = false;
      this.stage.singleResult = false;
      this.stage.multiResults = false;
      this.stage.cardSwapComplete = false;
      this.stage.results = false;
      this.stage.startBonus = false;
      this.stage.bonusDone = false;
      this.holdReason = "";


      setTimeout(() => {
        for (var s = 0; s < this.slide.left.length; s++) {
          this.slide.left.splice(s, 1, false);
          this.slide.right.splice(s, 1, false);
        }
      }, 300);

      for (var i = 0; i < 11; i++) {
        this.mCards.splice(i, 1, "");
        this.mainFlip.splice(i, 1, false);
        this.showMainCard.splice(i, 1, false);
        this.holds[i].active = false;
        this.holds[i].display = true;
      }
    },
    flipMainCards(initialDelay, cards, swapComplete) {
      _.forEach(cards, (c, i, a) => {
        if (i <= a.length - 1) {
          if (this.mCards[c] === "") {
            dealer.getCard(c, this.selectedTest, "mainCards");
         /*    console.log(this.mCards) */
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
    },
    setHolds() {
      var cards = [];
      for (var i = 0; i < dealer.mainCards.length; i++) {
        if (i >= 3 && i <= 7) {
          cards.push(dealer.mainCards[i]);
        }
      }
      var hold = getHolds.setHolds(cards);
      this.holdReason = hold.reason;
      hold.result.forEach((h, i) => {
        cardHolds[i + 3].active = h;
      });
    },
    playDealSound() {
      this.soundDeal.pause();
      this.soundDeal.currentTime = 0;
      var nopromise = {
        catch: new Function(),
      };
      (this.soundDeal.play() || nopromise).catch(function () {});
    },
    playCashSound() {
      this.soundCash.pause();
      this.soundCash.currentTime = 0;
      var nopromise = {
        catch: new Function(),
      };
      (this.soundCash.play() || nopromise).catch(function () {});
    },
    playFlipSound() {
      this.soundDeal.pause();
      this.soundDeal.currentTime = 0;
      var nopromise = {
        catch: new Function(),
      };
      (this.soundDeal.play() || nopromise).catch(function () {});
    },
    playStarSound() {
      if (this.pDeal) {
        this.soundStar.pause();
        this.soundStar.currentTime = 0;
        var nopromise = {
          catch: new Function(),
        };
        (this.soundStar.play() || nopromise).catch(function () {});
      }
    },
    playBtnSound() {
      this.soundBtn.pause();
      this.soundBtn.currentTime = 0;
      var nopromise = {
        catch: new Function(),
      };
      (this.soundBtn.play() || nopromise).catch(function () {});
    },
    playBetsPlease() {
      this.soundBets.pause();
      this.soundBets.currentTime = 0;
      var nopromise = {
        catch: new Function(),
      };
      (this.soundBets.play() || nopromise).catch(function () {});
    },
    playChipClick() {
      this.soundChip.pause();
      this.soundChip.currentTime = 0;
      var nopromise = {
        catch: new Function(),
      };
      (this.soundChip.play() || nopromise).catch(function () {});
    },
    playWinMsg() {
      this.soundPlayerWins.pause();
      this.soundPlayerWins.currentTime = 0;
      var nopromise = {
        catch: new Function(),
      };
      (this.soundPlayerWins.play() || nopromise).catch(function () {});
    },
    endRound() {
      this.soundEndRound.pause();
      this.soundEndRound.currentTime = 0;
      var nopromise = {
        catch: new Function(),
      };
      (this.soundEndRound.play() || nopromise).catch(function () {});
    },
    cycleBgImg() {
      setInterval(() => {
        this.changeBG();
      }, 180000);
    },
    changeBG() {
      if (this.currentImg >= this.bgImgs.length - 1) {
        this.currentImg = 0;
      } else {
        this.currentImg++;
      }
      this.bgImg =
        "background-image: url('./static/BBGG" +
        this.bgImgs[this.currentImg] +
        ".jpg')";
    },

    playBonus() {
      this.stage.results = false;
      this.stage.singleResult = false;

    for (var i = 0; i < 11; i++) {
        this.holds[i].active = false;
        this.holds[i].display = true;
      }



      this.nonBonusIndexes.forEach((i, index) => {
        setTimeout(() => {
          this.showMainCard.splice(i + this.finalHandIndex.start, 1, false);
          dealer.swapCard(i + this.finalHandIndex.start, this.option.winBonus ? this.missingCardsForRoyal[index] : undefined);
          this.playDealSound();

          if (index === this.nonBonusIndexes.length - 1) {
            setTimeout(() => {
              this.dealBonusCards();
            }, 800);
          }
        }, 200 * index);
      });
    },
    dealBonusCards() {
      this.nonBonusIndexes.forEach((i, index) => {
        setTimeout(() => {
          this.showMainCard.splice(i + this.finalHandIndex.start, 1, true);
          this.playDealSound();
          bus.$emit("cardsUpdated");
          if (index == this.nonBonusIndexes.length - 1) {
            this.getBonusResults();
          }
        }, 200 * index);
      });
    },
  },
  mounted() {
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
    this.cycleBgImg();
  },
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
  width: 100%;
  height: 100%;

  background-size: 100% 100%;
  background-repeat: no-repeat;

  background-color: #0000a0;
}

/*  background-color: #910301; */

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

.changeBG {
  position: absolute;
  bottom: 0.2rem;
  width: 2em;
  height: 2em;
  background-image: url("../static/refresh.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 1em;
  cursor: pointer;
}
</style>
