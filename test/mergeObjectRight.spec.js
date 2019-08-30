"use strict";
const F = require("../index");
const assert = require("assert");

describe('test mergeObjectRight', () => {
    it('map', async () => {
        const m1 = new Map([[1, 2], [3, 4]]);
        const m2 = new Map([[5, 6], [7, 8]]);
        const r1 = await F.mergeObjectRight(m1, m2);
        assert.deepStrictEqual(r1, {
            5: 6,
            7: 8,
            1: 2,
            3: 4,
        });
    });

    it('mapAndObject', async () => {
        const m1 = new Map([[1, 2], [3, 4]]);
        const o1 = { 5: 6, 7: 8 };
        const r1 = await F.mergeObjectRight(m1, o1);
        assert.deepStrictEqual(r1, {
            5: 6,
            7: 8,
            1: 2,
            3: 4,
        });
    });

    it('overwrite', async () => {
        const m1 = new Map([[1, 2], [3, 4]]);
        const m2 = new Map([[1, 'a'], [3, 'b']]);
        const r1 = await F.mergeObjectRight(m1, m2);
        assert.deepStrictEqual(r1, {
            1: 2,
            3: 4,
        });
    });

    it('curry', async () => {
        const m1 = new Map([[1, 2], [3, 4]]);
        const m2 = new Map([[1, 'a'], [3, 'b']]);
        const r1 = await F.mergeObjectRight(m1)(m2, m1);
        assert.deepStrictEqual(r1, {
            1: 2,
            3: 4,
        });;
    });
});