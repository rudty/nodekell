"use strict";
const F = require("../index");
const assert = require("assert");

describe('test sort2', () => {
    const asc = (a, b) => a - b;

    // it('number array', async () => {
    //     const a = [4, 3, 2, 5, 2, 7, 3, 4, 6, 8, 0, 1, 6, 4, 3, 7, 21, 12, 13, 19, 32, 39, 31, 17, 19, 18];

    //     const r0 = await F.sortBy2((a,b) =>{
    //     return a - b
    //     },  a);
    //     // const r1 = F.sortBy2(e => e)(a);
        
    //     console.log(r0);
    //     // assert.deepStrictEqual(
    //     //     await F.collect(r0),
    //     //     [0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 12, 13, 17, 18, 19, 19, 21, 31, 32, 39],
    //     // );
    //     // assert.deepStrictEqual(
    //     //     await F.collect(r1),
    //     //     [39, 32, 31, 21, 19, 19, 18, 17, 13, 12, 8, 7, 7, 6, 6, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1, 0],
    //     // );
    // });

    it('random value sort', async () => {
        const a = await F.run(
            F.repeat(1000, () => F.random(9999)),
            F.collect);

        const r0 = Array.from(a).sort(asc);
        const r1 = await F.sortBy2(asc, a);
        assert.deepStrictEqual(r0, r1);
    });

    it('random value insert sort', async () => {
        const a = await F.run(
            F.repeat(1000, () => F.random(9999)),
            F.collect);

        const r0 = Array.from(a).sort(asc);
        const r1 = await F.sortBy2(asc, a);
        assert.deepStrictEqual(r0, r1);
    });

    it('reverse array sort', async () => {
        const a = await F.run(
            F.repeat(300, () => F.random(9999)),
            F.reverse,
            F.collect);

        const r0 = Array.from(a).sort(asc);
        const r1 = await F.sortBy2(asc, a);
        assert.deepStrictEqual(r0, r1);
    });

    it('binSearch', async () => {
        const a = [9,11,13,15,17];
        const r0 = await F._binarySearchIndex(F.asc, a, 0, 0, 4);
        assert.deepStrictEqual(r0, 0);
        const r1 = await F._binarySearchIndex(F.asc, a, 8, 0, 4);
        assert.deepStrictEqual(r1, 0);
        const r2 = await F._binarySearchIndex(F.asc, a, 10, 0, 4);
        assert.deepStrictEqual(r2, 1);
        const r3 = await F._binarySearchIndex(F.asc, a, 12, 0, 4);
        assert.deepStrictEqual(r3, 2);
        const r4 = await F._binarySearchIndex(F.asc, a, 14, 0, 4);
        assert.deepStrictEqual(r4, 3);
        const r5 = await F._binarySearchIndex(F.asc, a, 16, 0, 4);
        assert.deepStrictEqual(r5, 4);
        const r6 = await F._binarySearchIndex(F.asc, a, 20, 0, 4);
        assert.deepStrictEqual(r6, 5);
    });


});