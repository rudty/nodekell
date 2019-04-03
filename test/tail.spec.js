"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test tail', () => {
    it('from array', async () => {
        const a = [10,9,8,7];
        const r = F.tail(a);

        assert.deepStrictEqual(
            await F.collect(r), 
            [9,8,7]);
        
        const r2 = F.tail(a);
        assert.deepStrictEqual(
            await F.collect(r2), 
            [9,8,7]);
    });

    it('from seq', async () => {
        const a = F.seq([10,9,8,7]);
        for await (const e of F.tail(a)){
            assert.strictEqual(e, 9);
            return;
        }
        assert.fail("9,8,7");
    });

});