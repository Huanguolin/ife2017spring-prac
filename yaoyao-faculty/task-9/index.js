
'use strict';


const POKERS_TOTAL_COUNT = 52;
const POKERS_VALUES_COUNT = 13;
const POKERS_ONE_HAND_COUNT = 5;
const POKERS_ONE_HAND_LEVEL = [
    'High card', // 0
    'One pair',
    'Two pair',
    'Three of a kind', //3
    'Straight',
    'Flush',
    'Full house',
    'Four of a kind',
    'Straight Flush', // 8
];

class Holdem {
    static computeLevel (pokers) {
        let level;

        /* compute values and types */
        const values = new Map();
        const types = new Set(); 
        for (let i = 0; i < POKERS_ONE_HAND_COUNT; i++) {
            let value = pokers[i] % POKERS_VALUES_COUNT;
            let type = Math.floor(pokers[i] / POKERS_VALUES_COUNT);

            values.set(value, values.has(value) ? values.get(value) + 1 : 1);
            types.add(type);
        }

        /* compute level */
        const sameValueCnt = [];
        const valueSet = [];
        values.forEach( (v, k) => {
            sameValueCnt.push(v);
            valueSet.push(k);
        });
        if (types.size === 1) {
            level = _isStraight(valueSet) ? 8 : 5; // valueSet sorted
        } else {
            let len = valueSet.length;
            switch (len) {
                case 5: 
                    level = _isStraight(valueSet) ? 4 : 0; // valueSet sorted
                    break;
                
                case 4: 
                    level = 1;
                    break;

                case 3: 
                    level = sameValueCnt[0];
                    if (level === 1) {
                        level = (sameValueCnt[1]=== 1) ? 3 : sameValueCnt[1];
                    }
                    break;
                
                case 2:
                    switch (sameValueCnt[0]) {
                        case 4:
                        case 1:
                            level = 7;
                            break;
                        
                        case 3: 
                        case 2: 
                            level = 6;
                            break;
                    }
                    break;
            }
        }

        return {
            level,
            valueSet,
            valueMap: values
        };
    }

    static compare (pokers1, pokers2) {
        let res;
        const p1 = Holdem.computeLevel(pokers1);
        const p2 = Holdem.computeLevel(pokers2);

        res = p1.level - p2.level;
        if (res === 0) {
            switch (p1.level) {
                /* TODO */
            }
        } 

        return res;
    }
}


/**
 * Judge pokers is 'straight' or not, and sort values.
 * 
 * @param {Array} valueSet one hand pokers values collection. 
 */
function _isStraight (valueSet) {
    let res;

    // sort 
    valueSet.sort( (a, b) => b - a);

    /* compute straight or not */
    let first = valueSet[0];
    let last = valueSet[4];
    if (first === 12 && last === 0) {
        res = valueSet[3] === 9; 
    } else {
        res = (first - 4) === last;
    }

    return res;
}

