import { curry } from "./curry"
import { zipWith } from "./zipWith"
export const zip = curry((iter1, iter2) => zipWith((elem1, elem2) => [elem1, elem2], iter1, iter2));
