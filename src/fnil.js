/**
 * 
 * first argument is the calling function. from the second argument, 
 * the argument is entered as the first argument.
 * returns a function calls first argument,
 * if a function has a argument, it acts as a substitute for an existing argument.
 * 
 * @example
 *      function sayHello(who) {
 *          console.log("hello " + who);
 *      }
 * 
 *      const sayHelloWithDefault = F.fnil(sayHello, "javascript");
 *      sayHelloWithDefault(); // print hello javascript
 *      sayHelloWithDefault("leanne"); // print hello leanne
 * 
 * @param {Function} fn call function
 * @param {...Object} dArgs defaultArguments
 * @return {Function} function that calls fn
 */
export const fnil = (fn, ...dArgs) => (...args) => {
    return fn(...Object.assign([], dArgs, args));
};