"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test removeFirst', () => {
    it('value last', async () => {
        const r = await F.run(
            F.removeFirst(3, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [1,2]);
    });

    it('value first', async () => {
        const r = await F.run(
            F.removeFirst(1, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [2,3]);
    });

    it('value not found', async () => {
        const r = await F.run(
            F.removeFirst(99, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [1,2,3]);
    });

    it('value match at least 2', async () => {
        const r = await F.run(
            F.removeFirst(1, [1,1,1,1]),
            F.collect);
        assert.deepStrictEqual(r, [1,1,1]);
    });

    it('function last', async () => {
        const r = await F.run(
            F.removeFirst((e) => e === 3, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [1,2]);
    });

    it('function first', async () => {
        const r = await F.run(
            F.removeFirst((e) => e === 1, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [2,3]);
    });

    it('function not found', async () => {
        const r = await F.run(
            F.removeFirst((e) => e === 99, [1,2,3]),
            F.collect);
        assert.deepStrictEqual(r, [1,2,3]);
    });

    it('currying', async () => {
        const r = await F.run([1,2,3],
            F.removeFirst((e) => e === 99),
            F.collect);
        assert.deepStrictEqual(r, [1,2,3]);
    });

    it('function match at least 2', async () => {
        const r = await F.run(
            F.removeFirst((e) => e === 1, [1,1,1,1]),
            F.collect);
        assert.deepStrictEqual(r, [1,1,1]);
    });
});