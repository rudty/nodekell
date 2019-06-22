import { curry } from "./curry";
import { seq } from "./seq";
import * as P from "./internal/parallel";
import { Queue } from "./queue";

const fetch_call_internal =  async (f, iter) => { 
    const fetch_count = P.parallel_get_fetch_count_internal();
    const g = seq(iter);
    for (let i = fetch_count; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        f.add(e.value());
    }
    return g;
}

const pcalls_internal = async function*(iter) {

    const f = new Queue();
    const g = await fetch_call_internal(f, iter);
    
    for await(const e of g) {
        f.add(e());
        yield f.poll();
    } 

    yield* f.removeIterator();
};

export const pcalls = curry(async function*(...a) {
    if (a.length === 1) {
        if (a[0][Symbol.iterator] || a[0][Symbol.asyncIterator]) {
            yield* pcalls_internal(a[0]);
            return;
        }
    }
    yield* pcalls_internal(a);
});
