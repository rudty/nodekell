"use strict";
const F = require("../index");
const assert = require("assert");

describe('test average', () => {
    it('num', async () => {
        const a = [1,2,3,4,5];
        const s = await F.average(a);
        assert.strictEqual(s, 3);
    });

    it('float', async () => {
        const a = [1.0,2.0,3.0,4.0,5.5];
        const s = await F.average(a);
        assert.strictEqual(s, 3.1);
    });

    it('float2', async () => {
        const a = [1.0,2.0,3.0,4.0,5.0];
        const s = await F.average(a);
        assert.strictEqual(s, 3);
    });

    // it('string array', async () => {
    //     const a = ["a","b","c","d","e"];
    //     const s = await F.sum(a);
    //     assert.strictEqual(s, "abcde");
    // });

    // it('string', async () => {
    //     const a = "abcde"; 
    //     const s = await F.sum(a);
    //     assert.strictEqual(s, "abcde");
    // });

});