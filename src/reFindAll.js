import { curry } from "./curry";
import { reFindAllSubmatch } from "./reFindAllSubmatch";

export const reFindAll = curry((re, str) => {
    const r = reFindAllSubmatch(re, str);
    return r.map(e => e[0]);
});