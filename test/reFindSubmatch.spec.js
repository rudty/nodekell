"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test reFindSubmatch', () => {
    it('no group string', async () => {
        const r = F.reFindSubmatch(/hello/, "hello world");
        assert.deepStrictEqual(r[0], "hello");
        assert.strictEqual(r.length, 1);
    });

    it('no group string2', async () => {
        const r = F.reFindSubmatch(/hello/, "hello world hello");
        assert.deepStrictEqual(r[0], "hello");
        assert.strictEqual(r.length, 1);
    });

    it('no group string', async () => {
        const r = F.reFindSubmatch(/hello/, "hello world");
        assert.deepStrictEqual(r[0], "hello");
        assert.strictEqual(r.length, 1);
    });

    it('no group string2', async () => {
        const r = F.reFindSubmatch(/[a-z]+/, "hello world");
        assert.deepStrictEqual(r[0], "hello");
    });

    it('group string', async () => {
        const r = F.reFindSubmatch(/([a-z]+)/, "hello world");
        assert.strictEqual(r.length, 2);
        assert.deepStrictEqual(r[0], "hello");
        assert.deepStrictEqual(r[1], "hello");
    });

    it('group string2', async () => {
        const r = F.reFindSubmatch(/h([a-z]+)/, "hello world");
        assert.deepStrictEqual(r[0], "hello");
        assert.deepStrictEqual(r[1], "ello");
    });
});