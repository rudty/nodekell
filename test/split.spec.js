"use strict";
const F = require("../index");
const assert = require("assert");

describe('test splitBy', () => {
    it("number array3", async () => {
        const s = F.split(F.equals(3), [1, 2, 3, 4, 5]);
        // for await (const e of s) {
        //     // console.log(e);
        //     for await (const k of e) {
        //         console.log(k);
        //     }
        //     console.log("e");
        // }

        let e = await s.next();
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 1 });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 2 });
        assert.deepStrictEqual(await e.value.next(),
            { done: true, value: undefined });

        e = await s.next();

        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 3 });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 4 });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 5 });
        assert.deepStrictEqual(await e.value.next(),
            { done: true, value: undefined });
    });


    it("number array1", async () => {
        const s = F.split(F.equals(1), [1, 2, 3, 4, 5]);
        let e = await s.next();
        assert.deepStrictEqual(await e.value.next(),
            { done: true, value: undefined });

        e = await s.next();

        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 1 });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 2 });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 3 });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 4 });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: 5 });
        assert.deepStrictEqual(await e.value.next(),
            { done: true, value: undefined });
    });

    it("string", async () => {
        const s = F.split(F.equals("o"), "hello world");
        let e = await s.next();
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "h" });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "e" });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "l" });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "l" });

        assert.deepStrictEqual(await e.value.next(),
            { done: true, value: undefined });

        e = await s.next();

        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "o" });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: " " });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "w" });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "o" });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "r" });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "l" });
        assert.deepStrictEqual(await e.value.next(),
            { done: false, value: "d" });

    });
});
