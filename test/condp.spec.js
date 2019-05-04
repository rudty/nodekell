"use strict";
const F = require("../index");
const assert = require("assert");

describe('test condp', () => {
    // it('compare', async () => {
    //     const value = 0;
    //     const r = await F.condp(
    //         (a,b)=>a === b, 
    //         value, 
    //         0, "0",
    //         1, "1",
    //         2, "2",
    //     );

    //     assert.strictEqual(r, "0");
    // });

    // it('async compare', async () => {
    //     const value = 0;
    //     const r = await F.condp(
    //         (a,b) => a === b, 
    //         value, 
    //         Promise.resolve(0), "0",
    //         Promise.resolve(1), "1",
    //         Promise.resolve(2), "2",
    //     );

    //     assert.strictEqual(r, "0");
    // });


    // it('else', async () => {
    //     const value = 100;
    //     const r = await F.condp(
    //         (a,b) => a === b, 
    //         value, 
    //         Promise.resolve(0), "0",
    //         Promise.resolve(1), "1",
    //         Promise.resolve(2), "2",
    //         "else"
    //     );

    //     assert.strictEqual(r, "else");
    // });

    // it('with other func', async () => {
    //     const value = [1,2,3,4];
    //     const r = await F.condp(
    //         F.some, 
    //         value, 
    //         e => [8,5,9].includes(e), F.inc,
    //         e => [8,5,4].includes(e), F.dec,
    //         e => [1,2,3].includes(e), F.identity,
    //     );

    //     assert.strictEqual(r(0), -1);
    // });
});