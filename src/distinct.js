import { distinctBy } from "./distinctBy"
import { identity } from "./identity"

export const distinct = (iter) => distinctBy(identity, iter);