"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test juxtA', () => {
    it('maxmin', async () => {
       const a = await F.juxtA(
           [Math.max, Math.min],
           [1,2,3,4,5]);
        assert.deepStrictEqual(a,[5,1]);
    });

});