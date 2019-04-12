"use strict";
const F = require("../index");
const assert = require("assert");

// for await (const e of )){
    // console.log(e);
// }
describe('test buffer', () => {
    it('arg 1', async () => {
        const b = F.buffer(1, [1,2,3,4,5]);
        const c = await F.collect(b);
        assert.deepStrictEqual(c, [[1],[2],[3],[4],[5]]);
    });

    it('arg 2', async () => {
        const b = F.buffer(2, [1,2,3,4,5]);
        const c = await F.collect(b);
        assert.deepStrictEqual(c, [[1,2],[3,4],[5]]);
    });

    it('arg 3', async () => {
        const b = F.buffer(3, [1,2,3,4,5]);
        const c = await F.collect(b);
        assert.deepStrictEqual(c, [[1,2,3],[4,5]]);
    });

    it('arg 4', async () => {
        const b = F.buffer(4, [1,2,3,4,5]);
        const c = await F.collect(b);
        assert.deepStrictEqual(c, [[1,2,3,4],[5]]);
    });

    it('arg 5', async () => {
        const b = F.buffer(5, [1,2,3,4,5]);
        const c = await F.collect(b);
        assert.deepStrictEqual(c, [[1,2,3,4,5]]);
    });

    it('arg 6', async () => {
        const b = F.buffer(6, [1,2,3,4,5]);
        const c = await F.collect(b);
        assert.deepStrictEqual(c, [[1,2,3,4,5]]);
    });

    
});