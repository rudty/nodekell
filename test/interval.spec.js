"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test interval', () => {
    it('default', async () => {
        const r = new Promise ((resolve, reject) =>{
            let runCount = 0;
            const x = F.interval(()=>{
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
        const x = F.interval(() => {
            F.run(
                F.range(Math.floor(Math.random() * 7)),
                F.then(_ =>{
                    runCount += 1
                    if(runCount > 5) {
                        assert.fail("stop interval")
                    }
                }))
        }, 100);
        x.run = false;
    });

    it('async function', async () =>{
        F.interval(async () => {
            await F.run(
                F.range(5),
                F.then(async _ =>{
                    await F.sleep(1000);
                    // console.log("END");
                }));
        }, 1000);
        x.run = false; //remove for test
    });
});