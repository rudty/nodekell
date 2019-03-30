"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test drop', () => {
    it('default', async () => {
        const a = [1,2,3,4,5];
        const r = F.drop(3, a)
        const result = await F.collect(r);
        assert.deepEqual(result, [4,5]);
    });

    it('infinity', async () => {
        const a = [1];
        const r = F.drop(Infinity, a)
        const result = await F.collect(r);
        assert.deepEqual(result, []);
    });

    it('empty', async () => {
        const a = [];
        const r = F.drop(3, a)
        const result = await F.collect(r);
        assert.deepEqual(result, []);
    });
});