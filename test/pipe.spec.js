"use strict";
const F = require("../index");
const assert = require("assert");

describe('test pipe', () => {
    it('default', async () => {
        const c = F.pipe(
            F.map(e => e + 1),
            F.filter(e => e % 2 == 0),
            F.collect);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
    });

    it('return undefined', async () => {
        const c = F.pipe(
            F.map(e => e + 1),
            F.filter(e => e % 2 == 0),
            ()=>{});


        assert.strictEqual(await c([0]), undefined);
        assert.strictEqual(await c([1]), undefined);
        assert.strictEqual(await c([0,1]), undefined);
    });

    it('toString', async () => {
        const c = F.pipe(()=>{});
        assert.equal(c.toString().length > 0, true);
    });
});