"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test forEach', () => {
    it('default', async () => {
        const a = [1,2,3,4,5];
        const r = [];
        const forEachFn = (i, e) => {
            switch(i){
            case 0:
                assert.deepEqual(e, 1);
                break;
            case 1:
                assert.deepEqual(e, 2);
                break;
            case 2:
                assert.deepEqual(e, 3);
                break;
            case 3:
                assert.deepEqual(e, 4);
                break;
            case 4:
                assert.deepEqual(e, 5);
                break;
            default:
                assert.fail("not def");
                break;
            }
            return r.push(e);
        };
        await F.forEachIndexed(forEachFn, a);    
        assert.deepStrictEqual(a, r);
    });

    it('async fn', async () => {
        const a = [1,2,3,4,5,6,7,8,9,10];
        const r = [];
        const beginTime = Date.now();
        const forEachFn = async (i, e) => {
            switch(i){
            case 0:
                assert.deepEqual(e, 1);
                break;
            case 1:
                assert.deepEqual(e, 2);
                break;
            case 2:
                assert.deepEqual(e, 3);
                break;
            case 3:
                assert.deepEqual(e, 4);
                break;
            case 4:
                assert.deepEqual(e, 5);
                break;
            case 5:
                assert.deepEqual(e, 6);
                break;
            case 6:
                assert.deepEqual(e, 7);
                break;
            case 7:
                assert.deepEqual(e, 8);
                break;
            case 8:
                assert.deepEqual(e, 9);
                break;
            case 9:
                assert.deepEqual(e, 10);
                break;
            default:
                assert.fail("not def");
                break;
            }
            await F.sleep(100);
            return r.push(e);
        };
        await F.run(a,  
            F.forEachIndexed(forEachFn)
        );    
        const endTime = Date.now();
        assert.strictEqual(true, (endTime - beginTime) < 200);
        assert.deepStrictEqual(a, r);
    });

    it('checktime', async () => {
        const beginTime = Date.now();
        const arr = ['a', 'b', 'c', 'd', 'e'];
        await F.forEachIndexed(async (i, e) => {
            await F.sleep(100);
            // console.log(i, e);
        }, arr);
        const endTime = Date.now();
        assert.ok(endTime - beginTime < 500);
    });
});