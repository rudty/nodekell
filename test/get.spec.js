"use strict";
const F = require("../index");
const assert = require("assert");

describe('test get', () => {
    const obj = { name: "hello", value: 42 };
    const arr = [1, 2, 3];
    arr["name"] = "hello";

    const getObj = { get: "get", a: 1 };

    const getObj2 = { get: () => {}, a: 1 };

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

    it('getObj.a', async () => {
        const r = F.get("a", getObj);
        assert.strictEqual(r, 1);
    });

    it('getObj.get', async () => {
        const r = F.get("get", getObj);
        assert.strictEqual(r, "get");
    });

    it('getObj2.a', async () => {
        const r = F.get("a", getObj2);
        assert.strictEqual(r, 1);
    });

    it('getObj2.get', async () => {
        const r = F.get("get", getObj2);
        assert.strictEqual(r(), undefined);
    });

    it('sort and get', async () => {
        const a = [{ value: 1 }, { value: 3 }, { value: 0 }];
        const r = await F.collect(F.sortBy(F.get("value"), F.asc, a));
        assert.deepStrictEqual(r, [{ value: 0 }, { value: 1 }, { value: 3 }]);
    });
});