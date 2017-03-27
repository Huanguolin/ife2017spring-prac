
/**
 * poker: { v, t }
 * v: 0/2, 1/3, ... 8/10, 9/J, 10/Q, 11/K, 12/A
 * t: 0/(R♠), 1/(B♠), 2/♣, 3/♦
 */

class Util {
    static getStraight (pokers) {
        if (!pokers) throw new Error('pokers cannot be undefined or null!');
        if (pokers.length < 5 || pokers.length > 7) throw new Error('pokers.length should be in range 5-7!');

        let ret = null;

        pokers.sort( (a, b) => b.v - a.v);
         // remove the repetition item    
        const dryPokers = pokers.filter( (v, i, array) => {
            if (i && v.v === array[i - 1].v) {
                return false;
            } else {
                return true;
            }
        });
        const len = dryPokers.length; 

        if (len >= 5) { // len need => 5 ~ 7   
            const distance = 4; // 5 - 1 = 4
            const loopLen = len - distance;// loopLen => 1 ~ 3
            for (let i = 0; i < loopLen; i++) { 
                const tmp = dryPokers[i].v - dryPokers[i + distance].v;
                if (tmp === distance) {
                    ret = dryPokers.slice(i, i + distance + 1);
                    break; 
                }
            }

            if (!ret && 
                dryPokers[0].v === 12 && 
                dryPokers[len - 1].v === 0 && 
                dryPokers[len - distance].v === 3 ) {
                ret = dryPokers.slice(-distance);
                ret.push(dryPokers[0]);
            } 
        }        

        //console.log(JSON.stringify(ret));
        return ret;
    }
}

export default Util;
