"use strict";
const F = require("../index");
const assert = require("assert");

describe('test find', () => {
    const a1 = { a: 1 };
    const a2 = { a: 2 };
    const a3 = { a: 3 };
    const hello = { hello: "world" };
    const cafe = { cafe: "mocha" };
    const zero = 0;
    const software = { software: "engineer" };
    const blacktea = { blacktea: "suger" };
    const fn = () => "function";

    const arr = [a1, hello, cafe, fn, zero, a2, software, blacktea, a3];
    it('first', async () => {
        const r = await F.find(e => 
            e.constructor === Object &&
            "a" in e, arr);
        assert.deepStrictEqual(r, { a: 1 });
    });

    it('software', async () => {
        const r = await F.find(e => 
            e.constructor === Object &&
            "software" in e, arr);
        assert.deepStrictEqual(r, { software: "engineer" });
    });

    it('zero', async () => {
        const r = await F.find(e => e === 0, arr);
        assert.strictEqual(r, 0);
    });

    it('fn', async () => {
        const r = await F.find(e => e.constructor === Function, arr);
        assert.strictEqual(r(), "function");
    });

    it('not found', async () => {
        const r = await F.find(e => e === 1, arr);
        assert.strictEqual(r, undefined);
    });
});