import { curry } from "./curry"
import { foldl } from "./foldl"
import { forEach } from "./forEach"
import { seq } from "./seq"
import { collect } from "./collect"

//juxt(["a","b"], {"a":1,"b":2,"c":3});
//=>[1,2]

//juxt([Math.max, Math.min], [1,2,3,4,5]);
//=>[1,5]

//juxt([Math.max, Math.min], []);
//=>[undefined, undefined]
export const juxtA = curry(async (af, iter) => {
    if (!Array.isArray(af)) {
        af = await collect(af);
    }

    const len = af.length;
    const g = seq(iter);
    const r = [];
    r.length = len;
    
    
    const firstElem = await g.next();
    if(firstElem.done) {
       //empty [undefined, undefined]
       return r; 
    }

    r.fill(firstElem.value);

    /**
     * foldl((acc, e) => {
     *   for (let i = 0; i < len; ++i) {
     *       acc[i] = af[i](acc[i], e);
     *       return acc;
     *   }
     *}, r, g);
     */
    return foldl((acc, e) => acc.map((x, i) => af[i](x, e)), r, g);
});

export const juxtO = curry((ap, obj) => {
    const r = [];
    for (const k of ap) {
        r.push(obj[k]);
    }
    return k;
});