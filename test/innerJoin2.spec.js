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
    const promiseJoinByCustomerId = (a, b) => Promise.resolve(a.customerId === b.customerId);

    it('default', async () => {
        const r0 =  await F.collect(
            F.innerJoin2(joinByCustomerId, orders, customers)
        );
        assert.deepStrictEqual(r0, [ 
      [ { orderId: 1, customerId: 1, desc: 't1' },
        { customerId: 1, name: 'ana' } ],
      [ { orderId: 2, customerId: 1, desc: 't2' },
        { customerId: 1, name: 'ana' } ],
      [ { orderId: 3, customerId: 1, desc: 't3' },
        { customerId: 1, name: 'ana' } ],
      [ { orderId: 4, customerId: 2, desc: 't4' },
        { customerId: 2, name: 'cdn' } ],
      [ { orderId: 5, customerId: 3, desc: 't5' },
        { customerId: 3, name: 'krw' } ] ]);
    });

    it('compare promise', async () => {
        const r0 =  await F.collect(
            F.innerJoin2(promiseJoinByCustomerId, orders, customers)
        );
        assert.deepStrictEqual(r0, [ 
      [ { orderId: 1, customerId: 1, desc: 't1' },
        { customerId: 1, name: 'ana' } ],
      [ { orderId: 2, customerId: 1, desc: 't2' },
        { customerId: 1, name: 'ana' } ],
      [ { orderId: 3, customerId: 1, desc: 't3' },
        { customerId: 1, name: 'ana' } ],
      [ { orderId: 4, customerId: 2, desc: 't4' },
        { customerId: 2, name: 'cdn' } ],
      [ { orderId: 5, customerId: 3, desc: 't5' },
        { customerId: 3, name: 'krw' } ] ]);
    });


    const ordersMap = new Map([
        [1, newOrder(1, 1, "t1")],
        [2, newOrder(2, 1, "t2")],
        [3, newOrder(3, 1, "t3")],
        [4, newOrder(4, 2, "t4")],
        [5, newOrder(5, 3, "t5")],
        [6, newOrder(6, 4, "t6")],
    ]);

    const customersMap = new Map([
        [1, newCustomer(1, "ana")],
        [2, newCustomer(2, "cdn")],
        [3, newCustomer(3, "krw")],
    ]);

    const joinByMapCustomerId = (a, b) => a[1].customerId === b[0];

    it('map', async () => {
        const r0 =  await F.collect(
            F.innerJoin2(joinByMapCustomerId, ordersMap, customersMap)
        ); 
        assert.deepStrictEqual(r0, [[[1, { "orderId": 1, "customerId": 1, "desc": "t1" }], [1, { "customerId": 1, "name": "ana" }]], [[2, { "orderId": 2, "customerId": 1, "desc": "t2" }], [1, { "customerId": 1, "name": "ana" }]], [[3, { "orderId": 3, "customerId": 1, "desc": "t3" }], [1, { "customerId": 1, "name": "ana" }]], [[4, { "orderId": 4, "customerId": 2, "desc": "t4" }], [2, { "customerId": 2, "name": "cdn" }]], [[5, { "orderId": 5, "customerId": 3, "desc": "t5" }], [3, { "customerId": 3, "name": "krw" }]]]);
    });
});
