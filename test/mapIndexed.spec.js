"use strict";
const F = require("../index.js");
const assert = require("assert");
    
describe('test mapIndexed', () => {
    it('array', async () => {
        const a = [1,2,3,4,5];

        const mappedFn = (i, e) => {
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
            return e + 1; 
        };

        const mapped = F.mapIndexed(mappedFn, a)
        const result = await F.collect(mapped);
        assert.deepStrictEqual(result, [2,3,4,5,6]);
    });

    it('Promise Value', async () => {
        const a = [Promise.resolve(1),2,3,4,5];

        const mappedFn = (i, e) => {
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
            return Promise.resolve(e + 1); 
        };

        const mapped = F.mapIndexed(mappedFn, a)
        const result = await F.collect(mapped);
        assert.deepStrictEqual(result, [2,3,4,5,6]);
    });

    it('generator', async () => {
        const a = (function*(){
               for (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();

        const mappedFn = (i, e) => {
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
            return Promise.resolve(e + 1); 
        };

        const mapped = F.mapIndexed(mappedFn, a)
        const result = await F.collect(mapped);
        assert.deepStrictEqual(result, [2,3,4,5,6]);
    });

    it('async generator', async () => {
        const a = (async function*(){
               for await (const e of [Promise.resolve(1),2,3,4,5]){
                    yield e;
               }
        })();
        
        const mappedFn = (i, e) => {
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
            return Promise.resolve(e + 1); 
        };

        const mapped = F.mapIndexed(mappedFn, a)
        const result = await F.collect(mapped);
        assert.deepStrictEqual(result, [2,3,4,5,6]);
    });
});