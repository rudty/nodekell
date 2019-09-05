"use strict";
const F = require("../index");
const assert = require("assert");

describe('test block', () => {
    it('array', async () => {
        const a = [1,2,3,4,5];
        await F.block(a);
        await F.block(a,a);
        await F.block(a,a[Symbol.iterator]());
    });

    it('asyncIterator', async () => {
        let check = 0;
        const a = (async function*(){
            yield Promise.resolve(0);
            yield Promise.resolve(0);
            check += 1;
        });
        await F.block(a(), a());
        assert.strictEqual(check, 2);
    });

    it('empty', async () => {
        await F.block(null);
        await F.block([null]);
    });

    it('generator', async () => {
        let check = 0;
        const a = (function*(){
            yield Promise.resolve(0);
            yield Promise.resolve(0);
            yield (async () => {
                await Promise.resolve(1);
                check += 1;
            })();
            yield "a";
            
        });
        await F.block(a(), a());
        assert.strictEqual(check, 2);
    });

    it('async function', async () => {
        let check = 0;
        const a = (async () => {
            await Promise.resolve(1);
            check += 1;
        });
        await F.block(a(), a(), a());
        assert.strictEqual(check, 3);
    });

    it('Promise', async () => {
        let check = 0;
        const a = Promise.resolve(Promise.resolve(Promise.resolve((async () => check += 1)())));
        await F.block(a);
        assert.strictEqual(check, 1);
    });
    
    it('not iter', async () => {
        await F.block(1, null, 1);
    });

    it('with run', async () => {
        let check = 0;
        const r = await F.run([1,2,3,4,5],
        F.map(e => e + 1),
        F.map(e => {
            check += 1;
            return e;
        }),
        F.block);
        assert.deepStrictEqual(check, 5);
    });
});