import { _collectArray } from "./internal/collectArray";
export const collectMap = async (iter) => new Map(await _collectArray(iter));
