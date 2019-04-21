"use strict";
const F = require("../index");
const assert = require("assert");

describe('test pfmap', () => {
    it('array fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = [[1],[2],[3],[4],[5]];
        const m = F.pfmap(e => {
            // e.push(1);
            return e;
        },a);
        const result = await F.collect(m);
        assert.deepEqual(result, [1,2,3,4,5]);
    });
    it('array fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = [[1],[2],[3],[4],[5]];
        const m = F.pfmap(e => {
            // e.push(1);
            return e;
        },a);
        const result = await F.collect(m);
        assert.deepEqual(result, [1,2,3,4,5]);
    });

    it('array append fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = [[1],[2],[3],[4],[5]];
        const m = F.pfmap(e => {
            e.push(1);
            return e;
        },a);
        const result = await F.collect(m);
        assert.deepEqual(result, [1,1,2,1,3,1,4,1,5,1]);
    });

    it('array append fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = [[1],[2],[3],[4],[5]];
        const m = F.pfmap(e => {
            e.push(1);
            return e;
        },a);
        const result = await F.collect(m);
        assert.deepEqual(result, [1,1,2,1,3,1,4,1,5,1]);
    });

    it('array and num: not support', async () => {
        
        const a = [[[1]],[2],[3],[4],5];
        const r = F.pfmap(e => e, a);
        try{
            const result = await F.collect(r);
            assert.fail("not support");
        }catch{
        }
    });
    it('promise value 999 ', async () => {
        F.parallel_set_fetch_count(999);
        const a = [[[Promise.resolve(1)]],Promise.resolve([2]),[Promise.resolve(3)],[4],[5]];
        const r = F.pfmap(e => e, a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [[Promise.resolve(1)],2,3,4,5]);
    });

    it('promise value 1 ', async () => {
        F.parallel_set_fetch_count(1);
        const a = [[[Promise.resolve(1)]],Promise.resolve([2]),[Promise.resolve(3)],[4],[5]];
        const r = F.pfmap(e => e, a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [[Promise.resolve(1)],2,3,4,5]);
    });


    it('async func 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = [[1],[2],[3],[4],[5]];
        const r = F.pfmap(async e => e, a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,2,3,4,5]);
    });

    it('async func 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = [[1],[2],[3],[4],[5]];
        const r = F.pfmap(async e => e, a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,2,3,4,5]);
    });

    it('async2 func 999', async () => {
        F.parallel_set_fetch_count(999);
        const a = [[1],[2],[3],[4],[5]];
        const r = F.pfmap(async e => Promise.resolve(e), a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,2,3,4,5]);
    });

    it('async2 func 1', async () => {
        F.parallel_set_fetch_count(1);
        const a = [[1],[2],[3],[4],[5]];
        const r = F.pfmap(async e => Promise.resolve(e), a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,2,3,4,5]);
    });

    it('with run', async () => {
        F.parallel_set_fetch_count(100);
        const a = [[1],[2],[3],[4],[5]];
        const result = await F.run(a,
            F.filter(e => e[0] > 1), //[2][3][4][5]
            F.pfmap(e => e), 
            F.collect);
        assert.deepStrictEqual(result, [2,3,4,5]);
    });

    it('with run2', async()=>{
        F.parallel_set_fetch_count(100);
        const v = await F.run(
            F.range(Infinity),  //0,1,2,...
            F.map(e=> [e]),     //[0],[1],[2]...
            F.pfmap(async e =>{
                // console.log(e); //print [0] ...
                e.push(42);     // [0,42],[1,42],[2,42]... 
                return e ;
            }),
            F.take(5),          //[0,42,1,42,2]
            F.collect);         //iterator to array
        assert.deepStrictEqual(v, [0,42,1,42,2]);
        // console.log(v);
    });
});