import { curry } from "./curry";
import { get } from "./get";
import { _collectInternal } from "./internal/collectInternal";


//juxtO(["A","C"], {A:1,B:2,C:3});
//=>[1,3]

//juxtO(["A","C"], {});
//=>[undefined, undefined]

//juxtO(["A","C"],  new Map([["A", 1], ["B", 2], ["C", 3]]));
//=>[1,2]
export const juxtO = curry(async (ap, obj) => {
    ap = await _collectInternal(ap);

    const r = [];
    for (const k of ap) {
        r.push(get(k, obj));
    }
    
    return r;
});