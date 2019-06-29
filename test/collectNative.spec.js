"use strict";
const F = require("../index.js");
const assert = require("assert");
    
describe('test collectNative', () => {
    const arrayOf = (ctor) => (arr) => {
        return ctor.from(arr);
    };

    it('collectInt8', async () => {
        const r = await F.collectInt8([1,2,3,4,5]);
        assert.deepStrictEqual(arrayOf(Int8Array)([1,2,3,4,5]),r);
        assert.deepStrictEqual(arrayOf(Int8Array)([1,2,3,4,5]).byteLength,r.byteLength);
    });

    it('collectInt16', async () => {
        const r = await F.collectInt16([1,2,3,4,5]);
        assert.deepStrictEqual(arrayOf(Int16Array)([1,2,3,4,5]),r);
        assert.deepStrictEqual(arrayOf(Int16Array)([1,2,3,4,5]).byteLength,r.byteLength);
    });

    it('collectInt32', async () => {
        const r = await F.collectInt32([1,2,3,4,5]);
        assert.deepStrictEqual(arrayOf(Int32Array)([1,2,3,4,5]),r);
        assert.deepStrictEqual(arrayOf(Int32Array)([1,2,3,4,5]).byteLength,r.byteLength);
    });

    it('collectUint8', async () => {
        const r = await F.collectUint8([1,2,3,4,5]);
        assert.deepStrictEqual(arrayOf(Uint8Array)([1,2,3,4,5]),r);
        assert.deepStrictEqual(arrayOf(Uint8Array)([1,2,3,4,5]).byteLength,r.byteLength);
    });

    it('collectUint16', async () => {
        const r = await F.collectUint16([1,2,3,4,5]);
        assert.deepStrictEqual(arrayOf(Uint16Array)([1,2,3,4,5]),r);
        assert.deepStrictEqual(arrayOf(Uint16Array)([1,2,3,4,5]).byteLength,r.byteLength);
    });

    it('collectUint32', async () => {
        const r = await F.collectUint32([1,2,3,4,5]);
        assert.deepStrictEqual(arrayOf(Uint32Array)([1,2,3,4,5]),r);
        assert.deepStrictEqual(arrayOf(Uint32Array)([1,2,3,4,5]).byteLength,r.byteLength);
    });

    it('collectUint8Clamped', async () => {
        const r = await F.collectUint8Clamped([1,2,3,4,5]);
        assert.deepStrictEqual(arrayOf(Uint8ClampedArray)([1,2,3,4,5]).byteLength,r.byteLength);
    });

    it('collectFloat32', async () => {
        const r = await F.collectFloat32([1,2,3,4,5]);
        assert.deepStrictEqual(arrayOf(Float32Array)([1,2,3,4,5]),r);
        assert.deepStrictEqual(arrayOf(Float32Array)([1,2,3,4,5]).byteLength,r.byteLength);
    });

    it('collectFloat64', async () => {
        const r = await F.collectFloat64([1,2,3,4,5]);
        assert.deepStrictEqual(arrayOf(Float64Array)([1,2,3,4,5]),r);
        assert.deepStrictEqual(arrayOf(Float64Array)([1,2,3,4,5]).byteLength,r.byteLength);
    });

    it('generator', async () => {
        const g = function*(){
            yield 1;
            yield 2;
            yield 3;
        };

        const r = await F.collectInt32(g());
        assert.deepStrictEqual(arrayOf(Int32Array)([1,2,3]),r);
        assert.deepStrictEqual(arrayOf(Int32Array)([1,2,3]).byteLength,r.byteLength);
    });

    it('async generator', async () => {
        const g = async function*(){
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            yield Promise.resolve(3);
        };

        const r = await F.collectInt32(g());
        assert.deepStrictEqual(arrayOf(Int32Array)([1,2,3]),r);
        assert.deepStrictEqual(arrayOf(Int32Array)([1,2,3]).byteLength,r.byteLength);
    });

    it('async generator', async () => {
        const g = async function*(){
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            yield Promise.resolve(3);
        };

        const r = await F.collectInt32(g());
        assert.deepStrictEqual(arrayOf(Int32Array)([1,2,3]),r);
        assert.deepStrictEqual(arrayOf(Int32Array)([1,2,3]).byteLength,r.byteLength);
    });

    it('string?', async () => {
        const r = await F.collectInt32(["hello","world"]);
        assert.deepStrictEqual(arrayOf(Int32Array)([0, 0]),r);
        assert.deepStrictEqual(arrayOf(Int32Array)([0, 0]).byteLength,r.byteLength);
    });
});