"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test fmap', () => {
    it('array', async () => {
        const a = [[[1]],[2],3,4,5];
        const r = F.fmap(e => e, a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepEqual(result, [[1],2,3,4,5]);
    });

    it('promise value', async () => {
        const a = [[[Promise.resolve(1)]],Promise.resolve([2]),Promise.resolve(3),4,5];
        const r = F.fmap(e => e, a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepEqual(result, [[Promise.resolve(1)],2,3,4,5]);
    });

    it('async func', async () => {
        const a = [[1],[2],3,4,5];
        const r = F.fmap(async e => Promise.resolve(e), a);
        const result = []
        for await (const e of r) {
           result.push(e); 
        }
        assert.deepEqual(result, [1,2,3,4,5]);
    });
});