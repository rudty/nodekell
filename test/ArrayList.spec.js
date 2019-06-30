"use strict";
const ArrayList = require("../index.js")._ArrayList;
const assert = require("assert");
    
describe('test arraylist', () => {
    it('add int32', async () => {
        const ar = new ArrayList(Int32Array);
        for(let i = 0; i < 100000; ++i) {
            ar.add(i);
        }
        assert.strictEqual(ar.length, 100000);

        const nativeArray = ar.toArray();
        assert.strictEqual(nativeArray.length, 100000);
        assert.strictEqual(nativeArray.byteLength, Int32Array.BYTES_PER_ELEMENT * 100000);
    });

    it('add int8', async () => {
        const ar = new ArrayList(Int8Array);
        for(let i = 0; i < 100000; ++i) {
            ar.add(i);
        }
        const nativeArray = ar.toArray();
        assert.strictEqual(nativeArray.length, 100000);
        assert.strictEqual(nativeArray.byteLength, Int8Array.BYTES_PER_ELEMENT * 100000);
    });

    it('get', async () => {
        const ar = new ArrayList(Int32Array);
        for(let i = 0; i < 100000; ++i) {
            ar.add(i);
        } 

        for(let i = 0; i < 100000; ++i) {
            assert.strictEqual(ar.get(i), i);
        }  
    });

    it('set', async () => {
        const ar = new ArrayList(Int32Array);
        for(let i = 0; i < 5; ++i) {
            ar.add(i);
        } 

        for(let i = 0; i < 5; ++i) {
            ar.set(i, ar.get(i) + 10);
        }

        for(let i = 0; i < 5; ++i) {
            assert.strictEqual(ar.get(i), i + 10);
        }
    });

    
    it('clear', async () => {
        const ar = new ArrayList(Int32Array);
        for(let i = 0; i < 1000000; ++i) {
            ar.add(i);
        }
        ar.clear();
        for(let i = 0; i < 100000; ++i) {
            ar.add(i);
        }
        
        assert.strictEqual(ar.length, 100000);

        const nativeArray = ar.toArray();
        assert.strictEqual(nativeArray.length, 100000);
        assert.strictEqual(nativeArray.byteLength, Int32Array.BYTES_PER_ELEMENT * 100000);
    });

    it('iterator', async () => {
        const ar = new ArrayList(Int32Array);
        for(let i = 0; i < 100000; ++i) {
            ar.add(i);
        } 

        let i = 0;
        for (const e of ar) {
            assert.strictEqual(e, i++);
        }
    });
});