"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test frequencies', () => {
    it('number', async () => {
        const a = [
            1,1,2,3,4,5,5
        ];

        const r = await F.frequencies(a);
        assert.deepEqual(r, new Map([
            [1, 2], 
            [2, 1],
            [3, 1],
            [4, 1],
            [5, 2]]));
    });

    it('number, Promise<number>', async () => {
        const a = [
            1,Promise.resolve(1),2,3,4,5,Promise.resolve(5)
        ];

        const r = await F.frequencies(a);
        assert.deepEqual(r, new Map([
            [1, 2], 
            [2, 1],
            [3, 1],
            [4, 1],
            [5, 2]]));
    });

    it('string', async () => {
        const a = [
            "1","1","2","3","4","5","5"
        ];

        const r = await F.frequencies(a);
        assert.deepEqual(r, new Map([
            ["1", 2], 
            ["2", 1],
            ["3", 1],
            ["4", 1],
            ["5", 2]]));
    });

    it('string, Promise<string>', async () => {
        const a = [
            "1",Promise.resolve("1"),"2","3","4","5","5"
        ];

        const r = await F.frequencies(a);
        assert.deepEqual(r, new Map([
            ["1", 2], 
            ["2", 1],
            ["3", 1],
            ["4", 1],
            ["5", 2]]));
    });

    it('number, null, undefined, string, Promise<string>', async () => {
        const a = [
            "1",Promise.resolve("1"),null,undefined,undefined,null,"4","5",Promise.resolve("5")
        ];

        const r = await F.frequencies(a);
        assert.deepEqual(r, new Map([
            ["1", 2], 
            [null, 2],
            [undefined, 2],
            ["4", 1],
            ["5", 2]]));
    });

    it('hello world', async () => {
        const a = "hello world";

        const r = await F.frequencies(a);
        assert.deepEqual(r, new Map([
            ["h", 1], 
            ["e", 1],
            ["l", 3],
            ["o", 2],
            [" ", 1],
            ["w", 1],
            ["r", 1],
            ["d", 1]]));
    });
});