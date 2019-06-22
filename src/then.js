import { curry } from "./curry";
export const then = curry((f, arg) => f(arg));
