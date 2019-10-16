import { _collectArray } from "./internal/collectArray";
import { curry } from "./curry";
/**
 * combine elements from two iterables based on the related elements between them.
 * works like TSQL
 * ---------------------
 * create table Orders(
 *	 orderID int,
 *   customerID int,
 *   info varchar(30)
 * );
 *
 * create table Customers(
 *    customerID int,
 *    customerName varchar(30)
 * );
 *
 * insert into Orders values(1,1,'t1');
 * insert into Orders values(2,1,'t2');
 * insert into Orders values(3,1,'t3');
 * insert into Orders values(4,2,'t4');
 * insert into Orders values(5,3,'t5');
 * insert into Orders values(6,4,'t6');
 *
 * insert into Customers values(1, 'ana');
 * insert into Customers values(2, 'cdn');
 * insert into Customers values(3, 'krw');
 * ---------------------
 * select (*)
 * from Customers C
 * join Orders O
 * on C.customerID = O.customerID
 * ---------------------
 * customerID, customerName, orderID, customerID, info
 * '1','ana','1','1','t1'
 * '1','ana','2','1','t2'
 * '1','ana','3','1','t3'
 * '2','cdn','4','2','t4'
 * '3','krw','5','3','t5'
 * ---------------------
 *
 * @param {Function} fn (elem1, elem2): bool | Promise<bool>
 * @param {Iterable | AsyncIterable} xs iterable
 * @param {Iterable | AsyncIterable} ys iterable
 */
export const innerJoin2 = curry(async function *(fn, xs, ys) {
    ys = await _collectArray(ys);

    for await (const l of xs) {
        for (let j = 0; j < ys.length; ++j) {
            const r = ys[j];
            if (await fn(l, r)) {
                yield [l, r];
            }
        }
    }
});
