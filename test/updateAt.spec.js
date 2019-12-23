"use strict";
const F = require("../index");
const assert = require("assert");

describe('upateAt', () => {
    it('array first index', async () => {
        const arr = [1,2,3,4,5];
        const r = await F.updateAt(99, 0, arr);
        assert.deepStrictEqual(r, [99,2,3,4,5]);
    });

    it('array last index', async () => {
        const arr = [1,2,3,4,5];
        const r = await F.updateAt(99, 4, arr);
        assert.deepStrictEqual(r, [1,2,3,4,99]);
    });

    it('generator 1~5 first index', async () => {
        const gen = async function*() {
            for(let i = 1; i <= 5; ++i) yield i;
        };
        const r = await F.updateAt(99, 0, gen());
        assert.deepStrictEqual(r, [99,2,3,4,5]);
    });

    it('generator 1~5 last index', async () => {
        const gen = async function*() {
            for(let i = 1; i <= 5; ++i) yield i;
        };
        const r = await F.updateAt(99, 4, gen());
        assert.deepStrictEqual(r, [1,2,3,4,99]);
    });

    it('infinity generator', async () => {
        const gen = async function*() {
            for(let i = 1;; ++i) yield i;
        };
        const r = await F.collect(
        F.take(5, 
            F.updateAt(99, 4, gen())));
        assert.deepStrictEqual(r, [1,2,3,4,99]);
    });
});