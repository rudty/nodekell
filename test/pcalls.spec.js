"use strict";
const F = require("../index");
const assert = require("assert");

describe('test pcalls', () => {
    const fn1 = () => {
        return 1;
    };
    const fn2 = () => {
        return Promise.resolve(2);
    };
    const fn3 = async () => {
        return 3;
    };
    const fn4 = async () => {
        return Promise.resolve(4);
    };
    const gfn1 = async function* () {
        yield _ => 1;
        yield _ => 2;
        yield _ => 3;
        yield _ => 4;
    };
    const gfn2 = async function* () {
        yield _ => Promise.resolve(1);
        yield _ => 2;
        yield async _ => await Promise.resolve(3);
        yield async _ => await 4;
    };
    
    it('vaarg fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const c = F.pcalls(fn1, fn2, fn3, fn4);
        const r = await F.collect(c);
        assert.deepStrictEqual(r, [1,2,3,4]);
    });

    it('vaarg fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const c = F.pcalls(fn1, fn2, fn3, fn4);
        const r = await F.collect(c);
        assert.deepStrictEqual(r, [1,2,3,4]);
    });

    it('arr fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const c = F.pcalls([fn1, fn2, fn3, fn4]);
        const r = await F.collect(c);
        assert.deepStrictEqual(r, [1,2,3,4]);
    });

    it('arr fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const c = F.pcalls([fn1, fn2, fn3, fn4]);
        const r = await F.collect(c);
        assert.deepStrictEqual(r, [1,2,3,4]);
    });

    it('iter fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const c = F.pcalls(gfn1());
        const r = await F.collect(c);
        assert.deepStrictEqual(r, [1,2,3,4]);
    });

    it('iter fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const c = F.pcalls(gfn1());
        const r = await F.collect(c);
        assert.deepStrictEqual(r, [1,2,3,4]);
    });

    it('iter2 fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const c = F.pcalls(gfn2());
        const r = await F.collect(c);
        assert.deepStrictEqual(r, [1,2,3,4]);
    });

    it('iter2 fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const c = F.pcalls(gfn2());
        const r = await F.collect(c);
        assert.deepStrictEqual(r, [1,2,3,4]);
    });

    it('iter_iter fetch 999', async () => {
        F.parallel_set_fetch_count(999);
        const c = F.pcalls(gfn1(), gfn2());
        try{
            const r = await F.collect(c);
            assert.fail("support just one")
        }catch{

        }
    });

    it('iter_iter fetch 1', async () => {
        F.parallel_set_fetch_count(1);
        const c = F.pcalls(gfn1(), gfn2());
        try{
            const r = await F.collect(c);
            assert.fail("support just one")
        }catch{

        }
    });
});