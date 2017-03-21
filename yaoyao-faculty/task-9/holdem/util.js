
/**
 * poker: { v, t }
 * v: 0/2, 1/3, ... 8/10, 9/J, 10/Q, 11/K, 12/A
 * t: 0/(B♠), 1/(R♠), 2/♣, 3/♦
 */

class Util {
    static getStraight (pokers) {
        if (!pokers) throw new Error('pokers cannot be undefined or null!');
        if (pokers.length < 5 || pokers.length > 7) throw new Error('pokers.length should be in range 5-7!');

        let ret = null;  

        // sort it by decrease 
        pokers.sort( (a, b) => b.v - a.v); // dec
        
        const len = pokers.length; // len => 5 ~ 7
        const distance = 4; // 5 - 1 = 4
        const loopLen = len - distance;// loopLen => 1 ~ 3
        for (let i = 0; i < loopLen; i++) { 
            const tmp = pokers[i].v - pokers[i + distance].v;
            if (tmp === distance) {
                ret = pokers.slice(i, i + distance + 1);
                break; 
            }
        }

        if (!ret && 
            pokers[0].v === 12 && 
            pokers[len - 1].v === 0 && 
            pokers[len - distance].v === 3 ) {
            ret = pokers.slice(-distance);
            ret.push(pokers[0]);
        } 

        //console.log(JSON.stringify(ret));
        return ret;
    }
}

export default Util;
