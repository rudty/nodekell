"use strict";
const F = require("../index");
const assert = require("assert");

describe('test prop', () => {
    const obj = { name: "hello", value: 42 };
    const arr = [1, 2, 3];
    arr["name"] = "hello";

    const propObj = { g: "prop", a: 1 };

    const propObj2 = { g: () => {}, a: 1 };

    it('Object', async () => {
        const r = F.prop("name", obj);
        assert.strictEqual(r, "hello");
    });

    it('arr[0]', async () => {
        assert.strictEqual(F.prop("0", arr), 1);
        assert.strictEqual(F.prop(0, arr), 1);
    });

    it('arr[1]', async () => {
        assert.strictEqual(F.prop("1", arr), 2);
        assert.strictEqual(F.prop(1, arr), 2);
    });

    it('arr[2]', async () => {
        assert.strictEqual(F.prop("2", arr), 3);
        assert.strictEqual(F.prop(2, arr), 3);
    });
 
    it('propObj.a', async () => {
        const r = F.prop("a", propObj);
        assert.strictEqual(r, 1);
    });

    it('propObj.prop', async () => {
        const r = F.prop("g", propObj);
        assert.strictEqual(r, "prop");
    });

    it('propObj2.a', async () => {
        const r = F.prop("a", propObj2);
        assert.strictEqual(r, 1);
    });

    it('propObj2.prop', async () => {
        const r = F.prop("g", propObj2);
        assert.strictEqual(r(), undefined);
    });

    it('sort and prop', async () => {
        const a = [{ value: 1 }, { value: 3 }, { value: 0 }];
        const r = await F.collect(F.sortBy(F.prop("value"), F.asc, a));
        assert.deepStrictEqual(r, [{ value: 0 }, { value: 1 }, { value: 3 }]);
    });
});