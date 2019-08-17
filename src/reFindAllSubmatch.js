import { curry } from "./curry";
import { findAllSubMatch } from "./internal/regex";

/**
 * Use regular expression
 * return all matching in str and groups
 * @example
 *      const r = F.reFindAllSubmatch(/H(\d)/, "H1ello H2World");
 *      console.log(r[0][0]); // print H1
 *      console.log(r[0][1]); // print 1 
 * 
 *      console.log(r[1][0]); // print H2
 *      console.log(r[1][1]); // print 2
 *      
 * 
 * @param {RegExp} re find regex
 * @param {String} str find String
 * @returns {Array} Array<Array<String>> matching strings and groups
 */
export const reFindAllSubmatch = curry((re, str) => {
    const r = [];
    findAllSubMatch(re, str, e => r.push(e));
    return r;
});