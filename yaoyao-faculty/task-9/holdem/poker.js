

/**
 * defulat pokers count: 52, for Texas hold'em
 * defualt poker: { v, t }
 * v: 0/2, 1/3, ... 8/10, 9/J, 10/Q, 11/K, 12/A
 * t: 0/(R♠), 1/(B♠), 2/♣, 3/♦
 */

const POKERS_VALUES_COUNT = 13;
const DEFAULT_POKERS_TOTAL = 52; // 4 * 13
 
function Poker (customPokers = undefined) {
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

    // public method
    if (typeof this.getCards !== 'function') { // avoid repeat define

        Poker.prototype.getCard = () => {
            const needle = Math.floor(Math.random() * this.remainder);
            return pokers.splice(needle, 1)[0];
        };

        Poker.prototype.getCards = (count = 1) => {
            const ret = [];

            if (!Number.isInteger(count)) {
                count = 1;
            }
            
            if (count > this.remainder) {
                count = this.remainder;
            }

            for (let i = 0; i < count && this.remainder; i++) {
                ret.push(this.getCard());
            }

            return ret;
        };
    }
    
}

export default Poker;
export { Poker };
