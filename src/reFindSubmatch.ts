import { curry } from "./curry";

export interface ReFindSubmatch {
    /**
     * Use regular expression
     * return first matching in str and groups
     * @example
     * const r = F.reFindSubmatch(/H(\d)/, "H1ello H2World");
     * console.log(r[0]); // print H1
     * console.log(r[1]); // print 1
     *
     * @param re find regex
     * @param str find String
     * @returns matching strings and groups
     */
    (re: RegExp | string, str: string): string[];
    (re: RegExp | string): (str: string) => string[];
}

export const reFindSubmatch: ReFindSubmatch = curry((re: any, str: string): string[] => {
    if (re.constructor !== RegExp) {
        re = new RegExp(re);
    }
    const m = re.exec(str);
    return m || [];
});
