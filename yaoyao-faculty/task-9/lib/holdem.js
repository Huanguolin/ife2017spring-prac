
/**
 * poker: { v, t }
 * v: 1/2, 2/3, ... 9/10, 10/J, 11/Q, 12/K, 13/A
 * t: 1/(B♠), 2/(R♠), 3/♣, 4/♦
 */

import Util from './Util';

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
        let res;
        const getAtLeastLenVal = (map, len) => {
            let res = [];
            map.forEach( v => (v.length >= len) && res.push(v) );
            return res.sort( (a, b) => b.length - a.length);
        };
        let flushs = getAtLeastLenVal(tMap, 5);
        if (flushs.length > 0) {
            let straight = Util.getStraight(flushs[0]);
            if (straight) {
                res = {
                    level: 8,
                    pokers: straight
                };
            } else {
                let flush = flushs[0].sort( (a, b) => b.v - a.v).slice(0, 5);
                res = {
                    level: 5,
                    pokers: flush
                };
            }
        } else {
            let tmp = getAtLeastLenVal(vMap, 2);
            if (tmp.length && tmp[0].length === 4) {
                let fourOfAKind = tmp[0];
                pokers.sort( (a, b) => b.v - a.v);
                let ps = pokers.filter(v => v.v !== fourOfAKind[0].v);
                fourOfAKind.push(ps[0]);
                res = {
                    level: 7,
                    pokers: fourOfAKind
                };
            } else if (tmp.length >= 2 &&
                tmp[0].length === 3 && 
                tmp[1].length === 2) {
                let fullHouse = tmp[0].concat(tmp[1]);            
                res = {
                    level: 6,
                    pokers: fullHouse
                };
            } else if (Util.getStraight(pokers)) {
                res = {
                    level: 4,
                    pokers: Util.getStraight(pokers)
                };
            } else if (tmp.length && tmp[0].length === 3) {
                let threeOfAKind = tmp[0];
                pokers.sort( (a, b) => b.v - a.v);
                if (pokers[0] === threeOfAKind[0].v) {
                    threeOfAKind.concat(pokers[3], pokers[4]);
                } else {
                    threeOfAKind.push(pokers[0]);
                    if (pokers[1] === threeOfAKind[0].v) {
                        threeOfAKind.push(pokers[4]);
                    } else {
                        threeOfAKind.push(pokers[1]);
                    }
                }
                res = {
                    level: 3,
                    pokers: threeOfAKind
                };
            } else if (tmp.length >= 2 &&
                tmp[0].length === 2 && 
                tmp[1].length === 2) {
                let twoPair = tmp[0];
                twoPair.concat(tmp[1]);
                let ps = pokers.filter( v => v.v !== tmp[0][0] && v.v !== tmp[1][0]);
                ps.sort( (a, b) => b.v - a.v);
                twoPair.push(ps[0]);
                res = {
                    level: 2,
                    pokers: twoPair
                };
            } else if (tmp.length === 1 && tmp[0].length === 2) {
                let onePair = tmp[0];
                let ps = pokers.filter( v => v.v !== tmp[0][0]);
                ps.sort( (a, b) => b.v - a.v);
                onePair.concat(ps.slice(0, 3));
                res = {
                    level: 1,
                    pokers: onePair
                };
            } else {
                pokers.sort( (a, b) => b.v - a.v);
                let highCard = pokers.slice(0, 5);
                res = {
                    level: 0,
                    pokers: highCard
                };
            }
        }

        return res;
    }
}

export default Holdem;
