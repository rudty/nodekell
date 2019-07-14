"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test mostFrequencyBy', () => {
    it('0', async () => {
        const r = await F.mostFrequencyBy(F.identity, []);
        assert.strictEqual(r, undefined);
    });

    it('array', async () => {
        const r = await F.mostFrequencyBy(F.identity, [1,2,3,4,5,1]);
        assert.deepEqual(1, r);
    });

    it('array2', async () => {
        const r = await F.mostFrequencyBy(F.identity, [1,1,2,2,3,4,5]);
        assert.deepEqual(1, r);
    });

    it('array3', async () => {
        const r = await F.mostFrequencyBy(F.identity, [1,2,2,3,4,5]);
        assert.deepEqual(2, r);
    });


    it('array4', async () => {
        const r = await F.mostFrequencyBy(F.identity, [1,2,2,3,4,5,5,5]);
        assert.deepEqual(5, r);
    });

    it('array + promise', async () => {
        const r = await F.mostFrequencyBy(F.identity, [1,2,Promise.resolve(2),3,4,5]);
        assert.deepEqual(2, r);
    });

    it('object array', async () => {
        const r = await F.mostFrequencyBy(e => e.a, [{a:1},{a:2},{a:3},{a:4},{a:5},{a:1}]);
        assert.deepEqual({a:1}, r);
    });

    it('iter', async () => {
        const r = await F.mostFrequencyBy(F.identity, (function*(){
            yield* [1,2,3,4,5,1];
        })());
        assert.deepEqual(1, r);
    });

    it('async iter', async () => {
        const r = await F.mostFrequencyBy(F.identity, (async function*(){
            yield* [1, Promise.resolve(2),3,4,5, Promise.resolve(2)];
        })());
        assert.deepEqual(2, r);
    });
});