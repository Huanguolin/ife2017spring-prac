

class Util {
    static getStraight (pokers) {
        if (pokers.length < 5 || 
            pokers.length > 7) {
            throw new Error('pokers.length should be in range 5-7!');
        }

        let ret = null;
        let len = pokers.length;
        pokers.sort( (a, b) => a.v - b.v); // inc
        
        if (pokers[len - 1].v === 12 && 
            pokers[0].v === 0 && 
            pokers[len - 4].v === 9) {
            ret = pokers.slice(len - 4);
            ret.push(pokers[0]);
        } else {                
            for (let i = len - 1; i >= 4; i--) {
                let tmp = pokers[i].v - pokers[i - 4].v;
                if (tmp === 4) {
                    ret = pokers.slice(i - 4, i + 1);
                    break;
                }
            }
        }

        //console.log(JSON.stringify(ret));
        return ret;
    }
}

export default Util;
