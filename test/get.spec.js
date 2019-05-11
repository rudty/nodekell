"use strict";
const F = require("../index");
const assert = require("assert");

describe('test get', () => {
    const obj = { name: "hello", value: 42 };
    const arr = [1,2,3];
    arr["name"] = "hello"; 

    const m = new Map([
        ["name", "hello map"],
        ["value", 84]]);

    it('Object', async () => {
        const r = F.get("name", obj);
        assert.strictEqual(r, "hello");
    });

    it('arr[0]', async () => {
        assert.strictEqual(F.get("0", arr), 1);
        assert.strictEqual(F.get(0, arr), 1);
    });

    it('arr[1]', async () => {
        assert.strictEqual(F.get("1", arr), 2);
        assert.strictEqual(F.get(1, arr), 2);
    });

    it('arr[2]', async () => {
        assert.strictEqual(F.get("2", arr), 3);
        assert.strictEqual(F.get(2, arr), 3);
    });

    it('Map.get', async () => {
        const r = F.get("name", m);
        assert.strictEqual(r, "hello map");
    });
    
    it('Map.size', async () => {
        const r = F.get("size", m);
        assert.strictEqual(r, 2);
    });

    it('Map.set', async () => {
        const r = F.get("set", m);
        assert.strictEqual(r, m.set);
    });

});