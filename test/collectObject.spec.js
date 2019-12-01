"use strict";
const F = require("../index");
const assert = require("assert");

describe('test collectObject', () => {
    it('default', async () => {
        const a = [[1,2],[3,4]];
        const m = await F.collectObject(a);
        assert.deepStrictEqual(m, {1:2,3:4});
    });

    it('async', async () => {
        const a = F.seq([[1,2],[3,4]]);
        const m = await F.collectObject(a);
        assert.deepStrictEqual(m, {1:2,3:4});
    });

    it('zip_tail_and_map', async () => {
        const m = await F.run(F.range(Infinity),
            F.zip(["a", "b", "c"]),
            F.tail,
            F.map(e => [e[0], e[1] + 1]),
            F.collectObject);
        assert.deepStrictEqual(m, {"b":2,"c":3});
    });

    it('string', async () => {
        const a = ["ab","cd"];
        const m = await F.collectObject(a);
        assert.deepStrictEqual(m, {a:"b",c:"d"});
    });

    it('fail1', async () => {
        try{
            await F.collectObject([1,2]);
            assert.fail("fail object");
        }
        catch(e){
            if (e instanceof assert.AssertionError) {
                throw e;
            }
        }
    });

    it('fail2', async () => {
        try{
            await F.collectObject(["abc","cdc"]);
            assert.fail("fail object");
        }
        catch(e){
            if (e instanceof assert.AssertionError) {
                throw e;
            }
        }
    });
});