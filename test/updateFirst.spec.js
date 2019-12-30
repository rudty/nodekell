"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test updateFirst', () => {
    it('value last', async () => {
        const r = await F.run(
            F.updateFirst(4, 3, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [1,2,4]);
    });

    it('value first', async () => {
        const r = await F.run(
            F.updateFirst(9, 1, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [9,2,3]);
    });

    it('value not found', async () => {
        const r = await F.run(
            F.updateFirst(1, 99, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [1,2,3]);
    });

    it('value match at least 2', async () => {
        const r = await F.run(
            F.updateFirst(0, 1, [1,1,1,1]),
            F.collect);
        assert.deepStrictEqual(r, [0,1,1,1]);
    });

    it('function last', async () => {
        const r = await F.run(
            F.updateFirst(10, (e) => e === 3, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [1,2,10]);
    });

    it('function first', async () => {
        const r = await F.run(
            F.updateFirst(99,(e) => e === 1, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [99,2,3]);
    });

    it('function not found', async () => {
        const r = await F.run(
            F.updateFirst(99,(e) => e === 99, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [1,2,3]);
    });

    it('currying', async () => {
        const r = await F.run([1,2,3],
            F.updateFirst(99,(e) => e === 99),
            F.collect);
        assert.deepStrictEqual(r, [1,2,3]);
    });

    it('function match at least 2', async () => {
        const r = await F.run(
            F.updateFirst(99,(e) => e === 1, [1,1,1,1]),
            F.collect);
        assert.deepStrictEqual(r, [99,1,1,1]);
    });

    it('function true', async () => {
        const arr = [1, 2, 3];
        const r = F.updateFirst(99,() => true)(arr);
        const r0 = await F.collect(r);
        assert.deepStrictEqual(r0, [99,2, 3]);
    });

    it('promise function true', async () => {
        const arr = [1, 2, 3];
        const r = F.updateFirst(99,Promise.resolve(() => true))(arr);
        const r0 = await F.collect(r);
        assert.deepStrictEqual(r0, [99,2, 3]);
    });

    it('promise function false', async () => {
        const arr = [1, 2, 3];
        const r = F.updateFirst(99,Promise.resolve(() => false))(arr);
        const r0 = await F.collect(r);
        assert.deepStrictEqual(r0, [1, 2, 3]);
    });

    it('promise function promise true', async () => {
        const arr = [1, 2, 3];
        const r = F.updateFirst(99, Promise.resolve(() => Promise.resolve(true)))(arr);
        const r0 = await F.collect(r);
        assert.deepStrictEqual(r0, [99, 2, 3]);
    });


    it('promise function promise false', async () => {
        const arr = [1, 2, 3];
        const r = F.updateFirst(99, Promise.resolve(() => Promise.resolve(false)))(arr);
        const r0 = await F.collect(r);
        assert.deepStrictEqual(r0, [1, 2, 3]);
    });
});