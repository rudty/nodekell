"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test tap', () => {
    it('fn', async () => {
        const v = await F.tap(async (e) => {
            await F.sleep(1);
            e.push(4);
        }, [1,2,3]);
        assert.deepStrictEqual(v,[1,2,3,4]);
    });

    it('async fn', async () => {
        const v = await F.run([1,2,3,4,5],
            F.map(e => e + 1),
            F.tap(async iter => {
                return iter;
            }),
            F.collect);
        assert.deepStrictEqual(v,[2,3,4,5,6]);
    });

    it('async gen', async () => {
        const v = await F.run([1,2,3,4,5],
            F.map(e => e + 1),
            F.tap(async function*(iter) {
                for await(const e of iter) {
                    yield e + 10; // not work
                }
            }),
            F.collect);
        assert.deepStrictEqual(v,[2,3,4,5,6]);
    });

    it('async concat', async () => {
        const v = await F.run([1,2,3,4,5],
            F.map(e => e + 1),
            F.tap(async function*(iter) {
                yield* iter;
                yield 3;
                //not work
            }),
            F.collect);
        assert.deepStrictEqual(v,[2,3,4,5,6]);
    });

    it('void', async () => {
        const v = await F.run([1,2,3,4,5],
            F.tap(() => {}),
            F.collect);
        assert.deepStrictEqual(v,[1,2,3,4,5]);
    });
});