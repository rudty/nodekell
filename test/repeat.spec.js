"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test repeat', () => {
    it('value', async () => {
        const r = F.repeat(3);
        for(let i = 0; i < 10; i++) {
            const { value, done } = await r.next();
            assert.strictEqual(false, done);
            assert.strictEqual(value, 3);
        }
    });

    it('value2', async () => {
        const r = F.repeat(3);
        let i = 0;
        for await(const e of r) {
            assert.strictEqual(e, 3); 
            if(i++ > 10) {
                break;
            }
        }
    });

    it('fun', async () => {
        const r = F.repeat(()=>{return 3;});
        let i = 0;
        for await(const e of r) {
            assert.strictEqual(e, 3); 
            if(i++ > 10) {
                break;
            }
        }
    }); 

    it('promise fun2', async () => {
        const r = F.repeat(
            Promise.resolve(()=>{return 3;})
        );
        let i = 0;
        for await(const e of r) {
            assert.strictEqual(e, 3); 
            if(i++ > 10) {
                break;
            }
        }
    }); 

    it('promise fun promise', async () => {
        const r = F.repeat(
            Promise.resolve(()=>{return Promise.resolve(3);})
        );
        let i = 0;
        for await(const e of r) {
            assert.strictEqual(e, 3); 
            if(i++ > 10) {
                break;
            }
        }
    }); 

    it('with run', async () => {
        const v = await F.run(
            F.repeat(1),
            F.map(e => e + 1),
            F.take(5), 
            F.collect); 

        assert.deepStrictEqual([2,2,2,2,2], v);
    });

    it('repeat count', async () => {
        const v = await F.run(
            F.repeat(3, 5),
            F.collect); 

        assert.deepStrictEqual([5,5,5], v);
    });

    it('repeat count', async () => {
        const v = await F.run(
            F.repeat(3, 5),
            F.collect); 

        assert.deepStrictEqual([5,5,5], v);
    });
});