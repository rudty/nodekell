"use strict";
const F = require("../index");
const assert = require("assert");

describe('test cond', () => {
    it('value', async () => {
        const r = await F.cond( 
            true, "true1",
            () => true, "true2"
        );

        assert.strictEqual(r, "true1");
    });

    it('value2', async () => {
        const r = await F.cond( 
            false, "false1",
            () => true, "true2"
        );

        assert.strictEqual(r, "true2");
    });

    it('async', async () => {
        const r = await F.cond( 
            Promise.resolve(false), "f",
            Promise.resolve(true), "t1",
            F.otherwise, "t2"
        );

        assert.strictEqual(r, "t1");
    });

    it('async2', async () => {
        const r = await F.cond( 
            Promise.resolve(false), "f",
            (async () => true)(), "t0",
            Promise.resolve(true), "t1",
            F.otherwise, "t2"
        );

        assert.strictEqual(r, "t0");
    });

    // it('async3', async () => {
    //     const r = await F.cond( 
    //         Promise.resolve(false), "f",
    //         true, "t0",
    //         Promise.resolve(true), "t1",
    //         F.otherwise, "t2"
    //     );

    //     assert.strictEqual(r, "t0");
    // });

    it('even arg', async () => {
        try{
            const r = await F.cond(1);
            assert.fail("must even arg")
        } catch {

        }
    });

    it('not match', async () => {
        try{
            const r = await F.cond(1);
            assert.fail("must even arg")
        } catch {

        }
    });

});