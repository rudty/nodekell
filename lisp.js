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
// exports.otherwise = () => true;
exports.cond = (v, ...cv) => {
    for (let i = 0; i < cv.length; i += 2) {
        if (cv[i](v)) {
            return cv[i + 1];
        }
    }
    // return undefined ??? ;
    // throw notmatchingexception
};