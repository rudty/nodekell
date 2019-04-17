"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test pmap', () => {
    it('use generator', async () => {
        const r = F.pmap(e=>e+1, [1,2,3,4,5]);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[2,3,4,5,6]);
    });
    it('use async generator', async () => {
        const r = F.pmap(e=>e+1, F.seq([1,2,3,4,5]));
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[2,3,4,5,6]);
    });  

    it('array', async () => {
        const a = [1,2,3,4,5];
        const mapped = F.pmap(e=> e + 1, a)
        const result = []
        for await (const e of mapped) {
           result.push(e); 
        }
        assert.deepEqual(result, [2,3,4,5,6]);
    });

    it('Promise Value', async () => {
        const a = [Promise.resolve(1),2,3,4,5];
        const mapped = F.pmap(e=> Promise.resolve(e + 1), a)
        const result = await F.collect(mapped);
        assert.deepEqual(result, [2,3,4,5,6]);
    });

    it('generator', async () => {
        const a = (function*(){
               for (const e of [Promise.resolve(1),2,3,4,5]){
                   yield e;
               }
        })();
        const mapped = F.pmap(e=> Promise.resolve(e + 1), a)
        const result = await F.collect(mapped);
        assert.deepEqual(result, [2,3,4,5,6]);
    });

});