"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test then', () => {
    it('fn', async () => {
        const v = await F.run([1,2,3,4,5],
            F.map(e => e + 1),
            F.then(iter => {
                return iter;
            }),
            F.collect);
        assert.deepStrictEqual(v,[2,3,4,5,6]);
    });

    it('async fn', async () => {
        const v = await F.run([1,2,3,4,5],
            F.map(e => e + 1),
            F.then(async iter => {
                return iter;
            }),
            F.collect);
        assert.deepStrictEqual(v,[2,3,4,5,6]);
    });

    it('async gen', async () => {
        const v = await F.run([1,2,3,4,5],
            F.map(e => e + 1),
            F.then(async function*(iter) {
                for await(const e of iter) {
                    yield e;
                }
            }),
            F.collect);
        assert.deepStrictEqual(v,[2,3,4,5,6]);
    });

    it('async concat', async () => {
        const v = await F.run([1,2,3,4,5],
            F.map(e => e + 1),
            F.then(async function*(iter) {
                yield* iter;
                yield 3;
            }),
            F.collect);
        assert.deepStrictEqual(v,[2,3,4,5,6,3]);
    });
});