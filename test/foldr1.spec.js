"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test foldlr1', () => {
    it('add', async () => {
        const arr = [1,2,3,4,5];
        const r = await F.foldr1((a, b) => a + b, arr);
        assert.deepStrictEqual(r, 15);
    });

    it('div', async () => {
        const arr = [64,2,1];
        const r = await F.foldr1((a, b) => a / b, arr);
        assert.deepStrictEqual(r, 32);
    });

    it('add3', async () => {
        const arr = ["1","2","3","4","5"];
        const r = await F.foldr1((a, b) => a + b, arr);
        assert.deepStrictEqual(r, "12345");
    });

    it('empty', async () => {
        const arr = [];
        try{
            const r = await F.foldr1((a, b) => a / b, arr);
            assert.fail("must except");
        }catch(e){

        }
    });

    it('single', async () => {
        const arr = [3];
        const r = await F.foldr1((a, b) => a + b, arr);
        assert.deepStrictEqual(r, 3);
    });
});