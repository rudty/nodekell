"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test reFindAll', () => {
    it('no group string', async () => {
        const r = F.reFindAll(/hello/, "hello world");
        assert.deepStrictEqual(r, ["hello"]);
    });

    it('no group string2', async () => {
        const r = F.reFindAll(/hello/, "hello world hello");
        assert.deepStrictEqual(r, ["hello","hello"]);
    });

    it('no group string', async () => {
        const r = F.reFindAll(/(hello)/, "hello world");
        assert.deepStrictEqual(r, ["hello"]);
    });

    it('no group string2', async () => {
        const r = F.reFindAll(/[a-z]+/, "hello world");
        assert.deepStrictEqual(r, ["hello", "world"]);
    });

    it('group string', async () => {
        const r = F.reFindAll(/([a-z]+)/, "hello world");
        assert.deepStrictEqual(r, ["hello", "world"]);
    });

    it('group string2', async () => {
        const r = F.reFindAll(/h([a-z]+)/, "hello world");
        assert.deepStrictEqual(r, ["hello"]);
    });
});