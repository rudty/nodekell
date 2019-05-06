"use strict";
const F = require("../index");
const assert = require("assert");

describe('test count', () => {
    it('num', async () => {
        const a = [1,2,3,4,5];
        const n = await F.count(a);
        assert.strictEqual(n, 5);
    });

    it('string', async () => {
        const a = "abcde"; 
        const n = await F.count(a);
        assert.strictEqual(n, 5);
    });

    it('iter', async () => {
        const a = "abcde"[Symbol.iterator](); 
        const n = await F.count(a);
        assert.strictEqual(n, 5);
    });

    it('iter', async () => {
        const a = (async function*() {
            yield* "abcde";
        })();
        const n = await F.count(a);
        assert.strictEqual(n, 5);
    });

    it('map', async () => {
        const a = new Map([
            ["A",1],
            ["B",2],
            ["C",3],
            ["D",4],
            ["E",5]
        ]);
        const n = await F.count(a);
        assert.strictEqual(n, 5);
    });

    it('object', async () => {
        const a = {
            "A":1,
            "B":2,
            "C":3,
            "D":4,
            "E":5
        }; 
        const n = await F.count(a);
        assert.strictEqual(n, 5);
    });
});