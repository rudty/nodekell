import { curry } from "./curry";
import { ExtractPromise } from "./internal/typeTraits";

export interface ComparatorFunctionType {
    /**
     * Can be used with sort function
     * @example
     * const cmp = F.comparator((a: number, b: number) => a < b);
     * console.log(cmp(1, 2)); // print -1
     *
     * const cmp2 = F.comparator<number>((a, b) => a < b);
     * console.log(cmp2(1, 2)); // print -1
     * @param fn compare function
     * @param lhs compare value
     * @param rhs compare value
     */
    (fn: (lhs: any, rhs: any) => boolean): (lhs: any, rhs: any) => number;
    (fn: (lhs: any, rhs: any) => Promise<boolean>): (lhs: any, rhs: any) => Promise<number>;
    <L, R>(fn: (lhs: ExtractPromise<L>, rhs: ExtractPromise<R>) => boolean, lhs: L, rhs: R): L extends Promise<any> ? Promise<number> : R extends Promise<any> ? Promise<number>: number;
    <L, R = L>(fn: (lhs: L, rhs: R) => boolean): (lhs: L, rhs: R) => number;
    <L, R = L>(fn: (lhs: L, rhs: R) => Promise<boolean>): (lhs: L | Promise<L>, rhs: R | Promise<R>) => Promise<number>;
    <L, R = L>(fn: (lhs: L, rhs: R) => Promise<boolean>, lhs: L | Promise<L>, rhs: R | Promise<R>): Promise<number>;
    <L, R = L>(fn: (lhs: ExtractPromise<L>, rhs: R) => boolean, lhs: L): (rhs: R) => L extends Promise<any> ? Promise<number>: number;
    <L, R = L>(fn: (lhs: L, rhs: R) => Promise<boolean>, lhs: L | Promise<L>): (rhs: R | Promise<R>) => Promise<number>;
}

/**
 *  if (a) {
 *      //less
 *      return -1;
 *  } else {
 *      //equal
 *      return 0;
 *  }
 * @param {Boolean} a
 */
const lessOrEqual = (a: any) => a ? -1 : 0;

const _compareRhs = (fn: any, a: any, b: any) => {
    const ab = fn(a, b);
    if (ab instanceof Promise) {
        return ab.then(lessOrEqual);
    }
    return lessOrEqual(ab);
};

const _compareLhsOrRhs = (fn: any, a: any, b: any) => (r: any) => {
    if (r) {
        return 1;
    }
    return _compareRhs(fn, a, b);
};

const _comparator = (fn: any, a: any, b: any) => {
    const ba = fn(b, a);
    if (ba instanceof Promise) {
        return ba.then(_compareLhsOrRhs(fn, a, b));
    }
    return _compareLhsOrRhs(fn, a, b)(ba);
};

const _comparatorAsync = async (fn: any, a: any, b: any) => {
    return _comparator(fn, (await a), (await b));
};

export const comparator = curry((fn: any, a: any, b: any) => {
    if (a instanceof Promise || b instanceof Promise) {
        return _comparatorAsync(fn, a, b);
    }
    return _comparator(fn, a, b);
});
