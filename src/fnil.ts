/**
 * Make all properties in T optional
 */
export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export interface FNil {
    /**
     * first argument is the calling function. from the second argument,
     * the argument is entered as the first argument.
     * returns a function calls first argument,
     * if a function has a argument, it acts as a substitute for an existing argument.
     *
     * @example
     * function sayHello(who: any) {
     *   console.log("hello " + who);
     * }
     *
     * const sayHelloWithDefault = F.fnil(sayHello, "javascript");
     * sayHelloWithDefault(); // print hello javascript
     * sayHelloWithDefault("leanne"); // print hello leanne
     *
     * @param fn call function
     * @param dArgs defaultArguments
     * @return function that calls fn
     */
    <P extends any[], R>(fn: (...args: P) => R, ...dArgs: P): ((...args: Partial<P>) => R);
}
export const fnil = (fn: any, ...dArgs: any[]) => (...args: any[]) => {
    return fn(...(<any> Object).assign([], dArgs, args));
};
