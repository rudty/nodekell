"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test mostFrequency', () => {
    it('0', async () => {
        const r = await F.mostFrequency([]);
        assert.strictEqual(r, undefined);
    });

    it('array', async () => {
        const r = await F.mostFrequency([1,2,3,4,5,1]);
        assert.deepEqual(1, r);
    });

    it('array2', async () => {
        const r = await F.mostFrequency([1,1,2,2,3,4,5]);
        assert.deepEqual(1, r);
    });

    it('array3', async () => {
        const r = await F.mostFrequency([1,2,2,3,4,5]);
        assert.deepEqual(2, r);
    });

    it('array + promise', async () => {
        const r = await F.mostFrequency([1,2,Promise.resolve(2),3,4,5]);
        assert.deepEqual(2, r);
    });

    it('iter', async () => {
        const r = await F.mostFrequency((function*(){
            yield* [1,2,3,4,5,1];
        })());
        assert.deepEqual(1, r);
    });

    it('async iter', async () => {
        const r = await F.mostFrequency((async function*(){
            yield* [1, Promise.resolve(2),3,4,5, Promise.resolve(2)];
        })());
        assert.deepEqual(2, r);
    });
});