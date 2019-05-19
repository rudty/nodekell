"use strict";
const F = require("../index.js");
const assert = require("assert");

describe('test zip3', () => {
    it('array', async () => {
        const a = [1,2,3];
        const b = [4,5,6];
        const c = [7,8,9];
        const r = F.zip3(a,b,c);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [[1,4,7],[2,5,8],[3,6,9]]);
    });

    it('array 233', async () => {
        const a = [1,2];
        const b = [4,5,6];
        const c = [7,8,9];
        const r = F.zip3(a,b,c);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [[1,4,7],[2,5,8]]);
    });

    it('array 323', async () => {
        const a = [1,2,3];
        const b = [4,5];
        const c = [7,8,9];
        const r = F.zip3(a,b,c);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [[1,4,7],[2,5,8]]);
    });

    it('array 332', async () => {
        const a = [1,2,3];
        const b = [4,5,6];
        const c = [7,8];
        const r = F.zip3(a,b,c);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [[1,4,7],[2,5,8]]);
    });
});
