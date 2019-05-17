"use strict";
const F = require("../index");
const assert = require("assert");

describe('test enumerate', () => {
    it('array', async () => {
        const a = ["a", "b", "c", "d", "e"];

        const g = F.enumerate(a);
        let n = await g.next();
        assert.deepStrictEqual({ done: false, value: [0, "a"] }, n);
        n = await g.next();
        assert.deepStrictEqual({ done: false, value: [1, "b"] }, n);
        n = await g.next();
        assert.deepStrictEqual({ done: false, value: [2, "c"] }, n);
        n = await g.next();
        assert.deepStrictEqual({ done: false, value: [3, "d"] }, n);
        n = await g.next();
        assert.deepStrictEqual({ done: false, value: [4, "e"] }, n);
        n = await g.next();
        assert.deepStrictEqual({ done: true, value: undefined }, n);
    });
});