"use strict";
const F = require("../index");
const assert = require("assert");

describe('test takeWhile', () => {
    it('<', async () => {
        const a = [1,2,3,4,5];
        const r = F.takeWhile(e => e < 2, a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1]);
    });

    it('==', async () => {
        const a = [1,2,3,4,5];
        const r = F.takeWhile(e => e <= 5, a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,2,3,4,5]);
    });


    it('>', async () => {
        const a = [1,2,3,4,5];
        const r = F.takeWhile(_ => true, a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,2,3,4,5]);
    });

    it('odd', async () => {
        const a = [1,3,5,7,9,10,12,13];
        const r = F.takeWhile(e => e % 2 == 1, a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result, [1,3,5,7,9]);
    });

    it('str', async () => {
        const a = "hello";
        const r = F.takeWhile(e => e > 'b', a);
        const result = await F.collect(r);
        assert.deepStrictEqual(result.join(''), "hello");
    });
});