<template>
    <div class="payTable">

        <div :class="showTable" class="payTblW oneColumn" id='myGraph'></div>

        <div :class="showTable" class="payTblW threeColumn" id='myPayTbl'></div>

    </div>
</template>


<script>
import table from "./paytableOneColumn";
import tbl from "./paytableThreeColumn";
import tableValues from "../gameLogic/payTable";

var d3 = Object.assign({}, require("d3-selection"));

export default {
  name: "payTable",
  data() {
    return {
      showTable: ""
    };
  },
  watch: {
    coinValue: function(val) {
      table(tableValues, val);
      tbl(tableValues,val);
    }
  },
  props: ["coinValue"],
  mounted() {
    setTimeout(() => {
      table(tableValues, this.coinValue);
      tbl(tableValues, this.coinValue);
      setTimeout(() => {
        this.showTable = "tblAnimation-enter-active loaded";
      }, 0);
    }, 0);
    
  }
};
</script>

<style>
@supports (-ms-ime-align: auto) {
  .payTableText,
  .againText,
  .tapText {
    stroke-width: 0.4px !important;
  }
}

.tblAnimation-enter-active {
  animation: tblAnimation-in 0.5s;
}

.payTblW {
  opacity: 0;
  -moz-transition: opacity 1.5s;
  -webkit-transition: opacity 1.5s;
  -o-transition: opacity 1.5s;
  transition: opacity 1.5s;
}

.loaded {
  opacity: 1 !important;
}

@keyframes tblAnimation-in {
  0% {
    transform: scale(0.4);
    height: 0;
  }
  100% {
    transform: scale(1);
    height: 100%;
  }
}

.payTable {
  position: relative;
}

.payTableText {
  paint-order: stroke;
  stroke: #000000;
  fill: #ffffff;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  font-weight: 800;
  font-family: Arial, Helvetica;
}

.labelCash {
  fill: #02f53a !important;
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .payTblW {
    position: absolute;
    width: 100%;
  }
  .payTable {
    width: 21.5%;
    top: 25%;
    left: 0.5%;
  }
  .threeColumn {
    display: none;
  }
  .oneColumn {
    display: block;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .payTblW {
    position: absolute;
    left: 1%;
    width: 98%;
  }
  .payTable {
    width: 100%;
    top: 19%;
  }
  .threeColumn {
    display: block;
  }
  .oneColumn {
    display: none;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .payTblW {
    position: absolute;
    width: 100%;
  }

  .payTable {
    width: 18%;
    top: 19%;
    left: 83.5%;
  }
  .threeColumn {
    display: none;
  }
  .oneColumn {
    display: block;
  }
}
</style>