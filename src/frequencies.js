import { identity } from "./identity";

/**
 * frequency Count
 * 
 * @param {Iterable | AsyncIterable} iter any iterable
 * @return {Promise<Map>} frequencyMap
 */
export const frequencies = frequenciesBy(identity);