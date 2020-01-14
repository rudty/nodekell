import { curry } from "./curry";
import { findAllSubMatch } from "./internal/regex";

export interface ReFindAll {
    /**
     * Use regular expression
     * return all matching in str
     * @example
     *      const r = F.reFindAll(/H(\d)/, "H1ello H2World");
     *      console.log(r);
     *      //print ['H1', 'H2']
     *
     * @param re find regex
     * @param str find String
     * @returns matching strings
     */
    (re: RegExp | string, str: string): string[];
    (re: RegExp | string): (str: string) => string[];
}
export const reFindAll = curry((re: RegExp | string, str: string): string[] => {
    const r: string[] = [];
    findAllSubMatch(re, str, (e) => r.push(e[0]));
    return r;
});
