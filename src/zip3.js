import { curry } from "./curry"
import { zipWith3 } from "./zipWith3"
export const zip3 = curry((iter1, iter2, iter3) => zipWith3((elem1, elem2, elem3) => [elem1, elem2, elem3], iter1, iter2, iter3));
