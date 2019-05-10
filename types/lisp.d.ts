import {
    EP,
    Find,
    PairRepeat,
    PickElements,
} from "./utils";

/**
 * https://github.com/rudty/nodekell#otherwise
 */
export function otherwise(): true;

/**
 * https://github.com/rudty/nodekell#cond
 *
 * Requires an even number of arguments
 *
 * if the first argument is true, it returns the second argument
 */
export function cond<T extends PairRepeat<2, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<4, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<6, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<8, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<10, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<12, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<14, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<16, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<18, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<20, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<22, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<24, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<26, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<28, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<30, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<32, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<34, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<36, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<38, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<40, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<EP<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
