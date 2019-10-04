/**
 * Can be used with sort function
 * @example
 *      const cmp = F.comparator((a, b) => a < b);
 *      console.log(cmp(1, 2)); // print -1 
 * @see sort
 * @see sortBy
 *
 * @param fn compare function
 * @param a lhs
 * @param b rhs
 */
export const comparator = curry((fn, a, b) => {
    const ba = fn(b, a);
    if (ba instanceof Promise) {
        return ba.then(r0 => {
            if (r0) {
                return 1;
            } else {
                const ab = fn();
                if(ab instanceof Promise) {
                    return ab.then(r1 => {
                        if (r1) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                }
                if (ab) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
    }
    const ab = fn();
    if(ab instanceof Promise) {
        return ab.then(r1 => {
            if (r1) {
                return -1;
            } else {
                return 0;
            }
        });
    }
    if (ab) {
        return -1;
    } else {
        return 0;
    } 
});