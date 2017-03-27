/**
 * poker: { v, t }
 * v: 0/2, 1/3, ... 8/10, 9/J, 10/Q, 11/K, 12/A
 * t: 0/(R♠), 1/(B♠), 2/♣, 3/♦
 */

import Util from './Util';

const ONE_HAND_POKERS_LEN = 5;

/**
 * Holdem is use to compute level or compare.
 */
class Holdem {

    static computeLevel (pokers) {
        const vMap = new Map(); // v -> value: A/2/3...J/Q/K
        const tMap = new Map(); // t -> type: (R♠)/(B♠)/♣/♦

        /* basic analysis part */
        const addToMap = (map, key, vi) => {
            let arr = [];
            if (map.has(key)) {                
                arr = map.get(key);
            } 
            arr.push(vi);
            map.set(key, arr);
        };
        pokers.forEach( val => {
            let v = val.v;
            let t = val.t;

            addToMap(vMap, v, val);
            addToMap(tMap, t, val);
        });

        /* compute level part */
        let ret;
        const getAtLeastLenVal = (map, len) => {
            let res = [];
            map.forEach( v => (v.length >= len) && res.push(v) );
            return res.sort( (a, b) => b.length - a.length); // decrease
        };
        let flushs = getAtLeastLenVal(tMap, 5);
        if (flushs.length > 0) {
            let straight = Util.getStraight(flushs[0]);
            if (straight) {
                ret = {
                    level: 8,
                    pokers: straight
                };
            } else {
                let flush = flushs[0].sort( (a, b) => b.v - a.v).slice(0, 5);
                ret = {
                    level: 5,
                    pokers: flush
                };
            }
        } else {
            let tmp = getAtLeastLenVal(vMap, 1); // tmp.length must >= 2
            let level;
            switch (tmp[0].length) {
            case 4: 
                level = 7; 
                break;

            case 3:
                level = tmp[1].length >= 2 ? 6 : 3;
                break;

            case 2:
                level = tmp[1].length === 2 ? 2 : 1;
                break;

            case 1:
                level = 0; 
                break;
            }
            if (level < 4) {
                let straight = Util.getStraight(pokers);
                if (straight) {
                    ret = {
                        level: 4,
                        pokers: straight
                    };
                }
            }

            if (!ret) {
                // decrease, first length, second value
                tmp.sort( (a, b) => { 
                    if (a.length === b.length) 
                        return b[0].v - a[0].v;
                    else 
                        return b.length - a.length;
                });

                let needCnt;
                let remain;
                let outPokers = [];
                const collect = a => {
                    let ret = [];
                    a.forEach( v => ret = ret.concat(v) );
                    return ret;
                };
                
                switch (level) {
                case 7: needCnt = 1; // 4 + 1
                case 3: needCnt || (needCnt = 2); // 3 + 1 + 1
                case 1: needCnt || (needCnt = 3); // 2 + 1 + 1 + 1
                    outPokers = outPokers.concat(tmp[0]);
                    remain = collect(tmp.slice(1));
                    break;

                case 6: needCnt = 0; // 3 + 2
                    outPokers = outPokers.concat(tmp[0]);
                    outPokers = outPokers.concat(tmp[1].slice(0, 2)); // use slice avoid 3 + 3     
                    break;

                case 2: needCnt = 1; // 2 + 2 + 1
                    outPokers = outPokers.concat(tmp[0]);
                    outPokers = outPokers.concat(tmp[1]);                    
                    remain = collect(tmp.slice(2));
                    if (pokers.length === 7) { // avoid 2 + 2 + 2 + 1 
                        remain.sort((a, b) => b.v - a.v); // decrease
                    }
                    break;

                case 0: needCnt = 5; // 1 + 1 + 1 + 1 + 1                  
                    remain = collect(tmp);
                    break;
                }
                if (needCnt) {
                    outPokers = outPokers.concat(remain.slice(0, needCnt));
                }
                
                //console.log(outPokers);
                ret = {
                    level,
                    pokers: outPokers
                };
            }            
        }

        return ret;
    }

    static compare (a, b) {
        let res = a.level - b.level;

        if (res === 0) {
            for (let i = 0; i < ONE_HAND_POKERS_LEN; i++) {
                res = a.pokers[i].v - b.pokers[i].v;
                if (res) break;
            }
        }

        return res;
    }
}

export default Holdem;
