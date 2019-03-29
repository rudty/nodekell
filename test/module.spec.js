"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test module', () => {
    it('1', async () => {
        const v = await F.run(
            F.range(10),//[0~9]
            F.filter(e => e % 2 == 0), //[0,2,4,6,8] 
            F.map(e => e + 1), //[1,3,5,7,9]
            F.reduce((acc, e) => acc + e)) // 1+3+5+7+9

        assert.equal(25, v);
    });

    it('2', async () => {
        const v = await F.run(
            F.range(Infinity),//[0,1,2....]
            F.filter(e => (e % 3) === 0), //[0,3,6...] 
            F.map(e => e + 1), //[1,4,7...]
            F.take(5), // 5 elem
            F.collect);  // generator => array

        assert.deepEqual([1,4,7,10,13], v);
    });

});