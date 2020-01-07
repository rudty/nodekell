"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _curry = (fn) => (...a) => {
    if (fn.length <= a.length) {
        return fn(...a);
    }
    else {
        return (...b) => _curry(fn)(...a, ...b);
    }
};
function curry(fn) {
    return _curry(fn);
}
exports.curry = curry;
