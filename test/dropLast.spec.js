"use strict";
const F = require("../index");
const assert = require("assert");

describe('test dropLast', () => {
    // it('default', async () => {
    //     const a = [1,2,3,4,5];
    //     const r = F.dropLast(3, a)
    //     const result = await F.collect(r);
    //     assert.deepStrictEqual(result, [1,2]);
    // });

    it('infinity', async () => {
        const a = [1,2,3,4,5,6,7,8];
        const r = F.dropLast(Infinity, a)
        const result = await F.collect(r);
        assert.deepStrictEqual(result, []);
    });

    // it('empty', async () => {
    //     const a = [];
    //     const r = F.dropLast(0, a)
    //     const result = await F.collect(r);
    //     assert.deepStrictEqual(result, []);
    // });
});