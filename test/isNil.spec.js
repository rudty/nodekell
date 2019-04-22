"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test isNil', () => {
    it('undefined', async () => {
        const r = F.isNil(undefined);
        assert.strictEqual(r, false);
    });

    it('"undefined"', async () => {
        const r = F.isNil("undefined");
        assert.strictEqual(r, true);
    });

    it('null', async () => {
        const r = F.isNil(null);
        assert.strictEqual(r, false);
    });

    it('100F', async () => {
        const r = F.isNil("100F");
        assert.strictEqual(r, true);
    });

    it('"null"', async () => {
        const r = F.isNil("null");
        assert.strictEqual(r, true);
    });

    it('NaN', async () => {
        const r = F.isNil(NaN);
        assert.strictEqual(r, false);
    });

    it('"NaN"', async () => {
        const r = F.isNil("NaN");
        assert.strictEqual(r, true);
    });


    it('empty string', async () => {
        const r = F.isNil("");
        assert.strictEqual(r, true);
    });

    it('0', async () => {
        const r = F.isNil(0);
        assert.strictEqual(r, true);
    });

    it('false', async () => {
        const r = F.isNil(false);
        assert.strictEqual(r, true);
    });

    it('[]', async () => {
        const r = F.isNil([]);
        assert.strictEqual(r, true);
    });

    it('"1"', async () => {
        const r = F.isNil("1");
        assert.strictEqual(r, true);
    });

    it('"0"', async () => {
        const r = F.isNil("0");
        assert.strictEqual(r, true);
    });

    it('1', async () => {
        const r = F.isNil(1);
        assert.strictEqual(r, true);
    });

    it('-1', async () => {
        const r = F.isNil(-1);
        assert.strictEqual(r, true);
    });

    it('0', async () => {
        const r = F.isNil(0);
        assert.strictEqual(r, true);
    });

    it('[[]]', async () => {
        const r = F.isNil([[]]);
        assert.strictEqual(r, true);
    });

    it('[0]', async () => {
        const r = F.isNil([0]);
        assert.strictEqual(r, true);
    });

    it('[1]', async () => {
        const r = F.isNil([0]);
        assert.strictEqual(r, true);
    });

    it('{}', async () => {
        const r = F.isNil({});
        assert.strictEqual(r, true);
    });

    it('true', async () => {
        const r = F.isNil(true);
        assert.strictEqual(r, true);
    });

    it('Object', async () => {
        const r = F.isNil(F);
        assert.strictEqual(r, true);
    });

    it('Function', async () => {
        const r = F.isNil(F.isNil);
        assert.strictEqual(r, true);
    });
});