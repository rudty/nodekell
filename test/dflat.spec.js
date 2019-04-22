"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test dflat', () => {
    it('default', async () => {
        const a = [10,9,8,7];
        const r = await F.dflat(a);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[10,9,8,7]);
    });

    it('values', async () => {
        const r = await F.dflat(1,2,3);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[1,2,3]);
    });

    it('values', async () => {
        const r = await F.dflat(1);
        const c = await F.collect(r);
        assert.deepStrictEqual(c,[1]);
    });

    it('array + values', async () => {
        const r = await F.dflat([1,2,3], 4, 5);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [1, 2, 3,4,5]);
    });

    it('array values', async () => {
        const r = await F.dflat([1],[2],[3]);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [1,2,3]);
    });

    it('inner_inner', async () => {
        const r = F.dflat([[[1],[2]]],[[3]],[4]);
        const c = await F.collect(r);
        assert.deepStrictEqual(c, [1,2,3,4]);
    });

    it('string1',async () => {
        const a = 'a';
        const v = await F.run(a, F.dflat, F.collect);
        assert.deepStrictEqual(v, ['a']);
    });
    it('string2',async () => {
        const a = 'ab';
        const v = await F.run(a, F.dflat, F.collect);
        assert.deepStrictEqual(v, ['a','b']);
    });
    it('new string1',async () => {
        const a = new String('a');
        const v = await F.run(a, F.dflat, F.collect);
        assert.deepStrictEqual(v, ['a']);
    });
    it('new string2',async () => {
        const a = new String('ab');
        const v = await F.run(a, F.dflat, F.collect);
        assert.deepStrictEqual(v, ['a','b']);
    });
});