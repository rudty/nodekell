import { fmap } from "./fmap";
import { identity } from "./identity";

/**
 * **deprecated** 
 * deprecated. use flat or dflat instead.
 * 
 * @param  {...Object} a any range
 */
export const rangeOf = (...a) => fmap(identity, a);