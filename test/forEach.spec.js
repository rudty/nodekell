"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test forEach', () => {
    it('default', async () => {
        const a = [1,2,3,4,5];
        const r = [];
        await F.forEach(e => r.push(e), a);    
        // assert.deepStrictEqual(a, r);
    });

    it('async fn', async () => {
        const a = [1,2,3,4,5,6,7,8,9,10];
        const r = [];
        const beginTime = Date.now();
        await F.run(a,  
            F.forEach((async (e) => {
                await F.sleep(100);
                r.push(e);
            }))
        );    
        const endTime = Date.now();
        assert.strictEqual(true, (endTime - beginTime) < 200);
        assert.deepStrictEqual(a, r);
    });
});