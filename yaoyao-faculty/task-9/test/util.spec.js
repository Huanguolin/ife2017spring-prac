import chai from 'chai';
import util from '../lib/util';

let expect = chai.expect;

describe('lib/util#getStraight ', () => {
    const fn = util.getStraight;
    const data1 = [
        { v: 2, t: 0 },
        { v: 3, t: 2 },
        { v: 4, t: 3 },
        { v: 5, t: 0 },
        { v: 7, t: 1 }
    ];
    const data2 = [
        { v: 2, t: 0 },
        { v: 9, t: 2 },
        { v: 10, t: 3 },
        { v: 11, t: 0 },
        { v: 12, t: 1 }
    ];
    const item1 =  {v: 0, t: 0};
    const item2 =  {v: 10, t: 0};

    it('should return null.', () => {
        let tmp = data1;
        // case 1
        expect(fn(tmp)).to.be.equal(null);
        // case 2
        tmp.push(item1);
        expect(fn(tmp)).to.be.equal(null);
        // case 3
        tmp.push(item2);
        expect(fn(tmp)).to.be.equal(null);
        // case 4
        tmp = data2;
        expect(fn(tmp)).to.be.equal(null);        
        // case 5
        tmp.push(item1);
        tmp[1].v = 6;
        expect(fn(tmp)).to.be.equal(null);
    });
    it('should throw error.', () => {
        let err;
        try { 
            fn([item1]);
        } catch (e) {
            err = e;
        }

        expect(err).to.be.an('error');
    });
});