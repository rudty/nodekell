'use strict';
const C = require("./core.js");

const sleep = (t) => new Promise(r => {
    setTimeout(()=> r(), t);
});
exports.sleep = sleep;

const errorSleep = t => new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error("timeout error"));
    }, t);
});

exports.timeout = C.curry(async function*(supply, iter) {
    supply = await supply;

    if(supply <= 0) {
        throw new Error("arg supply > 0 required")
    }

    const g = C.seq(iter);
    const s = errorSleep(supply);
    
    while(true) {
        const it = g.next();
        const e = await Promise.race([s, it]);
        if(e.done) {
            break;
        }
        yield e.value;
    }
    s.catch( _ => {});
});

exports.interval = (timerHandler, timeout, ...param) => {

    if(!timeout || timeout < 10) {
        timeout = 10;
    }
    const k = { run: true }; 
    (async () =>{
        while (k.run) {
            try{
                const s = sleep(timeout);
                await timerHandler(...param);
                await s;
            } catch {
                //ignore
            }
        }
    })();
    return k;
};