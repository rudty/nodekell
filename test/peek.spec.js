"use strict";
const F = require("../index");
const assert = require("assert");

describe('test peek', () => {
    it('array', async () => {
        const a = [1,2,3,4,5];
        const p = F.peek(e=> e + 1, a)
        const result = await F.collect(p);
        assert.deepStrictEqual(result, a);
    });

    it('Promise Value', async () => {
        const a = [Promise.resolve(1),2,3,4,5];
        const p = F.peek(e=> Promise.resolve(e + 1), a)
        const result = await F.collect(p);

        assert.deepStrictEqual(result, a);
    });
});