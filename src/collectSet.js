import { _collectArray } from "./internal/collectArray";
export const collectSet = async (iter) => new Set(await _collectArray(iter));
