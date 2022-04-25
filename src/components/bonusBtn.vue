<template>
    <svg class="lblBase lblSizeSmall rFillDeal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.4 290">
        <rect class="sideBtn" style="stroke: #fff; stroke-width: 6; opacity: 1" x="10" y="10" width="800.4" height="170" rx="85" ry="85" />
        <text class="sideBtn" style=" opacity: 0.8; fill:red;" text-anchor="middle" font-weight="bold" font-size="40" x="90" y="85">
            PLAY
        </text>
        <text class="sideBtn" style=" opacity: 0.8; fill:red;" text-anchor="middle" font-weight="bold" font-size="40" x="90" y="120" >
            BONUS
        </text>

        <rect class="bottomBtn" style="stroke: #fff; stroke-width: 6; opacity: 1" x="10" y="10" width="160.4" height="370" rx="85" ry="85" />
        <text class="bottomBtn" style=" opacity: 0.8;  fill:red;" text-anchor="middle" font-weight="bold" font-size="40" x="90" y="80">
            PLAY
        </text>
        <text class="bottomBtn" style=" opacity: 0.8;  fill:red;" text-anchor="middle" font-weight="bold" font-size="40" x="90" y="115">
            BONUS
        </text>

    </svg>
</template>

<script>
export default {
    name: 'bonusBtn'
}
</script>

<style>
.rFillEffect {
    fill: rgb(1, 11, 68)
}

.rFillEffect:hover {
    fill: rgb(2, 37, 239)
}

.rFillEffect:active {
    fill: rgb(0, 2, 17)
}

.rFillDeal {
    fill: rgb(228,235,25)
}

.rFillDeal:hover {
    fill: rgb(228,235,25)
}

.rFillDeal:active {
    fill: rgb(228,235,25)
}


.lblBase {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
}

.svgLblBase {
    stroke: #e0e0e0;
    stroke-miterlimit: 10;
}

.btnBase {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    cursor: pointer;
}


.btnHeight {
    position: relative;
}

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
        bottom: -66%;
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
        bottom: -64%;
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