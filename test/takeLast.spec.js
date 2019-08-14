"use strict";
const F = require("../index");
const assert = require("assert");

describe('test take', () => {
    it('<', async () => {
        const a = [1,2,3,4,5];
        const r = F.takeLast(1, a);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [5]);
    });

    it('==', async () => {
        const a = [1,2,3,4,5];
        const r = F.takeLast(5, a);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [1,2,3,4,5]);
    });

    it('>', async () => {
        const a = [1,2,3,4,5];
        const r = F.takeLast(9999999, a);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [1,2,3,4,5]);
    });

    it('0', async () => {
        const a = [1,2,3,4,5];
        const r = F.takeLast(0, a);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, []);
    });

    it('-1', async () => {
        const a = [1,2,3,4,5];
        const r = F.takeLast(-1, a);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, []);
    });
});