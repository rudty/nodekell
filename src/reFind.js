import { curry } from "./curry";
import { reFindSubmatch } from "./reFindSubmatch";

/**
 * Use regular expression
 * return first matching in str
 * @example
 *      const r = F.reFind(/H(\d)/, "H1ello H2World");
 *      console.log(r); // print H1
 * 
 *      
 * 
 * @param {RegExp} re find regex
 * @param {string} str find String
 * @returns {string} first matching string
 */
export const reFind = curry((re, str) => {
    const r = reFindSubmatch(re, str);
    return r[0] || "";
});