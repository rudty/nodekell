"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test max', () => {
    it('arr', async () => {
        const a = [10,9,8,7];
        const r = await F.max(a)

        assert.deepStrictEqual(r, 10);
    });

    it('promise value', async () => {
        const r = await F.max([1,2,Promise.resolve(3)]);
        assert.deepStrictEqual(r, 3);
    });

    it('with all', async () => {
        const v = await F.run(
            F.range(Infinity),
            F.filter(e => (e % 3) === 0), 
            F.map(e => e + 1), 
            F.take(5), 
            F.max);

        assert.deepEqual(13, v);
    });
});