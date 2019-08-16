import { curry } from "./curry";
import { findAllSubMatch } from "./internal/regex";

export const reFindAllSubmatch = curry((re, str) => {
    const r = [];
    findAllSubMatch(re, str, e => r.push(e));
    return r;
});