"use strict";
const F = require("../index");
const assert = require("assert");

describe('test memoize', () => {
    it('valueIV', async () => {
        let counterIV = 0;
        const mustCallOnce = () => {
            if (counterIV++ !== 0) {
                assert.fail("must call once");
            }
            return 42;
        }
        const c = F.memoize(mustCallOnce);
        assert.strictEqual(42, await c());
        assert.strictEqual(42, await c());
        assert.strictEqual(42, await c());
        assert.strictEqual(42, await c());
    });

    it('valueII', async () => {
        let counter = 0;
        const mustCallOnce = (a) => {
            if (counter++ !== 0) {
                assert.fail("must call once");
            }
            return a;
        }
        const c = F.memoize(mustCallOnce);
        assert.strictEqual(3, await c(3));
        assert.strictEqual(3, await c(3));
        assert.strictEqual(3, await c(3));
        assert.strictEqual(3, await c(3));
    });

    it('valueIII', async () => {
        let counter = 0;
        const mustCallOnce = (a, b) => {
            if (counter++ !== 0) {
                assert.fail("must call once");
            }
            return a + b;
        }
        const c = F.memoize(mustCallOnce);
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(7, await c(3,4));
    });

    it('valueIII + II', async () => {
        let counter = 0;
        const mustCallTwice = (a, b) => {
            if (counter++ > 2) {
                assert.fail("must call twice");
            }
            return a + b;
        }
        const c = F.memoize(mustCallTwice);
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(8, await c(3,5));
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(8, await c(3,5));
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(8, await c(3,5));
    });

    it('valueIII + III + III', async () => {
        let counter = 0;
        const mustCallThird = (a, b) => {
            if (counter++ > 3) {
                assert.fail("must call thrid");
            }
            return a + b;
        }
        const c = F.memoize(mustCallThird);
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(8, await c(3,5));
        assert.strictEqual(9, await c(4,5));
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(8, await c(3,5));
        assert.strictEqual(9, await c(4,5));
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(8, await c(3,5));
        assert.strictEqual(9, await c(4,5));
    });

    it('fibo', async () => {
        const memFibo = F.memoize(async (n) => {
            if (n === 0) return 1;
            if (n === 1) return 1;
            return await memFibo(n - 1) + await memFibo(n - 2);
        });

        // if not work memoize
        // node throw memory error
        // or mocha timeout error
        await memFibo(30);
    });
});