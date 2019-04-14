"use strict";
const F = require("../index");
const assert = require("assert");

describe('test timeout', () => {

    it('call', async () => {
        const foo = async () => {
            await F.sleep(1);/*something work*/
            return 1;
        };
        const v = await F.timeout(40, foo());
        assert.strictEqual(v, 1);
    });

    it('async func fail', async() => {
        try{
            await F.timeout(40, async ()=>{
                await F.sleep(1000);
            });
            assert.fail("must fail");
        } catch {
            
        }
    });

    it('async func ok', async() => {
        try{
            await F.timeout(100, async ()=>{
                await F.sleep(1);
            });
        } catch {
           
        }
    });


    it('async promise ok', async() => {
        try{
            await F.timeout(100, (async ()=>{
                await F.sleep(1);
            })());
        } catch(e) {
           console.log(e);
           assert.fail("must pass");
        }
    });

    it('async promise fail', async() => {
        try{
            await F.timeout(10, (async ()=>{
                await F.sleep(200);
            })());

            assert.fail("must fail");
        } catch(e) {
        }
    });
});