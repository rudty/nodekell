import { curry } from "./curry";
import { _isArrayLike } from "./internal/typeTraits";

const updateAsync = async (i, v, iter) => {
    
};

const updateAt = curry((i, v, iter) => {
    if (_isArrayLike(iter)) {
       const a = Array.from(iter);
       a[i] = v;
       return a; 
    }
    return updateAsync(i, v, iter);
});