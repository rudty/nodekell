import { curry } from "./curry";
import { findAllSubMatch } from "./internal/regex";

export interface ReFindAllSubmatch {
    /**
     * Use regular expression
     * return all matching in str and groups
     * @example
     * const r = F.reFindAllSubmatch(/H(\d)/, "H1ello H2World");
     * console.log(r[0][0]); // print H1
     * console.log(r[0][1]); // print 1
     *
     * console.log(r[1][0]); // print H2
     * console.log(r[1][1]); // print 2
     *
     * @param re find regex
     * @param str find String
     * @returns Array<Array<String>> matching strings and groups
     */
    (re: RegExp | string, str: string): string[][];
    (re: RegExp | string): (str: string) => string[][];
}

export const reFindAllSubmatch: ReFindAllSubmatch = curry((re: RegExp | string, str: string): string[][] => {
    const r: any[] = [];
    findAllSubMatch(re, str, (e) => r.push(e));
    return r;
});
