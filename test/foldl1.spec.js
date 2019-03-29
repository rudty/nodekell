"use strict";
const F = require("../prelude");
const assert = require("assert");

describe('test foldl1', () => {
    it('add', async () => {
        const arr = [1,2,3,4,5];
        const r = await F.foldl1((acc, e) => acc + e, arr);
        assert.deepEqual(r, 15);
    });

    it('div', async () => {
        const arr = [8,2,2];
        const r = await F.foldl1((acc, e) => acc / e, arr);
        assert.deepEqual(r, 2);
    });

    it('empty', async () => {
        const arr = [];
        try{
            await F.foldl1((acc, e) => acc / e, arr);
            assert.fail("must error");
        }catch(e){

        }
    });

    it('single', async () => {
        const arr = [3];
        const r = await F.foldl1((acc, e) => acc + e, arr);
        assert.deepEqual(r, 3);
    });

    it('add2', async () => {
        const arr = [1,2,3];
        const r = await F.foldl1((acc, e) => 3*acc + e, arr);
        assert.deepEqual(r, 18);
    });

    it('add3', async () => {
        const arr = ["a","b","c"];
        const r = await F.foldl1((acc, e) => acc + e, arr);
        assert.deepEqual(r, "abc");
    });
    


});