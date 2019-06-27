import { curry } from "./curry";
import { foldl } from "./foldl";
import { forEachIndexed } from "./forEachIndexed";
import { seq } from "./seq";
import { _collectInternal } from "./internal/collectInternal";


//juxtA([Math.max, Math.min], [1,2,3,4,5]);
//=>[1,5]

//juxtA([Math.max, Math.min], []);
//=>[undefined, undefined]
export const juxtA = curry(async (af, iter) => {
    af = await _collectInternal(af);

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
     * same 
     * 
     * foldl(async (acc, e) => {
     *   for (let i = 0; i < len; ++i) {
     *       acc[i] = af[i](acc[i], e);
     *       return Promise.all(acc);
     *   }
     *}, r, g);
     */
    return foldl((acc, e) => forEachIndexed((i, x) => af[i](x, e), acc), r, g);
});
