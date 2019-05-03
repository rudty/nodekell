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
exports.cond = (cond, value, f, ...fns) => {

};