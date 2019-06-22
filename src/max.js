import { identity } from "./identity";
import { maxBy } from "./maxBy";

/**
 * Gets the max value in the range
 *
 * await F.max([1,2,3,4,5]);
 * 
 * => 5
 */
export const max = maxBy(identity);
