"use strict";
const F = require("../index");
const assert = require("assert");

describe('test compose', () => {
    it('default', async () => {
        const c = F.compose(
            F.collect,
            F.filter(e => e % 2 == 0),
            F.map(e => e + 1));
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
        assert.deepStrictEqual(await c([1,2,3,4,5]), [2,4,6]);
    });

    it('return undefined', async () => {
        const c = F.compose(
            ()=>{},
            F.filter(e => e % 2 == 0),
            F.map(e => e + 1));


        assert.strictEqual(await c([0]), undefined);
        assert.strictEqual(await c([1]), undefined);
        assert.strictEqual(await c([0,1]), undefined);
    });

    it('return promise value', async () => {
        const c = F.compose(
            F.reduce((acc,e) => acc + e));
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
    });

    
    it('return value', async () => {
        const c = F.compose(
            (iter) => iter.reduce((acc,e) => acc + e));
            
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
        assert.strictEqual(await c([1,2,3,4,5]), 15);
    });

    it('async iterable', async() => {
        let r = F.compose(
            F.take(Infinity),
            F.filter(e => e < 4), // a = [2,3]
            F.map(e => e + 1) // a = [2,3,4,5,6]
        );
          
        let a = [1,2,3,4,5];
        for await (const _ of await r(a)) {
            //async iterable
        }
    });

    it('array', async() => {
        let r = F.compose(
            F.collect,
            F.take(Infinity),
            F.filter(e => e < 4), // a = [2,3]
            F.map(e => e + 1) // a = [2,3,4,5,6]
        );
          
        let a = [1,2,3,4,5];
        assert.deepStrictEqual(await r(a), [2,3]);
        assert.deepStrictEqual(await r(a), [2,3]);
        assert.deepStrictEqual(await r(a), [2,3]);
    });

    it('double', async () => {
        const double1 = F.compose(F.collect, F.map((e) => e + e));
        const double2 = F.compose((t) => t.map(e => e + e));
        const a = [1,2,3,4];
        const r1 = await double1(a);
        const r2 = await double2(a);
        assert.deepStrictEqual(r1, [2,4,6,8]);
        assert.deepStrictEqual(r2, [2,4,6,8]);
    });

    it('sort and reverse', async () => {
        const rs = F.compose(
            F.collect,
            F.reverse,
            e => e.sort()
        );

        const a = [1,5,4,3,2];
        assert.deepStrictEqual(await rs(a),[5,4,3,2,1]);
    });

    it('empty', async () => {
        const rs = F.compose(()=>{});
        await rs();
    });

    it('noarg', async () => {
        try{
            const rs = F.compose();
            await rs();
            assert.fail("fail noarg");
        }catch{

        }
    });

    it('call first function support multiple argument', async () => {
        const f2 = (a,b) => {
            return [a,b];
        };
        const rs = F.compose(f2);
        assert.deepStrictEqual(await rs(1,2), [1,2]);
        assert.deepStrictEqual(await rs(1,2), [1,2]);
        assert.deepStrictEqual(await rs(1,2), [1,2]);
    });

    it('not lazy', async () => {
        const p = F.compose(F.dec, F.add);
        assert.deepEqual(2, await p(1,2));
        assert.deepEqual(9, await p(2,8));
        assert.deepEqual(2, await p(1,2));
        assert.deepEqual(7, await p(3,5));
    });

    it('lazy', async () => {
        const p = F.compose(
            async (a) => {
                const v = await a;
                return v - 1;
            },
            async (a, b) => await a + b);
        assert.deepEqual(2, await p(1,2));
        assert.deepEqual(6, await p(3,4));
    });

    
    it('reduce', async() =>{
        let r = F.compose(
            F.reduce((acc,e) => acc + e),
            F.take(Infinity),
            F.filter(e => e < 4), // a = [2,3]
            F.map(e => e + 1) // a = [2,3,4,5,6]
        );
          
        let a = [1,2,3,4,5];
         assert.strictEqual(await r(a), 5);
         assert.strictEqual(await r(a), 5);
         assert.strictEqual(await r(a), 5);
         assert.strictEqual(await r(a), 5);
    });
});