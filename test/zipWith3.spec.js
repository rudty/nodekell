"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test zipWith3', () => {
    it('array', async () => {
        const a = [1,2,3];
        const b = [4,5,6];
        const c = [7,8,9];
        const r = F.zipWith3((f,s,t)=>f+s+t, a, b,c);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [12,15,18]);
    });
});
