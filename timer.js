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

exports.withTimeout = C.curry(async function*(duration, iter) {
    duration = await duration;

    if (duration instanceof Function) {
        duration = await duration();
    } 

    if (duration <= 0) {
        throw new Error("arg duration > 0 required")
    }
    
    const g = C.seq(iter);
    const s = errorSleep(duration); 

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

exports.timeout = C.curry(async (time, a) => {

    if (time <= 0) {
        throw new Error("arg time > 0 required")
    }
    
    const s = errorSleep(time);
    
    if (a instanceof Function) {
        a = a();
    }

    const r = Promise.race([s, a]);
    const e = await r;
    s.catch(C.fnothing);
    return e;
});

exports.interval = (timeout, timerHandler, ...param) => {

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