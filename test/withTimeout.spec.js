"use strict";
const F = require("../index");
const assert = require("assert");

describe('test withTimeout', () => {

    it('must error', async () => {
        try{
            const a = [1,2,3,4,5];
            const t = F.withTimeout(50, 
                F.map(async e => {
                    await F.sleep(5);
                    return e;
                }, a));
            const v = await F.collect(t);
            assert.fail("must error");
        } catch {
            
        }
    });

    it('pass', async () => {
        try{
            const t = F.withTimeout(50, [1,2,3,4,5]);
            const v = await F.collect(t);
            assert.deepStrictEqual(v,[1,2,3,4,5]);
        } catch (e) {
            assert.fail("must pass" + e);
        }
    });


    it('with run some', async () => {
        const res = [];
        try{
            const iter = await F.run(
                F.range(Infinity),
                F.map(e => e + 1),
                F.map(async e => {
                    await F.sleep(5);
                    return e;
                }),
                F.withTimeout(40),
                F.take(10));
            
            for await (const e of iter) {
                res.push(e);
            }
        } catch(ex) {
            // console.log(ex);
        }
        // console.log(res);
        assert.strictEqual(true, res.length > 0);
        assert.strictEqual(true, res.length !== 10);
    });

    it('with run pass', async () => {
        try{
            const v = await F.run(
                F.range(Infinity),
                F.withTimeout(40),
                F.map(e => e + 1),
                F.take(10),
                F.collect);
            assert.deepStrictEqual(v,[1,2,3,4,5,6,7,8,9,10]);
        } catch(e) {
            assert.fail("must error");
        }
    });


    it('with run fail', async () => {
        try{
            const v = await F.run(
                F.range(Infinity),
                F.withTimeout(40),
                F.map(e => e + 1),
                F.map(async e => {
                    await F.sleep(5);
                    return e;
                }),
                F.take(10),
                F.collect);
            assert.fail("must error");
        } catch(e) {
        }
    });

    it('sleeping...', async () => {
        try{
            const v = await F.run(
                F.range(Infinity),
                F.map(e => e + 1),
                F.map(async e => {
                    await F.sleep(1000);
                    return e;
                }),
                F.take(10),
                F.withTimeout(1),
                F.collect);
            assert.fail("must error");
        } catch(ex) {
            // console.log(ex);
        }
    });

});