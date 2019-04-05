"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test rangeOf', () => {
    it('default', async () => {
        const a = [10,9,8,7];
        const r = await F.rangeOf(a);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[10,9,8,7]);
    });

    it('values', async () => {
        const r = await F.rangeOf(1,2,3);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[1,2,3]);
    });

    it('values', async () => {
        const r = await F.rangeOf(1);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[1]);
    });

    it('array + values', async () => {
        const r = await F.rangeOf([1,2,3], 4, 5);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [1, 2, 3,4,5]);
    });

    it('array values', async () => {
        const r = await F.rangeOf([1],[2],[3]);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [1,2,3]);
    });
});