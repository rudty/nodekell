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
});