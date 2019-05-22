"use strict";
const F = require("../index");
const assert = require("assert");

describe('test has', () => {
    let counter = 0;
    const mustCallOnceIV = () => {
        if (counter !== 0) {
            assert.fail("must call once");
        }
        return 42;
    }
    it('value', async () => {
        const c = F.memoize(mustCallOnceIV);
        assert.strictEqual(42, c());
        assert.strictEqual(42, c());
        assert.strictEqual(42, c());
        assert.strictEqual(42, c());
        assert.strictEqual(42, c());
    });
});