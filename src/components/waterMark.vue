<template>

      <svg class="waterMark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">

            <text text-anchor="end" font-weight="bold" font-size="6.3" x="43" y="12" fill="#FFFFFF" :opacity="opacity">
                EPIC RETURN</text>
            <text text-anchor="end" font-weight="bold" font-size="6.3" x="43" y="30" fill="#FFFFFF" :opacity="opacity">
                MEGA WIN</text>
            <text text-anchor="end" font-weight="bold" font-size="6.3" x="43" y="48" fill="#FFFFFF" :opacity="opacity">
                HUGE WIN</text>

                <text text-anchor="start" font-weight="bold" font-size="14" x="48" y="12" fill="#FFFFFF" :opacity="opacity">
                96.38%</text>

                <text text-anchor="start" font-weight="bold" font-size="14" x="48" y="30" fill="#FFFFFF" :opacity="opacity">
                +5</text>

                 <text text-anchor="start" font-weight="bold" font-size="4.5" x="67" y="30" fill="#FFFFFF" :opacity="opacity">
                EXTRA CARDS</text>

                <text text-anchor="start" font-weight="bold" font-size="14" x="48" y="48" fill="#FFFFFF" :opacity="opacity">
                x3</text>

                 <text text-anchor="start" font-weight="bold" font-size="4.5" x="74" y="48" fill="#FFFFFF" :opacity="opacity">
                MULTIPLIER</text>
            

        </svg>





  
</template>


<script>
export default {
  name: "waterMark",
  data(){
      return {
          opacity: 0.15
      }
  }
};
</script>

<style>
.waterMark {
  position: absolute;
 /*  border-width: 2px;
  border-collapse: black;
  border-style: solid; */
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .waterMark {
    top: 58%;
    width: 35%;
    left: 30%;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .waterMark {
    top: 55%;
    width: 50%;

    left: 25%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .waterMark {
    top: 52%;
    width: 56%;
    left: 18%;
  }
}
</style>