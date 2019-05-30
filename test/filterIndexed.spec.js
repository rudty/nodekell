"use strict";
const F = require("../index");
const assert = require("assert");

describe('test filterIndexed', () => {
    it('array', async () => {
        const arr = [1,2,3,4,5];

        const filterFn = (i, e) => {
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
            return e % 2 === 0; 
        };

        const f = F.filterIndexed(filterFn, arr);
        
        assert.deepStrictEqual({done:false, value:2}, await f.next());
        assert.deepStrictEqual({done:false, value:4}, await f.next());
        assert.deepStrictEqual({done:true, value:undefined}, await f.next());
    });

    it('Promise Value', async () => {
        const arr = [Promise.resolve(1),2,3,4,5];

        const filterFn = (i, e) => {
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
            return e % 2 === 0; 
        };

        const f = F.filterIndexed(filterFn, arr);
        const result = await F.collect(f);
        assert.deepStrictEqual(result, [2,4]);
    });

    it('generator', async () => {
        const a = (function*(){
               for (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();

        const filterFn = (i, e) => {
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
            return e % 2 === 0; 
        };

        const filtered = F.filterIndexed(filterFn, a)
        const result = []
        for await (const e of filtered) {
           result.push(e); 
        }
        assert.deepStrictEqual(result, [2,4]);
    });

    it('async generator', async () => {
        const a = (async function*(){
               for await (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();

        const filterFn = (i, e) => {
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
            return e % 2 === 0; 
        };

        const f = F.filterIndexed(filterFn, a);
        const result = await F.collect(f);
        assert.deepStrictEqual(result, [2,4]);
    });
});