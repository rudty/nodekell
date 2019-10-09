"use strict";
const F = require("../index");
const assert = require("assert");

describe('test comparator', () => {
    const fnAsc = (a, b) => a < b;
    const fnDesc = (a, b) => a > b;
    const fnPromiseAsc = (a, b) => Promise.resolve(a < b);
    const fnPromiseDesc = (a, b) => Promise.resolve(a > b);

    it('asc', async () => {
        const r0 = F.comparator(fnAsc, 1, 2);
        const r1 = F.comparator(fnAsc, 2, 1);
        const r2 = F.comparator(fnAsc, 1, 1);

        assert.deepStrictEqual(r0, -1);
        assert.deepStrictEqual(r1, 1);
        assert.deepStrictEqual(r2, 0);
    });

    it('desc', async () => {
        const r0 = F.comparator(fnDesc, 1, 2);
        const r1 = F.comparator(fnDesc, 2, 1);
        const r2 = F.comparator(fnDesc, 1, 1);

        assert.deepStrictEqual(r0, 1);
        assert.deepStrictEqual(r1, -1);
        assert.deepStrictEqual(r2, 0);
    });

    it('promise asc', async () => {
        const r0 = await F.comparator(fnPromiseAsc, 1, 2);
        const r1 = await F.comparator(fnPromiseAsc, 2, 1);
        const r2 = await F.comparator(fnPromiseAsc, 1, 1);

        assert.deepStrictEqual(r0, -1);
        assert.deepStrictEqual(r1, 1);
        assert.deepStrictEqual(r2, 0);
    });

    it('promise desc', async () => {
        const r0 = await F.comparator(fnPromiseDesc, 1, 2);
        const r1 = await F.comparator(fnPromiseDesc, 2, 1);
        const r2 = await F.comparator(fnPromiseDesc, 1, 1);

        assert.deepStrictEqual(r0, 1);
        assert.deepStrictEqual(r1, -1);
        assert.deepStrictEqual(r2, 0);
    });

    it('promise lhs asc', async () => {
        const r0 = await F.comparator(fnAsc, Promise.resolve(1), 2);
        const r1 = await F.comparator(fnAsc, Promise.resolve(2), 1);
        const r2 = await F.comparator(fnAsc, Promise.resolve(1), 1);

        assert.deepStrictEqual(r0, -1);
        assert.deepStrictEqual(r1, 1);
        assert.deepStrictEqual(r2, 0);
    });

    it('promise rhs asc', async () => {
        const r0 = await F.comparator(fnAsc, 1, Promise.resolve(2));
        const r1 = await F.comparator(fnAsc, 2, Promise.resolve(1));
        const r2 = await F.comparator(fnAsc, 1, Promise.resolve(1));

        assert.deepStrictEqual(r0, -1);
        assert.deepStrictEqual(r1, 1);
        assert.deepStrictEqual(r2, 0);
    });

    it('promise value promise asc', async () => {
        const r0 = await F.comparator(fnPromiseAsc, Promise.resolve(1), Promise.resolve(2));
        const r1 = await F.comparator(fnPromiseAsc, Promise.resolve(2), Promise.resolve(1));
        const r2 = await F.comparator(fnPromiseAsc, Promise.resolve(1), Promise.resolve(1));

        assert.deepStrictEqual(r0, -1);
        assert.deepStrictEqual(r1, 1);
        assert.deepStrictEqual(r2, 0);
    });

    it('promise value promise desc', async () => {
        const r0 = await F.comparator(fnPromiseDesc, Promise.resolve(1), Promise.resolve(2));
        const r1 = await F.comparator(fnPromiseDesc, Promise.resolve(2), Promise.resolve(1));
        const r2 = await F.comparator(fnPromiseDesc, Promise.resolve(1), Promise.resolve(1));

        assert.deepStrictEqual(r0, 1);
        assert.deepStrictEqual(r1, -1);
        assert.deepStrictEqual(r2, 0);
    });
});