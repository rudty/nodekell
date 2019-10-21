"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test insertAt', () => {
    it('insert 0', async () => {
        const arr = [1,2,3,4,5];
        const r0 = await F.collect(
            F.insertAt(6, 0, arr),
        );
        assert.deepStrictEqual(r0, [6,1,2,3,4,5]);
    });

    it('insert 1', async () => {
        const arr = [1,2,3,4,5];
        const r0 = await F.collect(
            F.insertAt(6, 1, arr),
        );
        assert.deepStrictEqual(r0, [1,6,2,3,4,5]);
    });

    it('insert 5(last)', async () => {
        const arr = [1,2,3,4,5];
        const r0 = await F.collect(
            F.insertAt(6, 5, arr),
        );
        assert.deepStrictEqual(r0, [1,2,3,4,5,6]);
    });

    it('insert infinity', async () => {
        const arr = [1,2,3,4,5];
        const r0 = await F.collect(
            F.insertAt(6, Infinity, arr),
        );
        assert.deepStrictEqual(r0, [1,2,3,4,5,6]);
    });
});