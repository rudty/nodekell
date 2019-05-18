"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test zip3', () => {
    it('array', async () => {
        const a = [1,2,3];
        const b = [4,5,6];
        const c = [7,8,9];
        const r = F.zip3(a,b,c);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [[1,4,7],[2,5,8],[3,6,9]]);
    });
});
