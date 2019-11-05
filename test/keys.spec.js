"use strict";
const F = require("../index");
const assert = require("assert");

describe('keys', () => {
    it('map', async () => {
        const m = new Map([[1, 2], [3, 4]]);
        const r = await F.collect(F.keys(m));
        assert.deepStrictEqual(r, [1, 3]);
    });

    it('set array', async () => {
        const m = new Set([[1, 2], [3, 4]]);
        const r = await F.collect(F.keys(m));
        assert.deepStrictEqual(r, [1, 3]);
    });

    it('set value', async () => {
        const m = new Set([1, 2, 3, 4]);
        try {
            await F.collect(F.keys(m));
            assert.fail("must error");
        } catch (_) {

        }
    });

    it('array', async () => {
        const arr = [[1, 2], [3, 4]];
        const r = await F.collect(F.keys(arr));
        assert.deepStrictEqual(r, [1, 3]);
    });

    it('type array', async () => {
        const arr = [new Int32Array([1, 2]), new Int32Array([3, 4])];
        const r = await F.collect(F.keys(arr));
        assert.deepStrictEqual(r, [1, 3]);
    });

    it('object', async () => {
        const obj = { a: 1, b: 2 };
        const r = await F.collect(F.keys(obj));
        assert.deepStrictEqual(r, ["a", "b"]);
    });
});