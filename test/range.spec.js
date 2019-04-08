"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test range', () => {
    it('default', async () => {
        const r = F.range(5);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[0,1,2,3,4]);
    });

    it('begin_end', async () => {
        const r = F.range(9, 11);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[9,10]);
    });

    it('reverse', async () => {
        const r = F.range(5,0,-1);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[5,4,3,2,1]);
    });

    it('empty', async () => {
        const r = F.range(0);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, []);
    });

    it('single', async () => {
        const r = F.range(1);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [0]);
    });

    it('9 to Infinity', async () => {
        const r = await F.run(
            F.range(9, Infinity),
            F.take(3)
        );
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [9,10,11]);
    });
});