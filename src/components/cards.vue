<template>
    <div class="mainCards">
        <!--   {{cards}} -->
      <!--   <transition name="cardAnimation" v-for="(cardPos,index) in cardPositions"> -->
         <!--    <transition name="cardAnimation" v-for="(cardPos,index) in cardPositions"> -->
             <!--   -->
            <div :style="{display: showCard[index] ? 'block':'none' }"
            v-for="(cardPos,index) in cardPositions" 
            :class="[defaultClasses, cardPos, flip[index] ? 'flip' : '', checkFlyIn(showCard[index]) ]" 
            v-flip="cards[index]">
            </div>
           
    <!--     </transition> -->
    </div>
</template>

<script>
export default {
  name: "mainCards",
  props: ["flip", "cards", "showCard", "cardPositions", "skipFly"],
  data() {
    return {
      defaultClasses: "cSize flip-container",
      flyInTime: 500
    };
  },
  methods: {
    checkFlyIn(show) {
      //  console.log(this.skipFly, show);
      if (this.skipFly) {
        //console.log("no fly at all! - skipped!");
        return "";
      }
      if (show) {
       // console.log("fly in animation");
        return "cardAnimation-enter-active";
      }
      if (this.skipFly && !show) {
        console.log("display none.");
        return "cardDisppears";
      } 
    }
    /*     checkFlyOut(c) {
      console.log(c);
      if (!c) {
        return "cardDisppears";
        return "cardAnimation-leave-active";
      } else {
        
      }
    } */
  }
};
</script>

<style>
.cardDisppears {
  display: none;
}
.cardAnimationAppear {
  transform: scale(1);
  transform-origin: 0% 0%;
  opacity: 1;

  /* animation: cardAnimation-in 0s; */
}

.cardAnimation-enter-active {
  animation: cardAnimation-in 0.5s;
}

.cardAnimation-leave-active {
  animation: cardAnimation-out 0.2s;
}

.cSize {
  width: 18%;
  padding-bottom: 23%;
  background-size: 100% 100%;
}

.flip-container {
  perspective: 1000px;
}

.flip-container.flip .flipper {
  transform: rotateY(180deg);
}

.front,
.back {
  width: 100%;
  height: 100%;
}

.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.a {
  isolation: isolate;
}

.b,
.g {
  fill: #fff;
}

.b {
  stroke: #000;
}

.c {
  stroke-miterlimit: 10;
  fill: url(#a);
  stroke: url(#b);
}

.d {
  fill: #994105;
}

.e {
  fill: #ffe85f;
}

.f {
  fill: #f99635;
  mix-blend-mode: multiply;
}

.h {
  fill: #493f02;
}

.i {
  fill: #ffe471;
}

.j {
  fill: #161201;
}

.k {
  fill: #ffe67b;
}

.l {
  fill: #141001;
}

/* hide back of pane during swap */

.front,
.back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 128%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* front pane, placed above back */

.front {
  z-index: 2;
  /* for firefox 31 */
  transform: rotateY(0deg);
}

/* back, initially hidden pane */

.back {
  transform: rotateY(180deg);
}

@keyframes cardAnimation-in {
  0% {
    transform: scale(1.4);
    transform-origin: 0% 500%;
    opacity: 0.2;
  }

  100% {
    transform: scale(1);
    transform-origin: 0% 0%;
    opacity: 1;
  }
}

@keyframes cardAnimation-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
    transform-origin: 0% -500%;
    opacity: 0.5;
  }
}

.mainCards,
.singleResult {
  margin: 0 auto;
  position: relative;
}

.cardArea {
  position: relative;
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/

  .lSlide1 {
    animation: moveLeft1 0.8s forwards;
  }
  .lSlide2 {
    animation: moveLeft2 0.8s forwards;
  }
  .lSlide3 {
    animation: moveLeft3 0.8s forwards;
  }

  @keyframes moveLeft1 {
    0% {
      left: 0%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -11%;
    }
  }

  @keyframes moveLeft2 {
    0% {
      left: -11%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -22%;
    }
  }

  @keyframes moveLeft3 {
    0% {
      left: -22%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -33%;
    }
  }

  .rSlide1 {
    animation: moveRight1 0.8s forwards;
  }
  .rSlide2 {
    animation: moveRight2 0.8s forwards;
  }
  .rSlide3 {
    animation: moveRight3 0.8s forwards;
  }

  .setRSlide {
    left: -32.75%;
  }

  @keyframes moveRight1 {
    0% {
     left: -32.75%;
      animation-timing-function: ease-in;
    }
    100% {
     left: -21.50%;
    }
  }

  @keyframes moveRight2 {
    0% {
      left: -21.50%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -10.25%;
    }
  }

  @keyframes moveRight3 {
    0% {
      left: -10.25%;
      animation-timing-function: ease-in;
    }
    100% {
      left: 0%;
    }
  }

  .mainCards {
    width: 56%;
    /*     top: 25%; */
  }
  .singleResult,
  .cardArea {
    margin: 0 auto;
  }

  .singleResult {
    top: 35%;
  }
  .cardArea {
    top: 25%;
  }

  .bCard1 {
    top: 38%;
  }
  .bCard2 {
    top: 47%;
  }
  .bCard3 {
    top: 56%;
  }
  .bCard4 {
    top: 65%;
  }
  .bCard5 {
    top: 74%;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/

  .setRSlide {
    left: -58.5% !important;
  }

  .rSlide1 {
    animation: moveRight1 0.8s forwards;
  }
  .rSlide2 {
    animation: moveRight2 0.8s forwards;
  }
  .rSlide3 {
    animation: moveRight3 0.8s forwards;
  }

  
  @keyframes moveRight1 {
    0% {
     left: -58.5%;
      animation-timing-function: ease-in;
    }
    100% {
     left: -40%;
    }
  }

  @keyframes moveRight2 {
    0% {
      left: -40%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -20%
    }
  }

  @keyframes moveRight3 {
    0% {
      left: -20%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -0%;
    }
  }

  .lSlide1 {
    animation: moveLeft1 0.8s forwards;
  }
  .lSlide2 {
    animation: moveLeft2 0.8s forwards;
  }
  .lSlide3 {
    animation: moveLeft3 0.8s forwards;
  }

  @keyframes moveLeft1 {
    0% {
      left: 0%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -19.5%;
    }
  }

  @keyframes moveLeft2 {
    0% {
      left: -19.5%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -39%;
    }
  }

  @keyframes moveLeft3 {
    0% {
      left: -39%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -58.5%;
    }
  }

  .mainCards {
    width: 100%;
    /*     top: 23.2%; */
  }
  .cardArea {
    top: 35%;
    margin: 0 auto;
  }
  .singleResult {
    top: 50%;
    margin: 0 auto;
  }
  .bCard1 {
    top: 45%;
  }
  .bCard2 {
    top: 51%;
  }
  .bCard3 {
    top: 57%;
  }
  .bCard4 {
    top: 63%;
  }
  .bCard5 {
    top: 69%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/

  .setRSlide {
    left: -56.75% !important;
  }

  .rSlide1 {
    animation: moveRight1 0.8s forwards;
  }
  .rSlide2 {
    animation: moveRight2 0.8s forwards;
  }
  .rSlide3 {
    animation: moveRight3 0.8s forwards;
  }

  
  @keyframes moveRight1 {
    0% {
     left: -56.75%;
      animation-timing-function: ease-in;
    }
    100% {
     left: -41.25%;
    }
  }

  @keyframes moveRight2 {
    0% {
      left: -41.25%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -25%
    }
  }

  @keyframes moveRight3 {
    0% {
      left: -25%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -9.5%;
    }
  }

  .lSlide1 {
    animation: moveLeft1 0.8s forwards;
  }
  .lSlide2 {
    animation: moveLeft2 0.8s forwards;
  }
  .lSlide3 {
    animation: moveLeft3 0.8s forwards;
  }

  @keyframes moveLeft1 {
    0% {
      left: -10%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -25.5%;
    }
  }

  @keyframes moveLeft2 {
    0% {
      left: -25.5%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -41%;
    }
  }

  @keyframes moveLeft3 {
    0% {
      left: -41%;
      animation-timing-function: ease-in;
    }
    100% {
      left: -56.5%;
    }
  }

  .mainCards {
    width: 80%;
    /*   top: 30%; */
  }

  .cardArea {
    top: 20%;
    left: -10%;
  }

  .singleResult {
    top: 38%;
    left: -10%;
  }

  .bCard1 {
    top: 34%;
  }
  .bCard2 {
    top: 43%;
  }
  .bCard3 {
    top: 52%;
  }
  .bCard4 {
    top: 61%;
  }
  .bCard5 {
    top: 70%;
  }
}

.label1,
.label2,
.label3,
.label4,
.label5,
.c8lPos,
.c7LPos,
.c6LPos,
.c8RPos,
.c7RPos,
.c6RPos,
.c5Pos,
.c4Pos,
.c3Pos,
.c2Pos,
.c1Pos {
  position: absolute;
}

.c8lPos {
  left: -56.5%;
}
.c7LPos {
  left: -37%;
}
.c6LPos {
  left: -17.5%;
}

.c8RPos {
  right: -56.5%;
}
.c7RPos {
  right: -37%;
}
.c6RPos {
  right: -17.5%;
}

.c5Pos {
  right: 2%;
}

.c4Pos {
  right: 21.5%;
}

.c3Pos {
  right: 50%;
  margin-right: -9%;
}

.c2Pos,
.label2 {
  left: 21.5%;
}

.c1Pos,
.label1 {
  left: 2%;
}

.label3 {
  right: 2%;
}

.label4 {
  right: 36.5%;
}

.label5 {
  right: 17%;
}

.C10 {
  background-image: url("../assets/cards/10C.svg");
}

.D10 {
  background-image: url("../assets/cards/10D.svg");
}

.H10 {
  background-image: url("../assets/cards/10H.svg");
}

.S10 {
  background-image: url("../assets/cards/10S.svg");
}

.C2 {
  background-image: url("../assets/cards/2C.svg");
}

.D2 {
  background-image: url("../assets/cards/2D.svg");
}

.H2 {
  background-image: url("../assets/cards/2H.svg");
}

.S2 {
  background-image: url("../assets/cards/2S.svg");
}

.C3 {
  background-image: url("../assets/cards/3C.svg");
}

.D3 {
  background-image: url("../assets/cards/3D.svg");
}

.H3 {
  background-image: url("../assets/cards/3H.svg");
}

.S3 {
  background-image: url("../assets/cards/3S.svg");
}

.C4 {
  background-image: url("../assets/cards/4C.svg");
}

.D4 {
  background-image: url("../assets/cards/4D.svg");
}

.H4 {
  background-image: url("../assets/cards/4H.svg");
}

.S4 {
  background-image: url("../assets/cards/4S.svg");
}

.C5 {
  background-image: url("../assets/cards/5C.svg");
}

.D5 {
  background-image: url("../assets/cards/5D.svg");
}

.H5 {
  background-image: url("../assets/cards/5H.svg");
}

.S5 {
  background-image: url("../assets/cards/5S.svg");
}

.S6 {
  background-image: url("../assets/cards/6S.svg");
}

.H6 {
  background-image: url("../assets/cards/6H.svg");
}

.D6 {
  background-image: url("../assets/cards/6D.svg");
}

.C6 {
  background-image: url("../assets/cards/6C.svg");
}

.S7 {
  background-image: url("../assets/cards/7S.svg");
}

.H7 {
  background-image: url("../assets/cards/7H.svg");
}

.D7 {
  background-image: url("../assets/cards/7D.svg");
}

.C7 {
  background-image: url("../assets/cards/7C.svg");
}

.C8 {
  background-image: url("../assets/cards/8C.svg");
}

.H8 {
  background-image: url("../assets/cards/8H.svg");
}

.D8 {
  background-image: url("../assets/cards/8D.svg");
}

.S8 {
  background-image: url("../assets/cards/8S.svg");
}

.S9 {
  background-image: url("../assets/cards/9S.svg");
}

.H9 {
  background-image: url("../assets/cards/9H.svg");
}

.D9 {
  background-image: url("../assets/cards/9D.svg");
}

.C9 {
  background-image: url("../assets/cards/9C.svg");
}

.C11 {
  background-image: url("../assets/cards/JC.svg");
}

.D11 {
  background-image: url("../assets/cards/JD.svg");
}

.H11 {
  background-image: url("../assets/cards/JH.svg");
}

.S11 {
  background-image: url("../assets/cards/JS.svg");
}

.S13 {
  background-image: url("../assets/cards/KS.svg");
}

.H13 {
  background-image: url("../assets/cards/KH.svg");
}

.D13 {
  background-image: url("../assets/cards/KD.svg");
}

.C13 {
  background-image: url("../assets/cards/KC.svg");
}

.C12 {
  background-image: url("../assets/cards/QC.svg");
}

.H12 {
  background-image: url("../assets/cards/QH.svg");
}

.D12 {
  background-image: url("../assets/cards/QD.svg");
}

.S12 {
  background-image: url("../assets/cards/QS.svg");
}

.C14 {
  background-image: url("../assets/cards/AC.svg");
}

.H14 {
  background-image: url("../assets/cards/AH.svg");
}

.D14 {
  background-image: url("../assets/cards/AD.svg");
}

.S14 {
  background-image: url("../assets/cards/AS.svg");
}

.cBack1 {
  background-image: url("../assets/cards/cardBack2.svg");
}
</style>