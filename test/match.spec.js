"use strict";
const F = require("../index.js");
const assert = require("assert");
    
describe('test match', () => {
    it('value', async () => {
        const value = 1;

        const r = F.match(value,
            0, 9,
            1, 8,
            2, 7,
        );
        assert.strictEqual(r, 8);
    });

    it('function', async () => {
        const value = 1;

        const r = F.match(value,
            0, () => 9,
            1, () => 8,
            2, () => 7,
        );
        assert.strictEqual(r, 8);
    });

    it('function1', async () => {
        const value = 1;

        const r = F.match(value,
            0, assert.fail,
            1, e => assert.ok(e === 1),
            2, assert.fail,
        );
        assert.strictEqual(r, undefined);
    });

    it('arr', async () => {
        const value = [1,2];

        const r = F.match(value,
            [1, F._], e => assert.deepStrictEqual(e, [1,2]),
            F._, assert.fail,
        );
        assert.strictEqual(r, undefined);
    });
});