import { curry } from "./curry";
import { reFindSubmatch } from "./reFindSubmatch";

export interface ReFind {
    /**
     * Use regular expression
     * return first matching in str
     * @example
     * const r = F.reFind(/H(\d)/, "H1ello H2World");
     * console.log(r); // print H1
     *
     * @param re find regex
     * @param str find String
     * @returns first matching string
     */
    (re: RegExp | string, str: string): string;
    (re: RegExp | string): (str: string) => string;
}

export const reFind: ReFind = curry((re: RegExp | string, str: string): string => {
    const r = reFindSubmatch(re, str);
    return r[0] || "";
});
