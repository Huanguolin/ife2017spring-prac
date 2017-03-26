import chai from 'chai';
import util from '../holdem/util';

const expect = chai.expect;
const getStraight = util.getStraight;
// generate pokers and ignore type
const generatePokers = function (valList, messIt = true) {
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
// only check pokers value is equal or not
const pokersValueEql = function (a, b) {
    let res = true;

    if (a.length === b.length) {
        const len = a.length;            
        for (let i = 0; i < len; i++) {
            if (res) {
                res = a[i].v === b[i].v; 
            } else {
                break;
            }
        }
    } else {
        res = false;
    }

    return res;
};

describe('holdem/util#getStraight ', () => {
 
    it('input cannot be null or undefined', () => {         
        let err;
        try { 
            getStraight(undefined);
        } catch (e) {
            err = e;
        }
        expect(err).to.be.an('error');
    });

    it('input length can not less than 5', () => {
        const data = generatePokers([1, 2, 3, 4], false);         
        let err;
        try { 
            getStraight(data);
        } catch (e) {
            err = e;
        }
        expect(err).to.be.an('error');
    });

    it('input length can not greater than 7', () => {
        const data = generatePokers([1, 2, 3, 4, 5, 6, 7, 8], false);         
        let err;
        try { 
            getStraight(data);
        } catch (e) {
            err = e;
        }
        expect(err).to.be.an('error');
    });

    it('no straight', () => {
        const data1 = generatePokers([1, 2, 3, 4, 6]); 
        const data2 = generatePokers([0, 2, 3, 4, 10, 11, 12]); 
        expect(getStraight(data1)).to.be.null; // case 1, input len: 5        
        expect(getStraight(data2)).to.be.null; // case 2, input len: 7
    });

    /* has straight */
    const tests = [
        // input len is 5
        { args: [2, 3, 4, 5, 6],    expected: [2, 3, 4, 5, 6] },
        { args: [0, 1, 2, 3, 4],    expected: [0, 1, 2, 3, 4] },
        { args: [0, 1, 2, 3, 12],   expected: [12, 0, 1, 2, 3] },

        // input len is 6 
        { args: [2, 3, 4, 5, 6, 8],     expected: [2, 3, 4, 5, 6] },
        { args: [2, 3, 4, 5, 6, 7],     expected: [3, 4, 5, 6, 7] },
        { args: [0, 1, 2, 3, 7, 12],    expected: [12, 0, 1, 2, 3] },

        // input len is 7 
        { args: [2, 3, 4, 5, 6, 7, 12],     expected: [3, 4, 5, 6, 7] },
        { args: [2, 3, 4, 5, 6, 7, 8],      expected: [4, 5, 6, 7, 8] },
        { args: [0, 1, 2, 3, 7, 11, 12],    expected: [12, 0, 1, 2, 3] },
        { args: [0, 1, 2, 3, 4, 6, 6],      expected: [0, 1, 2, 3, 4] },
        { args: [8, 9, 10, 11, 11, 12, 12], expected: [8, 9, 10, 11, 12] },
    ];    
    tests.forEach(function(test) {
        let desc = `has straight, input ${JSON.stringify(test.args)}, expected ${JSON.stringify(test.expected)}`; 
        it(desc, () => {
            let input = generatePokers(test.args);
            let output = generatePokers(test.expected.reverse(), false);
            const res = pokersValueEql(getStraight(input), output);
            expect(res).to.be.true;
        });
    });
    
});