"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test range', () => {
    it('end 1byte', async () => {
        await F.run(
            F.repeat(100, () => F.random(255)),
            F.forEach(e => assert.ok(e >= 0 && e < 255))
        );
    });
    it('end 2byte', async () => {
        await F.run(
            F.repeat(100, () => F.random(65531)),
            F.forEach(e => assert.ok(e >= 0 && e < 65531))
        );
    });
    it('end 3byte', async () => {
        await F.run(
            F.repeat(100, () => F.random(16777213)),
            F.forEach(e => assert.ok(e >= 0 && e < 16777213))
        );
    });
    it('end 4byte', async () => {
        await F.run(
            F.repeat(100, () => F.random(16777219)),
            F.forEach(e => assert.ok(e >= 0 && e < 16777219))
        );
    });
    it('begin-end 1byte', async () => {
        await F.run(
            F.repeat(100, () => F.random(8, 50)),
            F.forEach(e => assert.ok(e >= 8 && e < 50))
        );
    });
    it('begin-end 1byte', async () => {
        await F.run(
            F.repeat(100, () => F.random(8, 50)),
            F.forEach(e => assert.ok(e >= 8 && e < 50))
        );
    });
    it('begin-end 4byte', async () => {
        await F.run(
            F.repeat(100, () => F.random(8, 16777219)),
            F.forEach(e => assert.ok(e >= 8 && e < 16777219))
        );
    });
    it('all 4byte', async () => {
        await F.run(
            F.repeat(100000, () => F.random()),
            F.forEach(e => assert.ok(e >= 0 && e < 4294967296))
        );
    });
    it('0', async () => {
        assert.strictEqual(F.random(0, 1), 0);
    });
});