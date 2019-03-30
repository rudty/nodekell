"use strict";
const F = require("../index");
const assert = require("assert");

describe('test collectMap', () => {
    it('default', async () => {
        const a = [[1,2],[3,4]];
        const m = await F.collectMap(a);
        assert.deepEqual(m, new Map([[1,2],[3,4]]));
    });

    it('async', async () => {
        const a = F.seq([[1,2],[3,4]]);
        const m = await F.collectMap(a);
        assert.deepEqual(m, new Map([[1,2],[3,4]]));
    });

    it('zip_tail_and_map', async () => {
        const m = await F.run(F.range(Infinity),
            F.zip(["a", "b", "c"]),
            F.tail,
            F.map(e => [e[0], e[1] + 1]),
            F.collectMap);
        assert.deepEqual(m, new Map([["b",2],["c",3]]));
    });

    it('fail1', async () => {
        try{
            await F.collectMap([1,2]);
            assert.fail("fail map");
        }
        catch(e){
        }
    });

    it('fail2', async () => {
        try{
            await F.collectMap(["ab","cd"]);
            assert.fail("fail map");
        }
        catch(e){
        }
    });

});