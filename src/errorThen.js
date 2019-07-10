import { curry } from "./curry";
import { _hasIterator } from "./internal/typeTraits";

export const errorThen = curry(async function *(supply, iter){
    try {
        yield* iter;
    } catch(e) {
        supply = await supply;

        if (supply instanceof Function) {
            supply = await supply(e);
        }

        if(supply && _hasIterator(supply)) {
            yield* supply;
        }
    }
});