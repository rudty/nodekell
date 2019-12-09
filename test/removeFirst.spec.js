"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test removeFirst', () => {
    it('test', async () => {
        const r = await F.run(
            F.removeFirst(3, [1,2,3]),
            F.collect);
console.log(r);
        // console.log(await F.removeFirst(3, [1,2,3]).next())
        
    });
});