/**
 * empty object
 * it is always return true when used as an argument in `equals` and `match` function
 * @example
 * 
 *      F.equals(1, F._); // true
 *      F.equals({}, F._); // true
 *      F.equals({ a: 1 }, { a: F._ }); //true
 * 
 *      {} === F._; // false
 *      1 === F._; // false
 *      
 */
export const underBar = Object.freeze({});
export const _ = underBar;
