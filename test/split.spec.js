"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test split', () => {

    it("for", async() => {
        const helloWorld = "hello world";
        const r = await F.splitBy(e=>e.split(" "), helloWorld);
        assert.deepStrictEqual(await F.collect(r), ["hello", "world"]);
    })

    it('helloworld', async () => {
        const helloWorld = await F.collect(
            await F.splitBy(
            e=>e.split(" "), 
            "hello world")
        );
        assert.deepStrictEqual(helloWorld, ["hello", "world"]);
    });

    it('gen', async () => {
        const gen = await F.collect(
            await F.splitBy(function*() {
                yield 1;
                yield 2;
                yield 3;
                yield 4;
                yield 5;
            }, null)
        );
        assert.deepStrictEqual(gen, [1,2,3,4,5]);
    });

    it('str', async () => {
        const r = await F.run(
            "1,2,3,4,5",
            F.splitBy(e => e.split(",")),
            F.map(parseInt),
            F.sum);
        
        assert.strictEqual(r, 15);
    });


    it('int array', async () => {
        const r = await F.run(
            [1,2,3,4,5],
            F.splitBy(e => [e, e]),
            F.collect);
        assert.deepStrictEqual(r, [[1,2,3,4,5],[1,2,3,4,5]]);
    });
});