import { curry } from "./curry";
import { findAllSubMatch } from "./internal/regex";

export const reFindAll = curry((re, str) => {
    const r = [];
    findAllSubMatch(re, str, e => r.push(e[0]));
    return r;
});