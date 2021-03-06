import { curry } from "./curry";

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
 * @param {string} str find String
 * @returns {Array} Array<String> matching strings and groups
 */
export const reFindSubmatch = curry((re, str) => {
    if (re.constructor !== RegExp) {
        re = new RegExp(re);
    }
    const m = re.exec(str);
    return m || [];
});