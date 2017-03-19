import chai from 'chai';
import util from '../lib/util';

const expect = chai.expect;
const getStraight = util.getStraight;

describe('lib/util#getStraight ', () => {
    
    // tools
    const createPokers = function (valList, messIt = true) {
        let ret = valList.map( v => { 
            const t =  Math.floor(Math.random() * 3);
            return { v, t }; 
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
    const pokersValueEql = function (a, b) {
        let res = true;

        if (a.length === b.length) {
            const len = a.length;            
            for (let i = 0; i < len; i++) {
                if (res) {
                    let vEql = a[i].v === b[i].v;
                    res = vEql; 
                } else {
                    break;
                }
            }
        } else {
            res = false;
        }

        return res;
    };


    it('input length can not less than 5', () => {
        const data = createPokers([1, 2, 3, 4], false);         
        let err;
        try { 
            getStraight(data);
        } catch (e) {
            err = e;
        }
        expect(err).to.be.an('error');
    });

    it('input length can not greater than 7', () => {
        const data = createPokers([1, 2, 3, 4, 5, 6, 7, 8], false);         
        let err;
        try { 
            getStraight(data);
        } catch (e) {
            err = e;
        }
        expect(err).to.be.an('error');
    });

    it('no straight', () => {
        const data1 = createPokers([1, 2, 3, 4, 6]); 
        const data2 = createPokers([0, 2, 3, 4, 10, 11, 12]); 
        expect(getStraight(data1)).to.be.null; // case 1, input len: 5        
        expect(getStraight(data2)).to.be.null; // case 2, input len: 7
    });

    /* has straight */
    const tests = [
        // input len is 5
        { args: [2, 3, 4, 5, 6],    expected: [2, 3, 4, 5, 6] },
        { args: [0, 1, 2, 3, 4],    expected: [0, 1, 2, 3, 4] },
        { args: [8, 9, 10, 11, 12], expected: [8, 9, 10, 11, 12] },
        { args: [0, 9, 10, 11, 12], expected: [9, 10, 11, 12, 0] },

        // input len is 6 
        { args: [2, 3, 4, 5, 6, 8],     expected: [2, 3, 4, 5, 6] },
        { args: [2, 3, 4, 5, 6, 7],     expected: [3, 4, 5, 6, 7] },
        { args: [0, 1, 2, 3, 4, 5],     expected: [1, 2, 3, 4, 5] },
        { args: [7, 8, 9, 10, 11, 12],  expected: [8, 9, 10, 11, 12] },
        { args: [0, 7, 9, 10, 11, 12],  expected: [9, 10, 11, 12, 0] },

        // input len is 7 
        { args: [2, 3, 4, 5, 6, 8, 12],     expected: [2, 3, 4, 5, 6] },
        { args: [2, 3, 4, 5, 6, 7, 8],      expected: [4, 5, 6, 7, 8] },
        { args: [0, 1, 2, 3, 4, 5, 12],     expected: [1, 2, 3, 4, 5] },
        { args: [6, 7, 8, 9, 10, 11, 12],   expected: [8, 9, 10, 11, 12] },
        { args: [0, 6, 7, 9, 10, 11, 12],   expected: [9, 10, 11, 12, 0] },
    ];
    tests.forEach(function(test) {
        let desc = `has straight, input ${JSON.stringify(test.args)}, expected ${JSON.stringify(test.expected)}`; 
        it(desc, () => {
            let input = createPokers(test.args);
            let output = createPokers(test.expected, false);
            const res = pokersValueEql(getStraight(input), output);
            expect(res).to.be.true;
        });
    });

});