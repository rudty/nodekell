import {
    EP,
    Find,
    PairRepeat,
    PickElements,
} from "./utils";

export function otherwise(): true;

// type c = Find<true | (() => true), [false, () => false]>;

// type d = c extends never ? true : false;

// type b = PairRepeat<2, BF, any>;

// type a = PickElements<0, [() => boolean, number, () => boolean, string]>;
// type b = PickElements<1, Parameters<(a: () => boolean, b: number, c: () => boolean, d: string) => any>>;

export type BooleanFn = () => (boolean | Promise<boolean>);
export type BF = BooleanFn;
/**
 * can make [a, b, a, c, a, d] type ?
 */
export function cond<T extends PairRepeat<2, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<4, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<6, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<8, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<10, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<12, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<14, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<16, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<18, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function cond<T extends PairRepeat<20, BF | boolean | Promise<boolean>, any>>(...a: T): Promise<EP<Find<true | Promise<true> | (() => (true | Promise<true>)), T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;

// export type BFV<T> = ((v: T) => any) extends ((v: infer U) => any) ? (v: T) => (boolean | Promise<boolean>) : never;
// export type BFV<T> = BooleanFnWithValue<T>;
/**
 * No jsdoc
 */
/* export function condv<V, T extends PairRepeat<2, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function condv<V, T extends PairRepeat<4, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function condv<V, T extends PairRepeat<6, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function condv<V, T extends PairRepeat<8, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function condv<V, T extends PairRepeat<10, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function condv<V, T extends PairRepeat<12, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function condv<V, T extends PairRepeat<14, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function condv<V, T extends PairRepeat<16, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function condv<V, T extends PairRepeat<18, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
export function condv<V, T extends PairRepeat<20, BFV<V>, any>>(v: V, ...a: T): Promise<EP<Find<() => true, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
 */
