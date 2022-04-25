<template>
  <div class="bonus">
    <svg
      @click="playBonus()"
      class="bonusImg noSelect"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
    >
      <text
        text-anchor="middle"
        class="bonusText bonusFlash"
        font-weight="bold"
        font-size="8"
        x="50"
        y="8"
        fill="#D7522D"
      >
        Play Royal Bonus!
      </text>
    </svg>
  </div>
</template>


<script>
export default {
  name: "playBonus",
  methods: {
    playBonus: function () {
      this.$emit("playBonus");
    },
  },
};
</script>

<style>
.bonusText {
  paint-order: stroke;
  stroke: #ffffff;
  /*  fill: #ffffff; */
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  font-weight: 800;
  font-family: Arial, Helvetica;
}

.bonus {
  position: relative;
}

.bonusImg {
  cursor: pointer;
  width: 100%;
  position: absolute;
}

@-webkit-keyframes fastGlow {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
@-moz-keyframes fastGlow {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
@-o-keyframes fastGlow {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
@keyframes fastGlow {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}

.bonusFlash {
  -webkit-animation: fastGlow 0.4s infinite; /* Safari 4+ */
  -moz-animation: fastGlow 0.4s infinite; /* Fx 5+ */
  -o-animation: fastGlow 0.4s infinite; /* Opera 12+ */
  animation: fastGlow 0.4s infinite; /* IE 10+, Fx 29+ */
  transform-origin: center center;
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .bonus {
    top: 88%;
    width: 28%;
    left: 37%;
    /*  margin: 0 auto; */
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .bonus {
    top: 82.5%;
    width: 55%;
    left: 22.5%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .bonus {
    top: 83%;
    width: 36%;
    left: 21%;
  }
}
</style>