"use strict";
const F = require("../index");
const assert = require("assert");

describe('values', () => {
    it('map', async () => {
        const m = new Map([[1, 2], [3, 4]]);
        const r = await F.collect(F.values(m));
        assert.deepStrictEqual(r, [2, 4]);
    });

    it('set array', async () => {
        const m = new Set([[1, 2], [3, 4]]);
        const r = await F.collect(F.values(m));
        assert.deepStrictEqual(r, [2, 4]);
    });

    it('set value', async () => {
        const m = new Set([1, 2, 3, 4]);
        try {
            await F.collect(F.values(m));
            assert.fail("must error");
        } catch (_) {

        }
    });

    it('array', async () => {
        const arr = [[1, 2], [3, 4]];
        const r = await F.collect(F.values(arr));
        assert.deepStrictEqual(r, [2, 4]);
    });

    it('type array', async () => {
        const arr = [new Int32Array([1, 2]), new Int32Array([3, 4])];
        const r = await F.collect(F.values(arr));
        assert.deepStrictEqual(r, [2, 4]);
    });

    it('object', async () => {
        const obj = { a: 1, b: 2 };
        const r = await F.collect(F.values(obj));
        assert.deepStrictEqual(r, [1, 2]);
    });

    it('with zip', async () => {
        const odd = [1,3,5,7,9];
        const even = [2,4,6,8,10];
        const r = await F.collect(
            F.values(F.zip(odd, even))
        );
        assert.deepStrictEqual(r, [2,4,6,8,10]); 
    });

    it('custom iterator', async () => {
        const a = async function *() {
            yield [1, 2];
            yield [3, 4];
            yield [5, 6];
        };

        const r = await F.collect(F.values(a()));
        assert.deepStrictEqual(r, [2,4,6]); 
    });
});