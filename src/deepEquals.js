import { curry } from "./curry"

export const deepEquals = curry(async (a, b) => {
    if (a === b) {
        return true;
    }

    if (a[Symbol.iterator] && b[Symbol.iterator]) {
        const it1 = a[Symbol.iterator]();
        const it2 = b[Symbol.iterator]();
    
        while (true) {
            const e1 = it1.next();
            const e2 = it2.next();
            if (e1.done === !e2.done) {
                //a = true && b = false 
                //a = false && b = true
                return false;
            }
            if (e1.done && e2.done) {
                //true, true
                break;
            }
            if (deepEquals(await e1.value, await e2.value)) {
                return false;
            }
        }
        return true;
    }

    if (a[Symbol.asyncIterator] && b[Symbol.asyncIterator]) {
        const it1 = a[Symbol.asyncIterator]();
        const it2 = a[Symbol.asyncIterator]();
    
        while (true) {
            const e1 = await it1.next();
            const e2 = await it2.next();
            if (e1.done === !e2.done) {
                //a = true && b = false 
                //a = false && b = true
                return false;
            }
            if (e1.done && e2.done) {
                //true, true
                break;
            }
            if (deepEquals(await e1.value, await e2.value)) {
                return false;
            }
        }
        return true;
    }


    if (a && b) {
        
    }
    return false;
});
