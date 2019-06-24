import { undefined } from "./internal/undefined";

export const isNil = (v) => {
    if (v) {
        return false;
    }

    switch(v){
        case null: return true;
        case undefined: return true;
        default: return Number.isNaN(v);
    }
};
