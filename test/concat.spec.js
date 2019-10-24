"use strict";
const F = require("../index");
const assert = require("assert");

describe('test concat', () => {
    it('default', async () => {
        const c = F.concat([1,2,3],[4,5,6]);
        assert.deepStrictEqual(await F.collect(c), [1,2,3,4,5,6]);
    });

    it('array', async () => {
        const v = await F.run(
            F.concat([1,2,3],[4,5,6]),
            F.collect);
        assert.deepStrictEqual(v, [1,2,3,4,5,6]);
    });

    it('range', async () => {
        const v = await F.run(
            F.concat(
                F.range(3),
                F.range(3)),
            F.collect);
        assert.deepStrictEqual(v, [0,1,2,0,1,2]);
    });
    
    it('value', async () => {
        const v = await F.collect(F.concat([1,2], 3));
        assert.deepStrictEqual(v, [1,2,3]);
    });
});