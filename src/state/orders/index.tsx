import { sellersProductsSellerOrdersList, sellersReturnsFromSales } from 'api/src';

const getSellerProductsOrders = () => {
    const config = sellersProductsSellerOrdersList(
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
            update: {
                orderReturns: (prev: any, next: any) => next,
            },
        },
    );

    return config;
};

export { getSellerProductsOrders, getOrderReturns };
