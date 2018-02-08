

class autoSlider {

    analyze(cardValues) {

        var result = '';

        if ((cardValues[1] === cardValues[2] && cardValues[2] === cardValues[4]) //3OK --- keep 3OK on slide    // _ x x _ x
        ) {
            result = 'left';
        } else if (result === '' && (cardValues[0] === cardValues[2] && cardValues[3] === cardValues[2]) //3OK --- keep 3OK on slide
        ) {
            result = 'right';
        }


        if (result === '' && (cardValues[1] === cardValues[2] &&   // _ x x x  _ 
            cardValues[3] === cardValues[2])) {
            if (cardValues[4] === 14 || cardValues[4] === 2 || cardValues[4] === 3 || cardValues[4] === 4   // _ x x x kicker 
            ) {
                result = 'left';
            } else if (cardValues[0] === 14 || cardValues[0] === 2 || cardValues[0] === 3 || cardValues[0] === 4   // kicker x x x _  
            ) {
                result = 'right';
            } 
        }

        if (result === '' && cardValues[0] === cardValues[1] &&   // x x _ y y 
            cardValues[3] === cardValues[4]) {

            if (cardValues[4] >= 11 && cardValues[0] !== cardValues[1]) {    //  y y _ highCard highCard  AND not a 3OK
                result = 'left'
            }
            if (cardValues[0] >= 11 && cardValues[4] !== cardValues[3]) {    // highCard highCard _ y y  AND not a 3OK
                result = 'right'
            }
            if (cardValues[4] === 14) {   // x x _ ace ace 
                result = 'left'
            }
            if (cardValues[0] === 14) {  // ace ace _ y y 
                result = 'right'
            }

        }

        if (result === '' && (cardValues[0] === cardValues[1] &&    //   x x y y _
            cardValues[2] === cardValues[3])
        ) {
         
            if (cardValues[2] === 14 || cardValues[4] === cardValues[3]) {   //   x x ace ace _  OR full house
                result = 'left';
            } else {
                result = 'right';
            }
        }

        if (result === '' && cardValues[1] === cardValues[2] &&    //  _ x x y y
            cardValues[3] === cardValues[4]) {
            if (cardValues[1] === 14 || cardValues[0] === cardValues[1]) {     //  _ ace ace y y  _  OR full house
                result = 'right';
            } else {
                result = 'left';
            }

        }
       

        if (result === '') {
            result = 'any direction';
        }

        return result;

    }
}

export { autoSlider as default }