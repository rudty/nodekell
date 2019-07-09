import { seq } from "../seq";

const default_fetch_count = 100;
let global_fetch_count = default_fetch_count;

export const parallel_set_fetch_count_internal = (count) => {
    count = Number(count);
    if (count <= 0) {
        throw new Error("count > 0 required");
    }
    global_fetch_count = count || default_fetch_count;
};

export const parallel_get_fetch_count_internal = () => global_fetch_count;

export const parallel_fetch_map_internal = async (iter, fn) => {
    // fetch (n - 1) here
    const fetchCount = global_fetch_count - 1;
    console.log(iter.constructor);
    const g = seq(iter);
    console.log(g);
    console.log(g.next);
    for (let i = fetchCount; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        fn(e.value);
    }
    return g;
};