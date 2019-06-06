"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test map', () => {
    it('array', async () => {
        const a = [1,2,3,4,5];
        const mapped = F.map(e=> e + 1, a)
        const result = []
        for await (const e of mapped) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [2,3,4,5,6]);
    });

    it('Promise Value', async () => {
        const a = [Promise.resolve(1),2,3,4,5];
        const mapped = F.map(e=> Promise.resolve(e + 1), a)
        const result = []
        for await (const e of mapped) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [2,3,4,5,6]);
    });

    it('Promise Value async mapper', async () => {
        const a = [Promise.resolve(1),2,3,4,5];
        const mapped = F.map(async e => e + 1, a)
        const result = []
        for await (const e of mapped) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [2,3,4,5,6]);
    });

    it('generator', async () => {
        const a = (function*(){
               for (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();
        const mapped = F.map(e=> Promise.resolve(e + 1), a)
        const result = []
        for await (const e of mapped) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [2,3,4,5,6]);
    });

    it('async generator', async () => {
        const a = (async function*(){
               for await (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();
        const mapped = F.map(e=> Promise.resolve(e + 1), a)
        const result = []
        for await (const e of mapped) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [2,3,4,5,6]);
    });
});