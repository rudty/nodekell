"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test mergeMap', () => {
    it('map', async () => {
        const m1 = new Map([[1,2], [3,4]]);
        const m2 = new Map([[5,6], [7,8]]);
        const o1 = {9: 10}
        console.log(await F.mergeMap(m1, m2, o1));
        // assert.deepStrictEqual(r, 7);
        // console.log(F.mergeObject(m1, m2, o1));
    });
});