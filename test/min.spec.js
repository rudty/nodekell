"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test min', () => {
    it('arr', async () => {
        const a = [10,9,8,7];
        const r = await F.min(a)

        assert.deepStrictEqual(r, 7);
    });

    it('promise value', async () => {
        const r = await F.min([Promise.resolve(1),2,3]);
        assert.deepStrictEqual(r, 1);
    });

    it('with all', async () => {
        const v = await F.run(
            F.range(Infinity),
            F.filter(e => (e % 3) === 0), 
            F.map(e => e + 1), 
            F.take(5), 
            F.min);

        assert.deepEqual(1, v);
    });
});