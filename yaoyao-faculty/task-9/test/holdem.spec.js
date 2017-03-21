import chai from 'chai';
import Holdem from '../holdem/holdem';

let expect = chai.expect;
const computeLevel = Holdem.computeLevel;

describe.only('holdem/holdem#computeLevel', () => {
    // tools
    const createPokers = function (valList, typeList, messIt = true) {
        let ret = valList.map( (v, i) => { 
            return { v, t: typeList[i] }; 
        });
        if (messIt) {
            const tmp = ret;
            ret = [];
            do {
                let i = Math.random() * (tmp.length - 1);
                i = Math.floor(i);
                ret.push(tmp[i]);
                tmp.splice(i, 1);
            } while (tmp.length);
        }
        return ret;
    };
    const pokersDeepEql = function (a, b) {
        let res = true;

        if (a.length === b.length) {
            const len = a.length;            
            for (let i = 0; i < len; i++) {
                if (res) {
                    let vEql = a[i].v === b[i].v;
                    let tEql = a[i].t === b[i].t;
                    if (!tEql && 
                        (a[i].t === '*' ||
                         b[i].t === '*')) { // '*' is equal to any value 
                        tEql = true;
                    }
                    res = vEql && tEql; 
                } else {
                    break;
                }
            }
        } else {
            res = false;
        }

        return res;
    };

    const test_level_8 = [
        /* Straight Flush */
        // input len is 5
        { args: [[2, 3, 4, 5, 6], [0, 0, 0, 0, 0]],     expected: [8, [2, 3, 4, 5, 6], [0, 0, 0, 0, 0]] },
        { args: [[0, 1, 2, 3, 4], [2, 2, 2, 2, 2]],     expected: [8, [0, 1, 2, 3, 4], [2, 2, 2, 2, 2]] },
        { args: [[8, 9, 10, 11, 12], [1, 1, 1, 1, 1]],  expected: [8, [8, 9, 10, 11, 12], [1, 1, 1, 1, 1]] },
        { args: [[0, 1, 2, 3, 12], [3, 3, 3, 3, 3]],    expected: [8, [12, 0, 1, 2, 3], [3, 3, 3, 3, 3]] },
        // input len is 6
        { args: [[2, 3, 4, 5, 6, 7], [0, 0, 0, 0, 0, 0]],     expected: [8, [3, 4, 5, 6, 7], [0, 0, 0, 0, 0]] },
        { args: [[0, 1, 2, 3, 4, 9], [2, 2, 2, 2, 2, 2]],     expected: [8, [0, 1, 2, 3, 4], [2, 2, 2, 2, 2]] },
        { args: [[7, 8, 9, 10, 11, 12], [1, 1, 1, 1, 1, 1]],  expected: [8, [8, 9, 10, 11, 12], [1, 1, 1, 1, 1]] },
        { args: [[0, 1, 2, 3, 11, 12], [3, 3, 3, 3, 3, 3]],   expected: [8, [12, 0, 1, 2, 3], [3, 3, 3, 3, 3]] },        
        // input len is 7
        { args: [[2, 3, 4, 5, 6, 7, 8], [0, 0, 0, 0, 0, 0, 0]],     expected: [8, [4, 5, 6, 7, 8], [0, 0, 0, 0, 0]] },
        { args: [[0, 1, 2, 3, 4, 8, 9], [2, 2, 2, 2, 2, 2, 2]],     expected: [8, [0, 1, 2, 3, 4], [2, 2, 2, 2, 2]] },
        { args: [[6, 7, 8, 9, 10, 11, 12], [1, 1, 1, 1, 1, 1, 1]],  expected: [8, [8, 9, 10, 11, 12], [1, 1, 1, 1, 1]] },
        { args: [[0, 1, 2, 3, 10, 11, 12], [3, 3, 3, 3, 3, 3, 3]],  expected: [8, [12, 0, 1, 2, 3], [3, 3, 3, 3, 3]] },  
    ];
    test_level_8.forEach(function(test) {
        let desc = `test level 8, input ${JSON.stringify(test.args)}, expected ${JSON.stringify(test.expected)}`; 
        it(desc, () => {
            let input = createPokers(test.args[0], test.args[1]);
            let output = createPokers(test.expected[1], test.expected[2], false);
            let res = computeLevel(input);
            //console.log(res);
            expect(res.level === test.expected[0]).to.be.true;
            expect(pokersDeepEql(res.pokers, output.reverse())).to.be.true;
        });
    });

    const test_level_7 = [
        /* Four of a Kind */
        // input len is 5
        { args: [[0, 0, 0, 0, 7], [1, 2, 3, 0, 0]],             expected: [7, [0, 0, 0, 0, 7], ['*', '*', '*', '*', 0]] },
        // input len is 6
        { args: [[0, 0, 0, 0, 7, 9], [1, 2, 3, 0, 0, 1]],       expected: [7, [0, 0, 0, 0, 9], ['*', '*', '*', '*', 1]] },
        { args: [[0, 0, 0, 0, 7, 7], [1, 2, 3, 0, 0, 1]],       expected: [7, [0, 0, 0, 0, 7], ['*', '*', '*', '*', '*']] }, 
        // input len is 7
        { args: [[0, 0, 0, 0, 7, 9, 12], [1, 2, 3, 0, 0, 1, 2]],    expected: [7, [0, 0, 0, 0, 12], ['*', '*', '*', '*', 2]] }, 
        { args: [[0, 0, 0, 0, 1, 2, 3], [1, 2, 3, 0, 0, 1, 2]],     expected: [7, [0, 0, 0, 0, 3], ['*', '*', '*', '*', 2]] }, 
        { args: [[10, 10, 10, 10, 7, 7, 7], [1, 2, 3, 0, 0, 1, 2]], expected: [7, [10, 10, 10, 10, 7], ['*', '*', '*', '*', '*']] }, 
    ];
    test_level_7.forEach(function(test) {
        let desc = `test level 7, input ${JSON.stringify(test.args)}, expected ${JSON.stringify(test.expected)}`; 
        it(desc, () => {
            let input = createPokers(test.args[0], test.args[1]);
            let output = createPokers(test.expected[1], test.expected[2], false);
            let res = computeLevel(input);
            //console.log(res);
            expect(res.level === test.expected[0]).to.be.true;
            expect(pokersDeepEql(res.pokers, output)).to.be.true;
        });
    });

    const test_level_6 = [
        /* Full House */
        // input len is 5
        { args: [[0, 0, 0, 7, 7], [1, 2, 3, 1, 0]], expected: [6, [0, 0, 0, 7, 7], ['*', '*', '*', '*', '*']] },
        // input len is 6
        { args: [[0, 0, 0, 7, 9, 9], [1, 2, 3, 0, 0, 1]],   expected: [6, [0, 0, 0, 9, 9], ['*', '*', '*', '*', '*']] },
        { args: [[0, 0, 0, 7, 7, 7], [1, 2, 3, 0, 1, 2]],   expected: [6, [7, 7, 7, 0, 0], ['*', '*', '*', '*', '*']] }, 
        // input len is 7
        { args: [[0, 0, 0, 7, 7, 11, 12], [1, 2, 3, 0, 0, 1, 2]],   expected: [6, [0, 0, 0, 7, 7], ['*', '*', '*', '*', '*']] }, 
        { args: [[0, 0, 0, 6, 6, 1, 1], [1, 2, 3, 0, 0, 1, 2]],     expected: [6, [0, 0, 0, 6, 6], ['*', '*', '*', '*', '*']] }, 
        { args: [[10, 10, 10, 11, 7, 7, 7], [1, 2, 3, 0, 0, 1, 2]], expected: [6, [10, 10, 10, 7, 7], ['*', '*', '*', '*', '*']] }, 
    ];
    test_level_6.forEach(function(test) {
        let desc = `test level 6, input ${JSON.stringify(test.args)}, expected ${JSON.stringify(test.expected)}`; 
        it(desc, () => {
            let input = createPokers(test.args[0], test.args[1]);
            let output = createPokers(test.expected[1], test.expected[2], false);
            let res = computeLevel(input);
            //console.log(res);
            expect(res.level === test.expected[0]).to.be.true;
            expect(pokersDeepEql(res.pokers, output)).to.be.true;
        });
    });

    const test_level_5 = [
        /* Flush */
        // input len is 5
        { args: [[0, 1, 2, 3, 5], [0, 0, 0, 0, 0]], expected: [5, [0, 1, 2, 3, 5], [0, 0, 0, 0, 0]] },
        { args: [[12, 1, 6, 3, 9], [1, 1, 1, 1, 1]], expected: [5, [1, 3, 6, 9, 12], [1, 1, 1, 1, 1]] },        
        // input len is 6
        { args: [[0, 1, 2, 3, 7, 9], [0, 0, 0, 0, 0, 0]],   expected: [5, [1, 2, 3, 7, 9], [0, 0, 0, 0, 0]] },
        { args: [[12, 1, 6, 3, 9, 12], [1, 1, 1, 1, 1, 3]], expected: [5, [1, 3, 6, 9, 12], [1, 1, 1, 1, 1]] }, 
        // input len is 7
        { args: [[0, 1, 2, 3, 7, 9, 9], [0, 0, 0, 0, 1, 0, 3]],     expected: [5, [0, 1, 2, 3, 9], [0, 0, 0, 0, 0]] },
        { args: [[12, 1, 6, 3, 9, 12, 12], [1, 1, 1, 1, 1, 3, 2]],  expected: [5, [1, 3, 6, 9, 12], [1, 1, 1, 1, 1]] },
        { args: [[0, 0, 6, 3, 9, 12, 12], [1, 3, 1, 1, 1, 3, 1]],   expected: [5, [0, 3, 6, 9, 12], [1, 1, 1, 1, 1]] },
    ];
    test_level_5.forEach(function(test) {
        let desc = `test level 5, input ${JSON.stringify(test.args)}, expected ${JSON.stringify(test.expected)}`; 
        it(desc, () => {
            let input = createPokers(test.args[0], test.args[1]);
            let output = createPokers(test.expected[1], test.expected[2], false);
            let res = computeLevel(input);
            //console.log(res);
            expect(res.level === test.expected[0]).to.be.true;
            expect(pokersDeepEql(res.pokers, output.reverse())).to.be.true;
        });
    });


    const test_level_4 = [
        /* Straight */
        // input len is 5
        { args: [[2, 3, 4, 5, 6], [1, 0, 0, 0, 0]],     expected: [4, [2, 3, 4, 5, 6], [1, 0, 0, 0, 0]] },
        { args: [[0, 1, 2, 3, 4], [1, 2, 3, 0, 3]],     expected: [4, [0, 1, 2, 3, 4], [1, 2, 3, 0, 3]] },
        { args: [[8, 9, 10, 11, 12], [1, 0, 1, 3, 2]],  expected: [4, [8, 9, 10, 11, 12], [1, 0, 1, 3, 2]] },
        { args: [[0, 1, 2, 3, 12], [1, 1, 1, 3, 1]],    expected: [4, [12, 0, 1, 2, 3], [1, 1, 1, 1, 3]] },
        // input len is 6
        { args: [[2, 3, 4, 5, 6, 7], [1, 0, 0, 0, 0, 3]],       expected: [4, [3, 4, 5, 6, 7], [0, 0, 0, 0, 3]] },
        { args: [[0, 1, 2, 3, 4, 6], [1, 2, 3, 0, 3, 1]],       expected: [4, [0, 1, 2, 3, 4], [1, 2, 3, 0, 3]] },
        { args: [[8, 8, 9, 10, 11, 12], [0, 1, 0, 1, 3, 2]],    expected: [4, [8, 9, 10, 11, 12], ['*', 0, 1, 3, 2]] },
        { args: [[0, 1, 2, 3, 11, 12], [1, 1, 1, 3, 0, 1]],     expected: [4, [12, 0, 1, 2, 3], [1, 1, 1, 1, 3]] },
        // input len is 7
        { args: [[1, 2, 3, 4, 5, 6, 7], [2, 1, 0, 0, 0, 0, 3]],     expected: [4, [3, 4, 5, 6, 7], [0, 0, 0, 0, 3]] },
        { args: [[0, 1, 2, 3, 4, 6, 6], [1, 2, 3, 0, 3, 1, 0]],     expected: [4, [0, 1, 2, 3, 4], [1, 2, 3, 0, 3]] },
        { args: [[8, 8, 9, 9, 10, 11, 12], [1, 0, 1, 0, 1, 3, 2]],  expected: [4, [8, 9, 10, 11, 12], ['*', '*', 1, 3, 2]] },
        { args: [[0, 1, 2, 3, 12, 12, 12], [3, 1, 1, 1, 3, 2, 1]],  expected: [4, [12, 0, 1, 2, 3], ['*', 3, 1, 1, 1]] },
    ];
    test_level_4.forEach(function(test) {
        let desc = `test level 4, input ${JSON.stringify(test.args)}, expected ${JSON.stringify(test.expected)}`; 
        it(desc, () => {
            let input = createPokers(test.args[0], test.args[1]);
            let output = createPokers(test.expected[1], test.expected[2], false);
            let res = computeLevel(input);
            console.log(res);
            expect(res.level === test.expected[0]).to.be.true;
            expect(pokersDeepEql(res.pokers, output.reverse())).to.be.true;
        });
    });
});