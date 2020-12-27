import { sellersOrders, sellersReturnsFromSales } from 'api/src';

const getSellerProductsOrders = () => {
    const config = sellersOrders(
        {
            limit: 10,
            offset: 1,
        },
        {
            update: {
                sellerOrders: (prev: any, next: any) => next,
            },
        },
    );

    return config;
};

const getOrderReturns = () => {
    const config = sellersReturnsFromSales(
        {
            limit: 10,
            offset: 1,
        },
        {
            transform: (body: any) => ({
                orderReturns: body,
            }),
            update: {
                orderReturns: (prev: any, next: any) => next,
            },
        },
    );

    return config;
};

export { getSellerProductsOrders, getOrderReturns };
