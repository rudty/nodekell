"use strict";
const F = require("../index");
const assert = require("assert");

describe('test dropWhile', () => {
    it('default', async () => {
        const a = [1,2,3,4,5];
        const r = F.dropWhile(e=> e < 3, a)
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [3,4,5]);
    });

    it('odd', async () => {
        const a = [1,2,3,4,5];
        const r = F.dropWhile(e=> e % 2 == 1, a)
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [2,3,4,5]);
    });

    it('empty', async () => {
        const a = [];
        const r = F.dropWhile(e => e, a)
        const result = await F.collect(r);
        assert.deepStrictEqual(result, []);
    });
});