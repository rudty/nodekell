"use strict";
const F = require("../index");
const assert = require("assert");

describe('test assign', () => {
    it('default', async () => {
        const m = F.assign3({ b: 1 }, { a: 1 }, { c: 1 });
        assert.deepStrictEqual(m, { a: 1, b: 1, c: 1 });
    });

    it('curry', async () => {
        const m = F.assign3({ b: 1 })({ a: 1 })({ c: 1 });
        assert.deepStrictEqual(m, { a: 1, b: 1, c: 1 });
    });

    it('default', async () => {
        const m = F.assign3({ b: 1 }, { a: 1 }, { c: 1 }, { d: 1 }, { e: 1 });
        assert.deepStrictEqual(m, { a: 1, b: 1, c: 1, d: 1, e: 1 });
    });

    it('vaarg curry', async () => {
        const m = F.assign3({ b: 1 })({ a: 1 })({ c: 1 }, { d: 1 });
        assert.deepStrictEqual(m, { a: 1, b: 1, c: 1, d: 1 });
    });
});