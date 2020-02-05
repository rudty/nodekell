import { undefinedValue } from "./internal/typeTraits";
export interface IsNil {
    /**
     * return false null, undefined, NaN true otherwise
     * @example
     * console.log(F.isNil(NaN)); // true
     * console.log(F.isNil(undefined)); //true
     * console.log(F.isNil(null)); //true
     * console.log(F.isNil("null")); // false
     * console.log(F.isNil("NaN")); //false
     * console.log(F.isNil(0)); // false
     * console.log(F.isNil(false)); // false
     * console.log(F.isNil([])); // false
     * console.log(F.isNil({})); // false
     * @param v any value
     */
    (v: any): boolean;
}

export const isNil: IsNil = (v: any): boolean => {
    if (v) {
        return false;
    }

    switch (v) {
        case null: return true;
        case undefinedValue: return true;
        default: return Number.isNaN(v);
    }
};
