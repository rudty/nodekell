"use strict";
const F = require("../index");
const assert = require("assert");

describe('test propOrElse', () => {
    const obj = { name: "hello", value: 42 };
    const arr = [1, 2, 3];
    arr["name"] = "hello";

    const propObj = { g: "prop", a: 1 };

    const propObj2 = { g: () => {}, a: 1 };

    it('Object', async () => {
        const r = F.propOrElse("name", null, obj);
        assert.strictEqual(r, "hello");
    });

    it('arr[0]', async () => {
        assert.strictEqual(F.propOrElse("0", null, arr), 1);
        assert.strictEqual(F.propOrElse(0, null, arr), 1);
    });

    it('arr[1]', async () => {
        assert.strictEqual(F.propOrElse("1", null,  arr), 2);
        assert.strictEqual(F.propOrElse(1, null, arr), 2);
    });


    it('arr[2]', async () => {
        assert.strictEqual(F.propOrElse("2", null, arr), 3);
        assert.strictEqual(F.propOrElse(2, null, arr), 3);
    });

    it('arr[99]', async () => {
        assert.strictEqual(F.propOrElse("99", 99, arr), 99);
        assert.strictEqual(F.propOrElse(99, 99, arr), 99);
    });
 
    it('propObj.a', async () => {
        const r = F.propOrElse("a", null, propObj);
        assert.strictEqual(r, 1);
    });

    it('propObj.prop', async () => {
        const r = F.propOrElse("g", null, propObj);
        assert.strictEqual(r, "prop");
    });

    it('propObj.hello', async () => {
        const r = F.propOrElse("hello", "not found", propObj);
        assert.strictEqual(r, "not found");
    });

    it('propObj2.a', async () => {
        const r = F.propOrElse("a", null, propObj2);
        assert.strictEqual(r, 1);
    });

    it('propObj2.prop', async () => {
        const r = F.propOrElse("g", null, propObj2);
        assert.strictEqual(r(), undefined);
    });

    it('sort and prop', async () => {
        const a = [{ value: 1 }, { value: 3 }, { value: 0 }, { hello: "world" }];
        const r = await F.collect(F.sortBy(F.propOrElse("value", 2), F.asc, a));
        assert.deepStrictEqual(r, [{ value: 0 }, { value: 1 }, { hello: "world" }, { value: 3 }]);
    });
});