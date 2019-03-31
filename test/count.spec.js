"use strict";
const F = require("../index");
const assert = require("assert");

describe('test count', () => {
    it('num', async () => {
        const a = [1,2,3,4,5];
        const n = await F.count(a);
        assert.strictEqual(n, 5);
    });

    it('string', async () => {
        const a = "abcde"; 
        const n = await F.count(a);
        assert.strictEqual(n, 5);
    });

});