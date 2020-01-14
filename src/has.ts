import { curry } from "./curry";
import { undefinedValue, _isFunction } from "./internal/typeTraits";

export interface Has {
    // tslint:disable-next-line: no-unnecessary-generics
    <T>(key: any, target: T): boolean;
    // tslint:disable-next-line: no-unnecessary-generics
    <T>(key: any): (target: T) => boolean;
}

export const has: Has = curry((key: any, target: any): boolean => {
    if (target) {
        if (_isFunction(target.has) && target.has(key)) {
            return true;
        }
        return target[key] !== undefinedValue;
    }
    return false;
});
