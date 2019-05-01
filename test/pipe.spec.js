"use strict";
const F = require("../index");
const assert = require("assert");

describe('test pipe', () => {
    it('default', async () => {
        const c = F.pipe(
            F.map(e => e + 1),
            F.filter(e => e % 2 == 0),
            F.collect);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
    });

    it('return undefined', async () => {
        const c = F.pipe(
            F.map(e => e + 1),
            F.filter(e => e % 2 == 0),
            ()=>{});


        assert.strictEqual(await c([0]), undefined);
        assert.strictEqual(await c([1]), undefined);
        assert.strictEqual(await c([0,1]), undefined);
    });

    it('return promise value', async () => {
        const c = F.pipe(
            F.reduce((acc,e) => acc + e));
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
    });

    
    it('return value', async () => {
        const c = F.pipe(
            (iter) => iter.reduce((acc,e) => acc + e));
            
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
    });

    it('async iterable', async() => {
        let r = F.pipe(
            F.map(e => e + 1), // a = [2,3,4,5,6]
            F.filter(e => e < 4), // a = [2,3]
            F.take(Infinity));
          
        let a = [1,2,3,4,5];
        for await (const _ of r(a)){
            //async iterable
        }
    });

    it('array', async() => {
        let r = F.pipe(
            F.map(e => e + 1), // a = [2,3,4,5,6]
            F.filter(e => e < 4), // a = [2,3]
            F.take(Infinity),
            F.collect);
          
        let a = [1,2,3,4,5];
        assert.deepStrictEqual(await r(a), [2,3]);
        // console.log(await r(a));
    });
});