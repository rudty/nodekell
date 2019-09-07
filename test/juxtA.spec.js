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

    it('maxmin2', async () => {
        const a = await F.juxtA(
            [Math.max, Math.min],
            [5,4,3,2,1]);
         assert.deepStrictEqual(a,[5,1]);
     });

    it('maxmin promise fun', async () => {
        const a = await F.juxtA(
            [Promise.resolve(Math.max), 
                Promise.resolve(Math.min)],
            [1,2,3,4,5]);
         assert.deepStrictEqual(a,[5,1]);
     });

     it('maxmin promise fun async gen', async () => {
        const a = await F.juxtA(
            [Promise.resolve(Math.max), 
                Promise.resolve(Math.min)],
            (async function*(){
                yield 1;
                yield 2;
                yield 3;
                yield 4;
                yield 5;
            })());
         assert.deepStrictEqual(a,[5,1]);
     });

     it('max min sum', async () => {
        const a = await F.juxtA(
            [Math.max, Math.min, (acc, e) => acc + e],
            [1,2,3,4,5]);
         assert.deepStrictEqual(a,[5,1,15]);
     });

     it("t0", async () => {
        const add = (a,b) => a.toString() + b.toString();
        const arr = [1,
            Promise.resolve(2),
            'c',
            Promise.resolve(4),
            Promise.resolve(5)];

        const r0 = F.juxtA([add])(arr); // $ExpectType Promise<(string | number)[]>
        console.log(await r0);
     });

});