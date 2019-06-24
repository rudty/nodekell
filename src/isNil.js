import { undefinedValue } from "./internal/undefinedValue";

export const isNil = (v) => {
    if (v) {
        return false;
    }

    switch(v){
        case null: return true;
        case undefinedValue: return true;
        default: return Number.isNaN(v);
    }
};
