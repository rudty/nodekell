import { curry } from "./curry"
import { foldl } from "./foldl"
import { seq } from "./seq"

//juxt(["a","b"], {"a":1,"b":2,"c":3});
//=>[1,2]

//juxt([Math.max, Math.min], [1,2,3,4,5]);
//=>[1,5]
export const juxtR = curry(async (af, iter) => {
    const len = af.length;
    const g = seq(iter);
    const r = [];

    const h = await g.next();
    if(h.done) {
        return []; // or throw;
    }

    for (let i = 0; i < len; ++i) {
        r.push(h.value);
    }
    
    return foldl((acc, e) => {
        for (let i = 0; i < len; ++i) {
            acc[i] = af[i](acc[i], e);
        }
    }, r, iter);
});

export const juxtO = curry((ap, obj) => {
    const r = [];
    for (const k of ap) {
        r.push(obj[k]);
    }
    return k;
});