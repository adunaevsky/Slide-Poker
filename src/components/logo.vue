<template>
    <div class="logo">
        <img class="logoImg" src="../assets/logo.svg">
    </div>
</template>


<script>
export default {
    name: 'logo'
}

</script>

<style>
.logo {
    position: relative;
}

.logoImg {
    width: 100%;
    position: absolute;
}

.buttonsMenu {
    position: relative;
    top: 1%;
}

@media all and (min-aspect-ratio: 970 / 600) {
    /*LANDSCAPE MODE*/
    .logo {
        top: 0%;
        width: 56%;
        left: 18%;
        /*  margin: 0 auto; */
    }
}

@media all and (max-aspect-ratio: 520 / 600) {
    /*PORTRAIT MODE*/
    .logo {
        top: 7%;
        width: 65%;
        left: 0%;
    }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
    /*SQUARE (DESKTOP) MODE*/
    .logo {
        top: 0%;
        width: 56%;
        left: 18%;
    }
}
</style>