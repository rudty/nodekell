"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test reFindAllSubmatch', () => {
    it('no group string', async () => {
        const r = F.reFindAllSubmatch(/hello/, "hello world");
        assert.deepStrictEqual(r[0][0], "hello");
        assert.strictEqual(r.length, 1);
    });

    it('no group string2', async () => {
        const r = F.reFindAllSubmatch(/hello/, "hello world hello");
        assert.deepStrictEqual(r[0][0], "hello");
        assert.deepStrictEqual(r[1][0], "hello");
        assert.strictEqual(r.length, 2);
    });

    it('no group string', async () => {
        const r = F.reFindAllSubmatch(/hello/, "hello world");
        assert.deepStrictEqual(r[0][0], "hello");
        assert.strictEqual(r.length, 1);
    });

    it('no group string2', async () => {
        const r = F.reFindAllSubmatch(/[a-z]+/, "hello world");
        assert.strictEqual(r.length, 2);
        assert.deepStrictEqual(r[0][0], "hello");
        assert.strictEqual(r[0].length, 1);
        assert.deepStrictEqual(r[1][0], "world");
        assert.strictEqual(r[1].length, 1);
    });

    it('group string', async () => {
        const r = F.reFindAllSubmatch(/([a-z]+)/, "hello world");
        assert.strictEqual(r.length, 2);
        assert.deepStrictEqual(r[0][0], "hello");
        assert.deepStrictEqual(r[0][1], "hello");
        assert.strictEqual(r[0].length, 2);
        assert.deepStrictEqual(r[1][0], "world");
        assert.deepStrictEqual(r[1][1], "world");
        assert.strictEqual(r[1].length, 2);
    });

    it('group string2', async () => {
        const r = F.reFindAllSubmatch(/h([a-z]+)/, "hello world");
        assert.strictEqual(r.length, 1);
        assert.strictEqual(r[0].length, 2);
        assert.deepStrictEqual(r[0][0], "hello");
        assert.deepStrictEqual(r[0][1], "ello");
    });
});