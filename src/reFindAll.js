import { curry } from "./curry";
import { findAllSubMatch } from "./internal/regex";
/**
 * Use regular expression
 * return all matching in str
 * @example
 *      const r = F.reFindAll(/H(\d)/, "H1ello H2World");
 *      console.log(r);
 *      //print ['H1', 'H2']
 * 
 * @param {RegExp} re find regex
 * @param {String} str find String
 * @returns {Array} Array<String> matching strings
 */
export const reFindAll = curry((re, str) => {
    const r = [];
    findAllSubMatch(re, str, (e) => r.push(e[0]));
    return r;
});