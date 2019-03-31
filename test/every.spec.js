"use strict";
const F = require("../index");
const assert = require("assert");

describe('test every', () => {
    it('arr true', async () => {
        const a = [1,2,3,4,5];
        const r = await F.every(e=> e  >= 0, a);
        assert.strictEqual(r, true);
    });

    it('arr false', async () => {
        const a = [1,2,3,4,5];
        const r = await F.every(e => e % 2 == 0, a);
        assert.strictEqual(r, false);
    });

    it('arr promise true', async () => {
        const a = [1,2,3,4,5];
        const r = await F.every(e=> Promise.resolve(e  >= 0), a);
        assert.strictEqual(r, true);
    });

    it('arr promise false', async () => {
        const a = [1,2,3,4,5];
        const r = await F.every(e=> Promise.resolve(e < 3), a);
        assert.strictEqual(r, false);
    });

    it('generator promise true', async () => {
        const r = await F.run(
            F.range(10),
            F.every(e=> Promise.resolve(e < 10))
        );
        assert.strictEqual(r, true);
    });

});