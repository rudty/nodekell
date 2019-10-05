"use strict";
const F = require("../index");
const assert = require("assert");

describe('test comparator', () => {
    const fnAsc = (a, b) => a < b;
    const fnDesc = (a, b) => a > b;

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
});