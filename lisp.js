'use strict';
const C = require("./core.js");

// lisp
// (cond
//      (instance? String x) "string"
//      (> x 10) "greater than 10"
//      :else "other")))
// 
//
// js
// if (a instanceof String) {
//      return "String"
// } 
// else if (isnumber(a) && a > 10) {
//      return "greator than 10"
// }
// else return "other"

// exports.T = () => true;
// exports.F = () => false;
exports.otherwise = () => true;

const mustEvenArguments = (arr) => {
    if ((arr.length) & 1) {
        throw new Error("requires an even arguments");
    }
};

exports.cond = async (...cv) => {
    mustEvenArguments(cv);

    for (let i = 0; i < cv.length; i += 2) {

        if (await cv[i]) {
            return cv[i + 1];
        }
    }
    // return undefined
};

// clj
// (let [value 0]
//     (condp = value
//           1 "1"
//           2 "2"
//           3 "3"
//           "else"))
//
//
// js
// const value = 0;
// const r = condp((a,b) => a === b, 
//      value,
//      1, "1",
//      2, "2",
//      3, "3",
//      "else");
//
// result: "else" 

// (condp some [1 2 3 4]
//      #{1 9} :>> inc)
// result: 2
// 
// ((condp some [1 2 3 4]
//   #{1 9} inc) 1)
// result: 1


// await condp

const M = () => {};
exports.condp = async (fn, v, ...cv) => {
    for (let i = 0; i < cv.length;) {
        const e = await cv[i];
        const c = await cv[i + 1];
        if (c && c[Symbol.iterator] || c[Symbol.asyncIterator])
    }
    // for (let i = 0; i < cv.length; i += 2) {
    //     const e = await cv[i];
    //     if (await fn(e, v)) {
    //         return cv[i + 1];
    //     }
    // }

    // if ((cv.length) & 1) {
    //     return cv[cv.length - 1]        
    // }

    // throw new Error("no matching clause");
};

//cond->
// exports.condv = async (v, ...cv) => {
//     mustEvenArguments(cv);
    
//     for (let i = 0; i < cv.length; i += 2) {
//         if (await cv[i](v)) {
//             return cv[i + 1];
//         }
//     }
//     // return undefined ???
// };

