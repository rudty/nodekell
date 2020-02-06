import { _isPrimitive } from "./internal/typeTraits";

export interface IsPrimitive {
    /**
     * check string, number, bigint, boolean, null, undefined, and symbol.
     * @example
     * F.isPrimitive(1) // true
     * F.isPrimitive(null) // true
     * F.isPrimitive(0) // true
     * F.isPrimitive(Symbol("HELLO")); // true
     * F.isPrimitive("HELLO") // true
     * F.isPrimitive(new String("HELLO")) // false
     * F.isPrimitive(new Number(123)) // false
     * F.isPrimitive({}) // false
     * F.isPrimitive([]) // false
     * F.isPrimitive(()=>{}) // false
     * @param a any value
     */
    (a: any): boolean;
}

export const isPrimitive: IsPrimitive = _isPrimitive;
