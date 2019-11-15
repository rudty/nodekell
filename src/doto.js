import { curry } from "./curry";

/**
 * const r = doto({a: 1}, function () {
 *      this.a = 3;
 * }, function () {
 *      this.b = 2;
 * });
 * 
 * console.log(r); => { a: 1, b: 2 };
 * 
 * like clojure doto,
 * like kotlin Any.apply
 */

 const _dotoCallFunctions = (x, fns) => {

 };

export const doto = curry(async (x, fn1, ...fns) => {

    const r0 = fn1.call(x, x);
    
    if (r0 instanceof Promise) {
        r0.then(() => _dotoCallFunctions(x, fns));
    }
    // for await (const f of fns) {
    //     await f.call(x, x);
    // }

    return x;
});
