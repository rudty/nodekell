"use strict";
const F = require("../index");
const assert = require("assert");

describe('test juxtO', () => {
    it('obj', async () => {
        const a = await F.juxtO(
            ["a", "b"],
            { a: 1, b: 2, c: 3 });
        assert.deepStrictEqual(a, [1, 2]);
    });
    it('obj async gen', async () => {
        const a = await F.juxtO(
            (async function*(){
                yield "a";
                yield "b";
            })(),
            { a: 1, b: 2, c: 3 });
        assert.deepStrictEqual(a, [1, 2]);
    });
    it('map', async () => {
        const a = await F.juxtO(
            ["A", "B"],
            new Map([["A", 1], ["B", 2], ["C", 3]]));
        assert.deepStrictEqual(a, [1, 2]);
    });
    it('map found / not found', async () => {
        const a = await F.juxtO(
            ["A", "Z"],
            new Map([["A", 1], ["B", 2], ["C", 3]]));
        assert.deepStrictEqual(a, [1, undefined]);
    });
});