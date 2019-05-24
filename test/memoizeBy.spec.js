"use strict";
const F = require("../index");
const assert = require("assert");

describe('test memoizeBy', () => {
    it('div10', async () => {
        let counterIV = 0;
        const mustCallOnce = () => {
            if (counterIV++ !== 0) {
                assert.fail("must call once");
            }
            return 42;
        }
        const c = F.memoizeBy(e => e / 10 ,mustCallOnce);
        assert.strictEqual(42, await c());
        assert.strictEqual(42, await c());
        assert.strictEqual(42, await c());
        assert.strictEqual(42, await c());
    });

    it('add, refresh', async () => {
        let counter = 0;
        const mustCallOnce = (a,b) => {
            if (counter++ !== 0) {
                throw "must call once";
            }
            return a + b;
        }
        const c = F.memoizeBy(e => e / 10 ,mustCallOnce);
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(7, await c(3,4));
        assert.strictEqual(7, await c(3,4));
        try{
            await c(1,2); // 3
            assert.fail("must throw");
        }catch(e) {
            if (e.constructor === assert.AssertionError){
                assert.fail(e);
            }
        }
    });

    it('object arg', async () => {
        let counter = 0;
        const mustCallOnce = (a) => {
            if (counter++ !== 0) {
                throw "must call once";
            }
            return 42;
        };

        const c = F.memoizeBy(F.identity, mustCallOnce);
        await c({hello:"world"});
        await c({hello:"world"});
        await c({hello:"world"});
        await c({hello:"world"});
        await c({hello:"world"});
    });

    it('array arg', async () => {
        let counter = 0;
        const mustCallOnce = (a) => {
            if (counter++ !== 0) {
                throw "must call once";
            }
            return 42;
        };

        const c = F.memoizeBy(F.identity, mustCallOnce);
        await c([1,2,3,4,5]);
        await c([1,2,3,4,5]);
        await c([1,2,3,4,5]);
        await c([1,2,3,4,5]);
        await c([1,2,3,4,5]);
    });

    it('fibo', async () => {
        const memFibo = F.memoizeBy(F.identity, async (n) => {
            if (n === 0) return 0;
            if (n === 1) return 1;
            return await memFibo(n - 1) + await memFibo(n - 2);
        });

        // if not work memoize
        // node throw memory error
        // or mocha timeout error
        await memFibo(30);
    });

});