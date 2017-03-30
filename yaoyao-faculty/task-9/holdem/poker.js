

/**
 * defulat pokers count: 52, for Texas hold'em
 * defualt poker: { v, t }
 * v: 0/2, 1/3, ... 8/10, 9/J, 10/Q, 11/K, 12/A
 * t: 0/(R♠), 1/(B♠), 2/♣, 3/♦
 */

const POKERS_VALUES_COUNT = 13;
const DEFAULT_POKERS_TOTAL = 52; // 4 * 13

const _innerData = new WeakMap();

class Poker {

    constructor (customPokers = null) {
        let pokers;
        let total;

        if (customPokers) {
            if (customPokers instanceof Array) {
                pokers = customPokers;
            } else {
                throw new Error('customPokers is not an instance of an array object.');
            }
        } else {
            pokers = [];
            for (let i = 0; i < DEFAULT_POKERS_TOTAL; i++) {
                let v = i % POKERS_VALUES_COUNT;
                let t = Math.floor(i / POKERS_VALUES_COUNT);
                pokers.push({ v, t });
            }
        }
        total = pokers.length;

        // public attr
        Object.defineProperties(this, {
            total: { get () { return total; } },
            remainder: { get () { return pokers.length; } },
        });

        // set private properties
        _innerData.set(this, pokers);
    }  

    getCard () {
        if (!this.remainder) return null;

        const pokers = _innerData.get(this);
        const maxIndex = this.remainder - 1;
        const needle = Math.floor(Math.random() * maxIndex);
        return pokers.splice(needle, 1)[0];
    } 

    getCards (count = 1) {        
        const ret = [];

        if (!Number.isInteger(count)) {
            count = 1;
        }

        let loopCnt = count;        
        if (loopCnt > this.remainder) {
            loopCnt = this.remainder;
        }

        for (let i = 0; i < loopCnt; i++) {
            ret.push(this.getCard());
        }

        return ret;
    }
    
}

export default Poker;
export { Poker };
