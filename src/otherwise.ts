/**
 * if (F.otherwise) {
 *  // work
 * }
 *
 * if (F.otherwise()) {
 *  // work
 * }
 */
export const otherwise: true = <any> (() => true);
