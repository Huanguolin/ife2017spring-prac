

class Util {
    static getStraight (pokers) {
        let len = pokers.length;
        if (len < 5) throw new Error('pokers.length should be equal or greater than 5!');

        let ret = null;
        pokers.sort( (a, b) => a.v - b.v);
        if (pokers[len - 1].v === 12 && 
            pokers[0].v === 0 && 
            pokers[len - 4].v === 9) {
            ret = pokers.slice(len - 4).push(pokers[0]);
        } else {                
            for (let i = len; i >= 5; i--) {
                let tmp = pokers[i - 1].v - pokers[i - 5].v;
                if (tmp === 4) {
                    ret = pokers.slice(i - 5, i - 1);
                    break;
                }
            }
        }
        return ret;
    }
}

export default Util;
