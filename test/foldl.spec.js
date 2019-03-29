"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test foldl', () => {
    it('add', async () => {
        const arr = [1,2,3,4,5];
        const r = await F.foldl((acc, e) => acc + e, 0, arr);
        assert.deepEqual(r, 15);
    });

    it('div', async () => {
        const arr = [2,2,8];
        const r = await F.foldl((acc, e) => acc / e, 64, arr);
        assert.deepEqual(r, 2);
    });

    it('empty', async () => {
        const arr = [];
        const r = await F.foldl((acc, e) => acc / e, 3, arr);
        assert.deepEqual(r, 3);
    });

    it('single', async () => {
        const arr = [3];
        const r = await F.foldl((acc, e) => acc + e, 0, arr);
        assert.deepEqual(r, 3);
    });

    it('add2', async () => {
        const arr = [1,2,3];
        const r = await F.foldl((acc, e) => 3*acc + e, 1, arr);
        assert.deepEqual(r, 45);
    });

    it('add3', async () => {
        const arr = ["a","b","c"];
        const r = await F.foldl((acc, e) => acc + e, "f", arr);
        assert.deepEqual(r, "fabc");
    });
    
});