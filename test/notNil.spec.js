"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test notNil', () => {
    it('undefined', async () => {
        const r = F.notNil(undefined);
        assert.strictEqual(r, false);
    });

    it('"undefined"', async () => {
        const r = F.notNil("undefined");
        assert.strictEqual(r, true);
    });

    it('null', async () => {
        const r = F.notNil(null);
        assert.strictEqual(r, false);
    });

    it('100F', async () => {
        const r = F.notNil("100F");
        assert.strictEqual(r, true);
    });

    it('"null"', async () => {
        const r = F.notNil("null");
        assert.strictEqual(r, true);
    });

    it('NaN', async () => {
        const r = F.notNil(NaN);
        assert.strictEqual(r, false);
    });

    it('"NaN"', async () => {
        const r = F.notNil("NaN");
        assert.strictEqual(r, true);
    });


    it('empty string', async () => {
        const r = F.notNil("");
        assert.strictEqual(r, true);
    });

    it('0', async () => {
        const r = F.notNil(0);
        assert.strictEqual(r, true);
    });

    it('false', async () => {
        const r = F.notNil(false);
        assert.strictEqual(r, true);
    });

    it('[]', async () => {
        const r = F.notNil([]);
        assert.strictEqual(r, true);
    });

    it('"1"', async () => {
        const r = F.notNil("1");
        assert.strictEqual(r, true);
    });

    it('"0"', async () => {
        const r = F.notNil("0");
        assert.strictEqual(r, true);
    });

    it('1', async () => {
        const r = F.notNil(1);
        assert.strictEqual(r, true);
    });

    it('-1', async () => {
        const r = F.notNil(-1);
        assert.strictEqual(r, true);
    });

    it('0', async () => {
        const r = F.notNil(0);
        assert.strictEqual(r, true);
    });

    it('[[]]', async () => {
        const r = F.notNil([[]]);
        assert.strictEqual(r, true);
    });

    it('[0]', async () => {
        const r = F.notNil([0]);
        assert.strictEqual(r, true);
    });

    it('[1]', async () => {
        const r = F.notNil([0]);
        assert.strictEqual(r, true);
    });

    it('{}', async () => {
        const r = F.notNil({});
        assert.strictEqual(r, true);
    });

    it('true', async () => {
        const r = F.notNil(true);
        assert.strictEqual(r, true);
    });

    it('Object', async () => {
        const r = F.notNil(F);
        assert.strictEqual(r, true);
    });

    it('Function', async () => {
        const r = F.notNil(F.notNil);
        assert.strictEqual(r, true);
    });
});