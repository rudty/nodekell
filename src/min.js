import { identity } from "./identity";
import { minBy } from "./minBy";
/**
 * Gets the min value in the range
 *
 * await F.min([1,2,3,4,5,0]);
 * 
 * => 0
 */
export const min = minBy(identity);
