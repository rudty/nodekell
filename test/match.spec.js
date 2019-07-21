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
        const value = [1, 2];

        const r = F.match(value,
            [1, F._], e => assert.deepStrictEqual(e, [1, 2]),
            F._, assert.fail,
        );
        assert.strictEqual(r, undefined);
    });

    it('arr2', async () => {
        const value2 = [1, 2, 3, 4, 5];
        let run = false;
        const r = F.match(value2,
            [1, 2], () => assert.fail,
            [1, F._, F._, F._, F._], e => {
                assert.deepStrictEqual(e, [1, 2, 3, 4, 5]);
                run = true;
            }
        );
        assert.strictEqual(r, undefined);
        assert.strictEqual(run, true);
    });

    it('arr3', async () => {
        const value3 = [1, 2];
        let run = false;
        const r = F.match(value3,
            [1, F._, F._, F._, F._], assert.fail,
            F._, e => {
                assert.deepStrictEqual(e, [1, 2]);
                run = true;
            }
        );
        assert.strictEqual(r, undefined);
        assert.strictEqual(run, true);
    });
});