"use strict";
const F = require("../index");
const assert = require("assert");

describe('test getOrElse', () => {
    const obj = { name: "hello", value: 42 };
    const arr = [1, 2, 3];
    arr["name"] = "hello";

    const getObj = { get: "get", a: 1 };

    const getObj2 = { get: () => {}, a: 1 };

    const m = new Map([
        ["name", "hello map"],
        ["value", 84]]);

    it('Object', async () => {
        const r = F.getOrElse("name", null, obj);
        assert.strictEqual(r, "hello");
    });

    it('arr[0]', async () => {
        assert.strictEqual(F.getOrElse("0", null, arr), 1);
        assert.strictEqual(F.getOrElse(0, null, arr), 1);
    });

    it('arr[1]', async () => {
        assert.strictEqual(F.getOrElse("1", null, arr), 2);
        assert.strictEqual(F.getOrElse(1, null, arr), 2);
    });

    it('arr[2]', async () => {
        assert.strictEqual(F.getOrElse("2", null, arr), 3);
        assert.strictEqual(F.getOrElse(2, null, arr), 3);
    });


    it('arr[99]', async () => {
        assert.strictEqual(F.getOrElse("99", "default", arr), "default");
        assert.strictEqual(F.getOrElse(99, "default", arr), "default");
    });

    it('Map.get', async () => {
        const r = F.getOrElse("name", null, m);
        assert.strictEqual(r, "hello map");
    });

    it('Map.size', async () => {
        const r = F.getOrElse("size", null, m);
        assert.strictEqual(r, 2);
    });

    it('Map.set', async () => {
        const r = F.getOrElse("set", null, m);
        assert.strictEqual(r, m.set);
    });

    it('getObj.a', async () => {
        const r = F.getOrElse("a", null, getObj);
        assert.strictEqual(r, 1);
    });

    it('getObj.get', async () => {
        const r = F.getOrElse("get", null, getObj);
        assert.strictEqual(r, "get");
    });

    it('getObj2.a', async () => {
        const r = F.getOrElse("a", null, getObj2);
        assert.strictEqual(r, 1);
    });

    it('getObj2.get', async () => {
        const r = F.getOrElse("get", null, getObj2);
        assert.strictEqual(r(), undefined);
    });

    it('sort and get', async () => {
        const a = [{ value: 1 }, { value: 3 }, { value: 0 }, { hello: "world" }];
        const r = await F.collect(F.sortBy(F.getOrElse("value", 2), F.asc, a));
        assert.deepStrictEqual(r, [{ value: 0 }, { value: 1 }, { hello: "world" }, { value: 3 }]);
    });
});