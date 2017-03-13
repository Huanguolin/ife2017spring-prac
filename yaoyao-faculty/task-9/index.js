
'use strict';


function testHoldemLevel (pokers) {
    const values = new Map();
    const flush = {
        is: true,
        type: null,
    };

    for (let i = 0; i < 5; i++) {
        let type = Math.ceil(pokers[i] / 13);
        let value = pokers[i] % 13;

        if (flush.is) {
            if (flush.type === null) flush.type = type;
            else if (flush.type !== type) flush.is = false;
        }


    }
}
