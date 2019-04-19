"use strict";
const F = require("../index");
const assert = require("assert");

describe('test pfilter', () => {
    it('array fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = [1,2,3,4,5];
        const filtered = F.pfilter(e=> e % 2 == 0, a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepEqual(result, [2,4]);
    });

    it('Promise Value fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = [Promise.resolve(1),2,3,4,5];
        const filtered = F.pfilter(e=> Promise.resolve(e % 2 == 0), a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepEqual(result, [2,4]);
    });

    it('generator fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = (function*(){
               for (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();
        const filtered = F.pfilter(e=> Promise.resolve(e % 2 == 0), a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepEqual(result, [2,4]);
    });

    it('async generator fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = (async function*(){
               for await (const e of [Promise.resolve(1),2,3,4,5]){
                   yield e;
               }
        })();
        const filtered = F.pfilter(e=> Promise.resolve(e % 2 == 0), a)
        const result = await F.collect(filtered);
        assert.deepEqual(result, [2,4]);
    });

    it('async generator fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = (async function*(){
               for await (const e of [Promise.resolve(1),2,3,4,5]){
                   yield e;
               }
        })();
        const filtered = F.pfilter(e=> Promise.resolve(e % 2 == 0), a)
        const result = await F.collect(filtered);
        assert.deepEqual(result, [2,4]);
    });

    it('with run fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const v = await F.run(
            F.range(Infinity),
            F.pfilter(async e =>{
                // console.log(e);
                return e % 2 === 0;
            }),
            F.take(2),
            F.collect);
        // console.log(v);
        assert.deepStrictEqual(v, [0,2]);
    });

    it('array fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = [1,2,3,4,5];
        const filtered = F.pfilter(e=> e % 2 == 0, a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepEqual(result, [2,4]);
    });

    it('Promise Value fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = [Promise.resolve(1),2,3,4,5];
        const filtered = F.pfilter(e=> Promise.resolve(e % 2 == 0), a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepEqual(result, [2,4]);
    });

    it('generator fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = (function*(){
               for (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();
        const filtered = F.pfilter(e=> Promise.resolve(e % 2 == 0), a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepEqual(result, [2,4]);
    });

    it('async generator fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = (async function*(){
               for await (const e of [Promise.resolve(1),2,3,4,5]){
                   yield e;
               }
        })();
        const filtered = F.pfilter(e=> Promise.resolve(e % 2 == 0), a)
        const result = await F.collect(filtered);
        assert.deepEqual(result, [2,4]);
    });

    it('async generator fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = (async function*(){
               for await (const e of [Promise.resolve(1),2,3,4,5]){
                   yield e;
               }
        })();
        const filtered = F.pfilter(e=> Promise.resolve(e % 2 == 0), a)
        const result = await F.collect(filtered);
        assert.deepEqual(result, [2,4]);
    });

    it('with run fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const v = await F.run(
            F.range(Infinity),
            F.pfilter(async e =>{
                // console.log(e);
                return e % 2 === 0;
            }),
            F.take(2),
            F.collect);
        // console.log(v);
        assert.deepStrictEqual(v, [0,2]);
    });
});