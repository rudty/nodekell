import { curry } from "./curry";

export const errorThen = curry(async function *(supply, iter){
    try {
        yield* iter;
    } catch(e) {
        supply = await supply;

        if (supply instanceof Function) {
            supply = await supply(e);
        }

        if(supply && (supply[Symbol.iterator] || supply[Symbol.asyncIterator])) {
            yield* supply;
        }
    }
});