"use strict";
const F = require("../index");
const assert = require("assert");

describe('test average', () => {
    it('returns arr', async () => {
        const arr = [1,2,3];
        const m = await F.associateBy(e => [e, e * 2], arr); 
        assert.deepStrictEqual(m, new Map([[1,2],[2,4],[3,6]]));
    });

    it('returns string2', async () => {
        const arr = [1,2,3];
        const m = await F.associateBy(_ => "ab", arr); 
        assert.deepStrictEqual(m, new Map([["a","b"],["a","b"],["a","b"]]));
    });

    it('returns string1', async () => {
        const arr = [1,2,3];
        const m = await F.associateBy(_ => "a", arr); 
        assert.deepStrictEqual(m, new Map([["a",undefined],["a",undefined],["a",undefined]]));
    });

    it('returns num', async () => {
        const arr = [1, 2, 3];
        const m = await F.associateBy(e => e + 1, arr);
        assert.deepStrictEqual(m, new Map([[2,2],[3,3],[4,4]]));
    });

    it('returns obj', async () => {
        const arr = [1, 2, 3];
        const m = await F.associateBy(_ => ({ "v":0 }), arr);
        assert.deepStrictEqual(m, new Map([
            [{ "v":0 },{ "v":0 }],
            [{ "v":0 },{ "v":0 }],
            [{ "v":0 },{ "v":0 }]]));
    });

    it('returns NaN', async () => {
        const arr = [1, 2, 3];
        const m = await F.associateBy(_ => NaN, arr);
        assert.deepStrictEqual(m, new Map([
            [NaN, NaN]]));
    });
});