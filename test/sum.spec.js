"use strict";
const F = require("../index");
const assert = require("assert");

describe('test sum', () => {
    it('num', async () => {
        const a = [1,2,3,4,5];
        const s = await F.sum(a);
        assert.strictEqual(s, 15);
    });

    it('string array', async () => {
        const a = ["a","b","c","d","e"];
        const s = await F.sum(a);
        assert.strictEqual(s, "abcde");
    });

    it('string', async () => {
        const a = "abcde"; 
        const s = await F.sum(a);
        assert.strictEqual(s, "abcde");
    });

});