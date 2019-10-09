import { curry } from "./curry";

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
const lessOrEqual = (a) => a ? -1 : 0;

const _compareRhs = (fn, a, b) => {
    const ab = fn(a, b);
    if(ab instanceof Promise) {
        return ab.then(lessOrEqual);
    }
    return lessOrEqual(ab);
};

const _compareLhsOrRhs = (fn, a, b) => (r) => {
    if (r) {
        return 1;
    }
    return _compareRhs(fn, a, b);
};

const _comparator = (fn, a, b) => {
    const ba = fn(b, a);
    if (ba instanceof Promise) {
        return ba.then(_compareLhsOrRhs(fn, a, b));
    }
    return _compareLhsOrRhs(fn, a, b)(ba);
};

const _comparatorAwait = async (fn, a, b) => {
    return _comparator(fn, (await a), (await b));
};

/**
 * Can be used with sort function
 * @example
 *      const cmp = F.comparator((a, b) => a < b);
 *      console.log(cmp(1, 2)); // print -1 
 * @see sort
 * @see sortBy
 *
 * @param fn compare function (lhs: any, rhs: any): bool
 * @param a lhs
 * @param b rhs
 */
export const comparator = curry((fn, a, b) => {
    if (a instanceof Promise || b instanceof Promise) {
        return _comparatorAwait(fn, a, b);
    }
    return _comparator(fn, a, b);
});