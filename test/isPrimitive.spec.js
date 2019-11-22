"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('isPrimitive', () => {
    it('0', async () => {
        const r = F.isPrimitive(0);
        assert.strictEqual(r, true);
    });

    it('null', async () => {
        const r = F.isPrimitive(null);
        assert.strictEqual(r, true);
    });

    it('undefined', async () => {
        const r = F.isPrimitive(undefined);
        assert.strictEqual(r, true);
    });

    it('number', async () => {
        const r = F.isPrimitive(123123);
        assert.strictEqual(r, true);
    });

    it('BigInt', async () => {
        const r = F.isPrimitive(123123123312312312213231312312123n);
        assert.strictEqual(r, true);
    });

    it('Symbol', async () => {
        const r = F.isPrimitive(Symbol("a"));
        assert.strictEqual(r, true);
    });

    it('Boolean', async () => {
        const r0 = F.isPrimitive(true);
        assert.strictEqual(r0, true);

        const r1 = F.isPrimitive(false);
        assert.strictEqual(r1, true);
    });
    
    it('NaN', async () => {
        const r = F.isPrimitive(NaN);
        assert.strictEqual(r, true);
    });

    it('String', async () => {
        const r = F.isPrimitive("hello");
        assert.strictEqual(r, true);
    });

    it('new String', async () => {
        const r = F.isPrimitive(new String("hello"));
        assert.strictEqual(r, false);
    });

    it('new number', async () => {
        const r = F.isPrimitive(new Number(123123));
        assert.strictEqual(r, false);
    });

    it('new Bool', async () => {
        const r = F.isPrimitive(new Boolean(false));
        assert.strictEqual(r, false);
    });

    it('()=>{}', async () => {
        const r = F.isPrimitive(()=>{});
        assert.strictEqual(r, false);
    });

    it('function', async () => {
        const r = F.isPrimitive(function(){});
        assert.strictEqual(r, false);
    });

    it('object', async () => {
        const r = F.isPrimitive(new Object());
        assert.strictEqual(r, false);
    });
});