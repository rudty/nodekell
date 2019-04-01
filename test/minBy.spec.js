"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test minBy', () => {
    it('first', async () => {
        const a = [0,10,9,8,7];
        const r = await F.minBy(e => e, a)

        assert.deepStrictEqual(r, 0);
    });

    it('second', async () => {
        const a = [1,0,10,9,8,7];
        const r = await F.minBy(e => e, a)

        assert.deepStrictEqual(r, 0);
    });

    it('last', async () => {
        const a = [1,10,9,8,7,11,0];
        const r = await F.minBy(e => e, a)

        assert.deepStrictEqual(r, 0);
    });

    it('div', async () => {
        const a = [7,10,9,8,1,11];
        const r = await F.minBy(e => Math.floor(e/10), a) //compare [0,1,0,0,0,1]
        assert.deepStrictEqual(r, 7);
    });
});