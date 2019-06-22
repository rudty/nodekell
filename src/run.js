import { foldl } from "./foldl";

/**
 * like `$` or `.`
 *  let a = [1,2,3,4,5];
 *  let r = await F.run(a,
 *           F.map(e => e + 1), // a = [2,3,4,5,6]
 *           F.filter(e => e < 4), // a = [2,3]
 *           F.take(Infinity),
 *           F.collect);
 * 
 *  console.log(r); // print [2,3]
 * 
 */
export const run = (iter, ...f) => foldl((z, fn) => fn(z), iter, f);
