"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test interval', () => {
    it('default', async () => {
        const r = new Promise ((resolve, reject) =>{
            let runCount = 0;
            const x = F.interval(10, ()=>{
                runCount += 1;
                if(runCount > 2) {
                    x.run = false;
                    resolve();
                }
            });
        });
        await r;
    });

    it('cacnel', async () =>{
        let runCount = 0;
        const x = F.interval(100, () => {
            F.run(
                F.range(Math.floor(Math.random() * 7)),
                F.then(_ =>{
                    runCount += 1
                    if(runCount > 5) {
                        assert.fail("stop interval")
                    }
                }))
        });
        x.run = false;
    });

    it('async function', async () =>{
        const x = F.interval(1000, async () => {
            await F.run(
                F.range(5),
                F.then(async _ =>{
                    await F.sleep(1000);
                    // console.log("END");
                }));
        });
        x.run = false; 
    });

    it('async', async () =>{
        let runCount = 0;
        const x = F.interval(10, async () => {
            runCount += 1;
            await F.sleep(50);
            x.run = false;
        });
        await F.sleep(300);
        assert.strictEqual(runCount, 1);
    });

    it('asyncAndThrow', async () =>{
        let runCount = 0;
        const x = F.interval(10, async () => {
            runCount += 1;
            await F.sleep(50);
            if (runCount === 3) {
                x.run = false;
            }
            throw new Error("test");
        });
        await F.sleep(300);
        assert.strictEqual(runCount, 3);
    });
});