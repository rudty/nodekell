"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test pmap', () => {
    it('use generator 999', async () => {
        F.parallel_set_fetch_count(999);
        const r = F.pmap(e=>e+1, [1,2,3,4,5]);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[2,3,4,5,6]);
    });
    it('use async generator fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const r = F.pmap(e=>e+1, F.seq([1,2,3,4,5]));
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[2,3,4,5,6]);
    });  

    it('array fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = [1,2,3,4,5];
        const mapped = F.pmap(e=> e + 1, a)
        const result = []
        for await (const e of mapped) {
           result.push(e); 
        }
        assert.deepEqual(result, [2,3,4,5,6]);
    });

    it('Promise Value fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = [Promise.resolve(1),2,3,4,5];
        const mapped = F.pmap(e=> Promise.resolve(e + 1), a)
        const result = await F.collect(mapped);
        assert.deepEqual(result, [2,3,4,5,6]);
    });

    it('generator fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = (function*(){
               for (const e of [Promise.resolve(1),2,3,4,5]){
                   yield e;
               }
        })();
        const mapped = F.pmap(async e=> Promise.resolve(e + 1), a)
        const result = await F.collect(mapped);
        assert.deepEqual(result, [2,3,4,5,6]);
    });

    it('custom object fetch 999', async () => {
        F.parallel_set_fetch_count(999);
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

    it('with run fetch 999', async () => {
        F.parallel_set_fetch_count(999);
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

    it('use generator fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const r = F.pmap(e=>e+1, [1,2,3,4,5]);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[2,3,4,5,6]);
    });
    it('use async generator fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const r = F.pmap(e=>e+1, F.seq([1,2,3,4,5]));
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[2,3,4,5,6]);
    });  

    it('array fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = [1,2,3,4,5];
        const mapped = F.pmap(e=> e + 1, a)
        const result = []
        for await (const e of mapped) {
           result.push(e); 
        }
        assert.deepEqual(result, [2,3,4,5,6]);
    });

    it('Promise Value fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = [Promise.resolve(1),2,3,4,5];
        const mapped = F.pmap(e=> Promise.resolve(e + 1), a)
        const result = await F.collect(mapped);
        assert.deepEqual(result, [2,3,4,5,6]);
    });

    it('generator fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = (function*(){
               for (const e of [Promise.resolve(1),2,3,4,5]){
                   yield e;
               }
        })();
        const mapped = F.pmap(async e=> Promise.resolve(e + 1), a)
        const result = await F.collect(mapped);
        assert.deepEqual(result, [2,3,4,5,6]);
    });

    it('custom object fetch 1', async () => {
        F.parallel_set_fetch_count(1);
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

    it('with run fetch 1', async () => {
        F.parallel_set_fetch_count(1);
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