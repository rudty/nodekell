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

exports.timeout = C.curry((time, a) => {

    if (time <= 0) {
        throw new Error("arg time > 0 required")
    }
    
    const s = errorSleep(time);

    if (a[Symbol.iterator] || a[Symbol.asyncIterator]) { 
        const g = C.seq(a);
        return (async function*(){
            while(true) {
                const it = g.next();
                const e = await Promise.race([s, it]);
                if(e.done) {
                    break;
                }
                yield e.value;
            }
            s.catch( _ => {});
        })();
    } 

    let r;
    if (a instanceof Function) {
        r = Promise.race([s, a()]);
    } else {
        r = Promise.race([s, a]); 
    }

    return r.then(e => {
        s.catch( _ => {});
        return e;
    });
    
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