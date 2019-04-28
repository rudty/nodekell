"use strict";
const F = require("../index");
const assert = require("assert");

describe('test pipe', () => {
    it('default', async () => {
        const c = F.compose(
            F.map(e => e + 1),
            F.filter(e => e % 2 == 0),
            F.collect);
        // assert.deepStrictEqual(await F.collect(c), [1,2,3,4,5,6]);
        console.log(await c([1,2,3,4,5]))
    });
});