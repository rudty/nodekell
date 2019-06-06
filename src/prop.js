import { curry } from "./curry"
export const prop = curry((key, a) => a[key]);
