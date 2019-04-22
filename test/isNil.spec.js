"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test isNil', () => {
    it('undefined', async () => {
        const r = F.isNil(undefined);
        assert.strictEqual(r, true);
    });

    it('"undefined"', async () => {
        const r = F.isNil("undefined");
        assert.strictEqual(r, false);
    });

    it('null', async () => {
        const r = F.isNil(null);
        assert.strictEqual(r, true);
    });

    it('100F', async () => {
        const r = F.isNil("100F");
        assert.strictEqual(r, false);
    });

    it('"null"', async () => {
        const r = F.isNil("null");
        assert.strictEqual(r, false);
    });

    it('NaN', async () => {
        const r = F.isNil(NaN);
        assert.strictEqual(r, true);
    });

    it('"NaN"', async () => {
        const r = F.isNil("NaN");
        assert.strictEqual(r, false);
    });


    it('empty string', async () => {
        const r = F.isNil("");
        assert.strictEqual(r, false);
    });

    it('0', async () => {
        const r = F.isNil(0);
        assert.strictEqual(r, false);
    });

    it('false', async () => {
        const r = F.isNil(false);
        assert.strictEqual(r, false);
    });

    it('[]', async () => {
        const r = F.isNil([]);
        assert.strictEqual(r, false);
    });

    it('"1"', async () => {
        const r = F.isNil("1");
        assert.strictEqual(r, false);
    });

    it('"0"', async () => {
        const r = F.isNil("0");
        assert.strictEqual(r, false);
    });

    it('1', async () => {
        const r = F.isNil(1);
        assert.strictEqual(r, false);
    });

    it('-1', async () => {
        const r = F.isNil(-1);
        assert.strictEqual(r, false);
    });

    it('0', async () => {
        const r = F.isNil(0);
        assert.strictEqual(r, false);
    });

    it('[[]]', async () => {
        const r = F.isNil([[]]);
        assert.strictEqual(r, false);
    });

    it('[0]', async () => {
        const r = F.isNil([0]);
        assert.strictEqual(r, false);
    });

    it('[1]', async () => {
        const r = F.isNil([1]);
        assert.strictEqual(r, false);
    });

    it('{}', async () => {
        const r = F.isNil({});
        assert.strictEqual(r, false);
    });

    it('true', async () => {
        const r = F.isNil(true);
        assert.strictEqual(r, false);
    });

    it('Object', async () => {
        const r = F.isNil(F);
        assert.strictEqual(r, false);
    });

    it('Function', async () => {
        const r = F.isNil(F.isNil);
        assert.strictEqual(r, false);
    });
});