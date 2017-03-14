
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
        const values = new Map();
        const types = new Set(); 

        for (let i = 0; i < POKERS_ONE_HAND_COUNT; i++) {
            let value = pokers[i] % POKERS_VALUES_TOTAL;
            let type = Math.ceil(pokers[i] / POKERS_VALUES_TOTAL);

            values.set(value, values.has(value) ? values.get(value) + 1 : 1);
            types.add(type);
        }
    }

    static compare (pokers1, pokers2) {

    }
}
