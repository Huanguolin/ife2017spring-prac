

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
        const getAtLeastLenVal = (map, len) => {
            let res = [];
            map.forEach( v => (v.length >= len) && res.push(v) );
            return res;
        };
        let tmp = getAtLeastLenVal(tMap, 5);
        if (tmp.length > 0) {
            
        } else {

        }
    }
}

