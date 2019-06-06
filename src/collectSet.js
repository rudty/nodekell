import { collect } from "./collect"
export const collectSet = async (iter) => new Set(await collect(iter));
