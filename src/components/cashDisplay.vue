<template>
    <div class="cashDisplays">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80">

            <rect style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;" x="46" y="0.5" rx="2" width="53.5" height="10" />

            <rect style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;"  @click="updateBet()" :class="{glow:glow, noGlow:!glow}" x="46" y="12.5" rx="2" width="53.5" height="10" />

            <rect style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;" x="46" y="24.5" rx="2" width="53.5" height="10" />

            <!--  <rect style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;" x="46" y="36.5" rx="2" width="53.5" height="10" />
                            <rect style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;" x="46" y="48.5" rx="2" width="53.5" height="10" />
                 -->
            <text text-anchor="end" font-weight="bold" font-size="9" x="43" y="8.5" fill="#FFFFFF" opacity="0.8">
                BAL</text>
            <text text-anchor="middle" font-weight="bold" font-size="9" x="73" y="8.5" fill="#FFFFFF" opacity="1">
                {{dollarFormat(cash.balance)}}</text>

            <text text-anchor="end" font-weight="bold" font-size="9" x="43" y="20.5" fill="#FFFFFF" opacity="0.8">
                BET</text>
            <text text-anchor="middle" font-weight="bold" font-size="9" x="73" y="20.5" fill="#FFFFFF" opacity="1" :class="{pointer:glow}" @click="updateBet()">
                {{dollarFormat(cash.coinValue * cash.base_coin_cost / cash.adjustFactor)}} + {{dollarFormat(cash.coinValue * cash.slideCost / cash.adjustFactor)}}</text>

            <text text-anchor="end" font-weight="bold" font-size="9" x="43" y="32.5" fill="#FFFFFF" opacity="0.8">
                WIN</text>

            <!--    <text text-anchor="end" font-weight="bold" font-size="16" x="43" y="47" fill="#FEED07" opacity="0.8">
                                +</text>
                            <text text-anchor="end" font-weight="bold" font-size="16" x="43" y="59" fill="#FEED07" opacity="0.8">
                                ×</text> -->

            <!--     <text v-if="showValue" text-anchor="middle" font-weight="bold" font-size="9" x="73" y="45" fill="#FEED07" opacity="1">
                                4 CARDS</text>
                                  <text v-if="showValue" text-anchor="middle" font-weight="bold" font-size="9" x="73" y="56.5" fill="#FEED07" opacity="1">
                                3 Multiplyer</text> -->

            <text v-if="showValue" text-anchor="middle" font-weight="bold" font-size="9" x="73" y="32.5" fill="#00ff3b" opacity="1">
                {{dollarFormat(winDisplayed)}}</text>

        </svg>

    </div>
</template>

<script>
import bus from "./../bus";
export default {
  name: "cashDisplay",
  props: ["cash", "showValue", "glow"],
  /*    props: ['baseBet', 'slideBet', 'bal', 'win', 'showValue'], */
  data() {
    return {
      winDisplayed: 0
    };
  },
  methods: {
    updateBet() {
      if (this.glow) {
       this.$emit("updateBet");
      }
    },
    dollarFormat: function(x) {
      if (x === "") {
        return x;
      }
      return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    updateDisplay() {
      // console.log(this.cash, this.cash.win);
      if (this.cash.win > 0) {
        this.winDisplayed = 0;
        var cashCounter = setInterval(() => {
          if (this.cash.win - this.winDisplayed >= 1000) {
            this.winDisplayed = this.winDisplayed + 995;
          }
          if (this.cash.win - this.winDisplayed >= 100) {
            this.winDisplayed = this.winDisplayed + 95;
          }
          if (this.cash.win - this.winDisplayed >= 10) {
            this.winDisplayed = this.winDisplayed + 5;
          }
          if (this.cash.win - this.winDisplayed >= 1) {
            this.winDisplayed++;
          }

          if (this.winDisplayed === this.cash.win) {
            if (this.cash.win >= this.cash.baseBet) {
              this.$emit("playWin");
            }
            clearInterval(cashCounter);
          }
        }, 30);
      } else {
        this.winDisplayed = 0;

        this.$emit("endRound");
      }
    }
  },
  mounted() {
    bus.$on("updateCashDisplay", a => {
      this.cash.win = a.win;
      this.updateDisplay();

      // this.cash.win = a.cash.win;
    });
  }
};
</script>

<style scoped>
@-webkit-keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}
@-moz-keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}
@-o-keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}
@keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}

.glow {
  fill: #231f20;
}
.pointer {
  cursor: pointer;
}
.glow {
  cursor: pointer;
  -webkit-animation: glow 1s infinite; /* Safari 4+ */
  -moz-animation: glow 1s infinite; /* Fx 5+ */
  -o-animation: glow 1s infinite; /* Opera 12+ */
  animation: glow 1s infinite; /* IE 10+, Fx 29+ */
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .cashDisplays {
    width: 30%;
    float: right;
    margin-right: 1%;
    margin-top: 1%;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .cashDisplays {
    width: 42%;
    float: right;
    margin-right: 1%;
    margin-top: 1%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .cashDisplays {
    width: 30%;
    float: right;
    margin-right: 1%;
    margin-top: 1%;
  }
}
</style>