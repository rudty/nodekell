"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test reFind', () => {
    it('no group string', async () => {
        const r = F.reFind(/hello/, "hello world");
        assert.deepStrictEqual(r, "hello");
    });

    it('no group string2', async () => {
        const r = F.reFind(/hello/, "hello world hello");
        assert.deepStrictEqual(r, "hello");
    });

    it('no group string', async () => {
        const r = F.reFind(/(hello)/, "hello world");
        assert.deepStrictEqual(r, "hello");
    });

    it('no group string2', async () => {
        const r = F.reFind(/[a-z]+/, "hello world");
        assert.deepStrictEqual(r, "hello");
    });

    it('group string', async () => {
        const r = F.reFind(/([a-z]+)/, "hello world");
        assert.deepStrictEqual(r, "hello");
    });

    it('group string2', async () => {
        const r = F.reFind(/h([a-z]+)/, "aello hello world");
        assert.deepStrictEqual(r, "hello");
    });
});