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

export const doto = curry(async (x, fn1, ...fns) => {

    await fn1.call(x, x);

    for await (const f of fns) {
        await f.call(x, x);
    }

    return x;
});
