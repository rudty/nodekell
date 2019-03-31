"use strict";
const F = require("../index");
const assert = require("assert");

describe('test emptyThen', () => {
    it('new array', async () => {
        const v = await F.run(F.range(Infinity),
            F.take(0),
            F.emptyThen([1,2,3,4,5]),
            F.map(e => e + 1),
            F.collect);
        assert.deepStrictEqual(v, [2,3,4,5,6]);
    });

    it('fn array', async () => {
        const v = await F.run(F.range(Infinity),
            F.take(0),
            F.emptyThen(()=> { return [1,2,3] }),
            F.map(e => e + 1),
            F.collect);

        assert.deepStrictEqual(v, [2,3,4]);
    });

    it('fn array Promise', async () => {
        const v = await F.run(F.range(Infinity),
            F.take(0),
            F.emptyThen(() => { return Promise.resolve([1,2,3]); }),
            F.map(e => e + 1),
            F.collect);
        assert.deepStrictEqual(v, [2,3,4]);
    });

    it('no empty', async () => {
        const v = await F.run(F.range(Infinity),
            F.take(3),
            F.emptyThen(() => { return Promise.resolve([1,2,3]); }),
            F.map(e => e + 1),
            F.collect);
        assert.deepStrictEqual(v, [1,2,3]);
        // const r = F.emptyThen(3, [1,2,3]);
    
    });
});