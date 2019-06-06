import { foldl } from "./foldl"

/**
 * like `.` or `->>`
 *      let r = await F.pipe(
 *              F.map(e => e + 1), // a = [2,3,4,5,6]
 *              F.filter(e => e < 4), // a = [2,3]
 *              F.take(Infinity));
 * 
 *      let a = [1,2,3,4,5];
 *      for await (const e of await r(a)) {
 *          console.log(e);
 *      }
 * //result
 * //2
 * //3
 */
export const pipe = (f, ...fns) => (...args) => foldl((z, fn) => fn(z), f(...args), fns); 