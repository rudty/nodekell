"use strict";
const F = require("../index.js");
const assert = require("assert");

describe('test filterNot', () => {
    it('array', async () => {
        const a = [1,2,3,4,5];
        const filtered = F.filterNot(e=> e % 2 == 0, a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [1,3,5]);
    });

    it('Promise Value', async () => {
        const a = [Promise.resolve(1),2,3,4,5];
        const filtered = F.filterNot(e=> Promise.resolve(e % 2 == 0), a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [1,3,5]);
    });

    it('generator', async () => {
        const a = (function*(){
               for (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();
        const filtered = F.filterNot(e=> Promise.resolve(e % 2 == 0), a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [1,3,5]);
    });

    it('async generator', async () => {
        const a = (async function*(){
               for await (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();
        const filtered = F.filterNot(e=> Promise.resolve(e % 2 == 0), a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [1,3,5]);
    });
});