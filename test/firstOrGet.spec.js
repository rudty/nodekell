"use strict";
const F = require("../index");
const assert = require("assert");

describe('test firstOrGet', () => {
    it('default', async () => {
        const a = [1,2,3,4,5];
        const r = await F.firstOrGet(3, a)
        assert.deepEqual(r, 1);
    });

    it('function', async () => {
        const a = [];
        const r = await F.firstOrGet(()=>3, a)
        assert.deepEqual(r, 3);
    });

    it('promise', async () => {
        const a = [];
        const r = await F.firstOrGet(Promise.resolve(3), a)
        assert.deepEqual(r, 3);
    });

    it('function promise', async () => {
        const a = [];
        const r = await F.firstOrGet(()=>Promise.resolve(3), a)
        assert.deepEqual(r, 3);
    });

});