import { curry } from "./curry";

/**
 * const r = doto({a: 1}, function () {
 *      this.a = 3;
 * }, function () {
 *      this.b = 2;
 * });
 * 
 * console.log(r); => { a: 1, b: 2 };
 */
const doto = curry(async (x, fn1, ...fns) => {
    await f.call(fn1);
    for await (const f of fns) {
        f.call(x);
    }
});