import { curry } from "./curry";
import { reFindSubmatch } from "./reFindSubmatch";

/**
 * Use regular expression
 * return first matching in str and groups
 * @example
 *      const r = F.reFindSubmatch(/H(\d)/, "H1ello H2World");
 *      console.log(r[0]); // print H1
 *      console.log(r[1]); // print 1 
 * 
 *      
 * 
 * @param {RegExp} re find regex
 * @param {String} str find String
 * @returns {String} first matching string
 */
export const reFind = curry((re, str) => {
    const r = reFindSubmatch(re, str);
    return r[0] || "";
});