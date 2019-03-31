"use strict";
const F = require("../index");
const assert = require("assert");

describe('test collectSet', () => {
    it('num', async () => {
        const a = [1,2,3,1,2,3];
        const m = await F.collectSet(a);
        assert.deepStrictEqual(m, new Set([1,2,3]));
    });

    it('str', async () => {
        const a = "hello world";
        const m = await F.collectSet(a);
        assert.deepStrictEqual(m, new Set("helo wrld"));
    });

    it('empty', async () => {
        const a = [];
        const m = await F.collectSet(a);
        assert.deepStrictEqual(m, new Set());
    }); 
});