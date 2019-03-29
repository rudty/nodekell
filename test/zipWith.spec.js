"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test zipWith', () => {
    it('array', async () => {
        const a = [1,2,3];
        const b = [4,5,6];
        const r = F.zipWith((f,s)=>f+s, a, b);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepEqual(result, [5,7,9]);
    });
});
