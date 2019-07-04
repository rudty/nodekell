"use strict";
const F = require("../index");
const assert = require("assert");

describe('test shuffle', () => {
    it('array', async () => {
        for (let i = 0; i < 1000; ++i) {
            const r = await F.sample([1,2,3,4,5,6]);
            assert.ok(r > 0);
            assert.ok(r <= 6);
        }
    });

    it('once', async () => {
        const r = await F.sample([1]);
        assert.strictEqual(r, 1);
    });

    it('generator', async () => {
        for (let i = 0; i < 1000; ++i) {
            const r = await F.sample(F.range(100));
            if (!(r >= 0)) console.log(r);
            assert.ok(r >= 0);
            assert.ok(r < 100);
        }
    });

    it('typearray', async () => {
        const arr = new Int32Array(100);
        for (let i = 0; i < 100; ++i) {
            arr[i] = F.random(100);
        }
        assert.ok(F.sample(arr) > 0);
    });

    it('typearray length 0', async () => {
        const arr = new Int32Array(0);
        assert.ok(F.sample(arr) === undefined);
    });

    it('str', async () => {
        const s = "hello world";
        assert.ok(F.sample(s).constructor === String);
    });
});