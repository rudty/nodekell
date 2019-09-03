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
    
});