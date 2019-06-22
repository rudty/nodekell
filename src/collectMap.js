import { collect } from "./collect";
export const collectMap = async (iter) => new Map(await collect(iter));
