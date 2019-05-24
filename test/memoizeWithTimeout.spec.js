"use strict";
const F = require("../index");
const assert = require("assert");

describe('test memoizeWithTimeout', () => {
    it('call2', async () => {
        let counter = 0;
        const mustCallOnce = () => {
            counter += 1;
            return 42;
        }
        const c = F.memoizeWithTimeout(10, mustCallOnce);
        assert.strictEqual(42, await c());
        await F.sleep(20);
        assert.strictEqual(42, await c());
        assert.strictEqual(counter, 2);
    });

    it('call1', async () => {
        let counter = 0;
        const mustCallOnce = () => {
            counter += 1;
            return 42;
        }
        const c = F.memoizeWithTimeout(1000, mustCallOnce);
        assert.strictEqual(42, await c());
        await F.sleep(20);
        assert.strictEqual(42, await c());
        assert.strictEqual(counter, 1);
    });
});