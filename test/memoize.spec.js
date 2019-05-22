"use strict";
const F = require("../index");
const assert = require("assert");

describe('test has', () => {
    it('valueIV', async () => {
        let counterIV = 0;
        const mustCallOnce = () => {
            if (counterIV++ !== 0) {
                assert.fail("must call once");
            }
            return 42;
        }
        const c = F.memoize(mustCallOnce);
        assert.strictEqual(42, c());
        assert.strictEqual(42, c());
        assert.strictEqual(42, c());
        assert.strictEqual(42, c());
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
        assert.strictEqual(3, c(3));
        assert.strictEqual(3, c(3));
        assert.strictEqual(3, c(3));
        assert.strictEqual(3, c(3));
    });

    it('test', async () => {
        const a = {};
        a[[]] = undefined;
        // console.log(a[[]]);
        // console.log(a);
    });
});