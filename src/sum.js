import { foldl1 } from "./foldl"
import { add } from "./add"

export const sum = foldl1(add);
