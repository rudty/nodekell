import { curry } from "./curry";

/**
 * It takes a value and a function and calls the function by value. 
 * Pass the value to the first argument when calling the function.
 *
 * @example
 *      const r = doto({a: 1}, function () {
 *          this.a = 3;
 *      });
 * 
 *      console.log(r); // print { a: 3 };
 *
 * @param {any} x value
 * @param {Function} fn1 function (this: T, x: T) => void
 */
export const doto = curry(async (x, fn1, ...fns) => {

    await fn1.call(x, x);

    for await (const f of fns) {
        await f.call(x, x);
    }

    return x;
});
