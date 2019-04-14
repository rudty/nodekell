'use strict';
const C = require("./core.js");
const P = require("./prelude.js")

const sleep = (t) => new Promise(r => {
    setTimeout(r, t);
});
exports.sleep = sleep;

const errorSleep = t => new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error("timeout error"));
    }, t);
});

const getDuration = async duration => {
    duration = await duration;

    if (duration instanceof Function) {
        duration = await duration();
    } 

    if (duration <= 0) {
        throw new Error("duration > 0 required")
    }
    return duration;
};

exports.withTimeout = C.curry(async function*(duration, iter) {
    duration = await getDuration(duration);
    
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

exports.timeout = C.curry(async (duration, a) => {
    duration = await getDuration(duration);

    const s = errorSleep(duration);
    
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

exports.rangeInterval = async function*(duration, ...k) {
    duration = await getDuration(duration);

    await sleep(duration);
    for (const e of P.range(...k)) {
        yield e;
        await sleep(duration);
    }
};