<template>
    <svg class="lblBase lblSizeSmall rFillEffect" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.4 290">
    <!--     <rect style="stroke: #fff; stroke-width: 6;; opacity: 1" x="10" y="10" width="800.4" height="170" rx="85" ry="85" />
        <text style=" opacity: 1" text-anchor="middle" font-weight="bold" font-size="40" x="90" y="105" fill="#fff" >
            DRAW
        </text> -->

 <rect class="sideBtn" style="stroke: #fff; stroke-width: 6;; opacity: 0.8" x="10" y="10" width="800.4" height="170" rx="85" ry="85" />
        <text class="sideBtn" style=" opacity: 0.8" text-anchor="middle" font-weight="bold" font-size="40" x="90" y="105" fill="#fff">
            DRAW
        </text>

     

        <rect class="bottomBtn" style="stroke: #fff; stroke-width: 6;; opacity: 0.8" x="10" y="10" width="160.4" height="370" rx="85" ry="85" />
        <text class="bottomBtn" style=" opacity: 0.8" text-anchor="middle" font-weight="bold" font-size="40" x="90" y="115" fill="#fff">
            DRAW
        </text>


    </svg>
</template>

<script>
export default {
    name: 'rightCtrl'
}
</script>

<style>

@media all and (min-aspect-ratio: 970 / 600) {
    /*LANDSCAPE MODE*/
    .btnHeight {
        bottom: -24%;
    }

    .sideBtn {
        display: block;
    }
    .bottomBtn {
        display: none;
    }

    .btnBase {
        right: 0%;
        width: 21%;
    }
}

@media all and (max-aspect-ratio: 520 / 600) {
    /*PORTRAIT MODE*/
    .btnHeight {
        bottom: -75%;
    }
    .sideBtn {
        display: none;
    }
    .bottomBtn {
        display: block;
    }
        .btnBase {
        right: 30%;
        width: 40%;
    }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
    /*SQUARE (DESKTOP) MODE*/
    .btnHeight {
        bottom: -65%;
    }
    .sideBtn {
        display: block;
    }
    .bottomBtn {
        display: none;
    }
        .btnBase {
        right: 0%;
        width: 20%;
    }
}
</style>