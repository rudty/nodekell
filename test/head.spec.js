"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test head', () => {
    it('from array', async () => {
        const a = [10,9,8,7];
        const r = await F.head(a);

        assert.deepStrictEqual(r, 10);
    });

    it('from seq', async () => {
        const a = F.seq([10,9,8,7]);
        await F.head(a);

        for await (const e of a){
            return;
        }
        assert.fail("9,8,7");
    });

    it('from array2', async () => {
        const a = [10,9,8,7];
        await F.head(a);

        for await (const e of a){
            assert.deepStrictEqual(e, 10); 
            return;
        }
   });

});