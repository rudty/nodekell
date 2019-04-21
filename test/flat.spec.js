"use strict";
const F = require("../index");
const assert = require("assert");

describe('test flat', () => {
    it('array', async () => {
        const a = [[[1]],[2],3,4,5];
        const r = F.flat(a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [[1],2,3,4,5]);
    });

    it('promise value', async () => {
        const a = [[[Promise.resolve(1)]],Promise.resolve([2]),Promise.resolve(3),4,5];
        const r = F.flat(a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [[Promise.resolve(1)],2,3,4,5]);
    });

    it('async func', async () => {
        const a = [[1],[2],3,4,5];
        const r = F.fmap(async e => Promise.resolve(e), a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [1,2,3,4,5]);
    });

    it('with run', async () => {
        const a = [[1],[2],[3],[4],[5]];
        const result = await F.run(a,
            F.filter(e => e[0] > 1), //[2][3][4][5]
            F.flat, 
            F.collect);
        assert.deepStrictEqual(result, [2,3,4,5]);
    });
});