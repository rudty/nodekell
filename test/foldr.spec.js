"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test foldlr', () => {
    it('add', async () => {
        const arr = [1,2,3,4,5];
        const r = await F.foldr((a, b) => a + b, 0, arr);
        assert.deepEqual(r, 15);
    });

    it('div', async () => {
        const arr = [64,2,1];
        const r = await F.foldr((a, b) => a / b, 1, arr);
        assert.deepEqual(r, 32);
    });

    it('add2', async () => {
        const arr = ["b"];
        const r = await F.foldr((a, b) => a + b, "a", arr);
        assert.deepEqual(r, "ba");
    });

    it('add3', async () => {
        const arr = ["b","c"];
        const r = await F.foldr((a, b) => a + b, "a", arr);
        assert.deepEqual(r, "bca");
    });

    it('add3', async () => {
        const arr = ["1","2","3","4"];
        const r = await F.foldr((a, b) => a + b, "5", arr);
        assert.deepEqual(r, "12345");
    });

    it('empty', async () => {
        const arr = [];
        const r = await F.foldr((a, b) => a / b, 3, arr);
        assert.deepEqual(r, 3);
    });

    it('single', async () => {
        const arr = [3];
        const r = await F.foldr((a, b) => a + b, 0, arr);
        assert.deepEqual(r, 3);
    });
});