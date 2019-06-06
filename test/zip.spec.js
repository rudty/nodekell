"use strict";
const F = require("../index");
const assert = require("assert");

describe('test zip', () => {
    it('array', async () => {
        const a = [1,2,3];
        const b = [4,5,6];
        const r = F.zip(a,b);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [[1,4],[2,5],[3,6]]);
    });
});
