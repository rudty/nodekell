"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test scanl', () => {
    it('add', async () => {
        const s = F.scanl(F.add, 0, [1,2,3]);
        const r = await F.collect(s);
        assert.deepStrictEqual(r, [0,1,3,6]);
    });

    it('empty', async () => {
        const s = F.scanl(F.add, 1, []);
        const r = await F.collect(s);
        assert.deepStrictEqual(r, [1]);
    });

    it('div', async () => {
        const s = F.scanl((a, b) => a/b, 64, [4,2,1]);
        const r = await F.collect(s);
        assert.deepStrictEqual(r, [64,16,8,8]);
    });

    it('max', async () => {
        const s = F.scanl((a,b) => a > b ? a : b, 10, [1,1,1]);
        const r = await F.collect(s);
        assert.deepStrictEqual(r, [10,10,10,10]);
    });
});