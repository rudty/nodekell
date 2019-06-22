import { curry } from "./curry";
export const tap = curry(async (f, arg) => {
    await f(arg);
    return arg;
});
