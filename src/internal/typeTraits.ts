export type ExtractPromise<T> = T extends Promise<infer PT> ? PT : T;
export type Iter<T> = Iterable<T> | AsyncIterable<T>; // | IterableIterator<T> | AsyncIterableIterator<T> | T[];
