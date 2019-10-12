"use strict";
const F = require("../index");
const assert = require("assert");
    
describe('test innerJoin2', () => {
    const newOrder = (orderId, customerId, desc) => ({
        orderId,
        customerId,
        desc,
    });

    const newCustomer = (customerId, name) => ({
        customerId,
        name,
    });

    const orders = [
        newOrder(1, 1, "t1"),
        newOrder(2, 1, "t2"),
        newOrder(3, 1, "t3"),
        newOrder(4, 2, "t4"),
        newOrder(5, 3, "t5"),
        newOrder(6, 4, "t6"),
    ];

    const customers = [
        newCustomer(1, "ana"),
        newCustomer(2, "cdn"),
        newCustomer(3, "krw"),
    ];

    const joinByCustomerId = (a, b) => a.customerId === b.customerId;

    it('default', async () => {
        const r0 = await F.innerJoin2(joinByCustomerId, orders, customers);
        console.log(r0);
    });
});
