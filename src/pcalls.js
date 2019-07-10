import { curry } from "./curry";
import * as P from "./internal/parallel";
import { _Queue } from "./Queue";
import { _hasIterator } from "./internal/typeTraits";

const fetch_call_internal = (f, iter) =>
    P.parallel_fetch_map_internal(iter, (e) => f.add(e()));

const pcalls_internal = async function *(iter) {

    const f = new _Queue();
    const g = await fetch_call_internal(f, iter);
    
    for await(const e of g) {
        f.add(e());
        yield f.poll();
    } 

    yield* f.removeIterator();
};

export const pcalls = curry(async function *(...a) {
    if (a.length === 1) {
        if (_hasIterator(a[0])) {
            yield* pcalls_internal(a[0]);
            return;
        }
    }
    yield* pcalls_internal(a);
});
