/**
 * Returns an iterator that generates numbers.
 *
 * @example
 * for (const e of F.range(10)) {
 *   console.log(e);
 * }
 * //print 0 ~ 9
 *
 * for (const e of F.range(10, 0, -1)) {
 *   console.log(e);
 * }
 * //print 10 ~ 1
 *
 * @param begin from
 * @param end to
 * @param step change
 */
export interface Range {
    (end?: number): IterableIterator<number>;
    (begin: number, end: number, step?: number): IterableIterator<number>;
}

export const range: Range = function *(...k: any[]): IterableIterator<number> {
    let begin = 0;
    let end = Infinity;
    let n = 1;
    const len = k.length;

    switch (len) {
        case 1:
            end = k[0];
            break;
        case 2:
            begin = k[0];
            end = k[1];
            break;
        case 3:
            begin = k[0];
            end = k[1];
            n = k[2];
            break;
    }

    if (begin > end) {
        for (let i = begin; i > end; i += n) {
            yield i;
        }
    } else {
        for (let i = begin; i < end; i += n) {
            yield i;
        }
    }
};
