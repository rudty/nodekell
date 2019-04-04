"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test maxBy', () => {
    it('first', async () => {
        const a = [10,9,8,7];
        const r = await F.maxBy(e => e, a)

        assert.deepStrictEqual(r, 10);
    });

    it('second', async () => {
        const a = [1,10,9,8,7];
        const r = await F.maxBy(e => e, a)

        assert.deepStrictEqual(r, 10);
    });

    it('last', async () => {
        const a = [1,10,9,8,7,11];
        const r = await F.maxBy(e => e, a)

        assert.deepStrictEqual(r, 11);
    });

    it('div', async () => {
        const a = [1,10,9,8,7,11];
        const r = await F.maxBy(e => Math.floor(e/10), a) //compare [0,1,0,0,0,1]
        assert.deepStrictEqual(r, 10);
    });

    it('gen', async () => {
        const s = F.seq([1,2,3,4,10]);
        const r = await F.maxBy(e=>e, s);
        assert.deepStrictEqual(r, 10);
    });
});