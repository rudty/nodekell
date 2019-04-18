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
        const mapped = F.pmap(async e=> Promise.resolve(e + 1), a)
        const result = await F.collect(mapped);
        assert.deepEqual(result, [2,3,4,5,6]);
    });

    it('custom object', async () => {
        const it = new Object();
        it[Symbol.asyncIterator] = async function* (){
            yield 1;
            yield 1;
            yield 1;
        };

        const mapped = F.pmap(e=> Promise.resolve(e + 1), it)
        const r = await F.collect(mapped);
        assert.deepEqual(r, [2,2,2]);
    });

    it('with run', async () => {
        const v = await F.run(
            F.range(Infinity),
            F.pmap(async e =>{
                // console.log(e);
                return e + 1;
            }),
            F.take(2),
            F.collect);
        // console.log(v);
        assert.deepStrictEqual(v, [1,2]);
    });
});