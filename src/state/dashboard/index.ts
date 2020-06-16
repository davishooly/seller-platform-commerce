import { productsBestSeller, sellersProductsPendingOrders } from 'api/src';

const bestSellingProducts = () => {
    const config = productsBestSeller(
        {
            offset: 1,
            limit: 10,
        },
        {
            transform: (body: any) => ({
                bestSellerProducts: body,
            }),
            update: {
                bestSellerProducts: (prev: any, next: any) => next,
            },
        },
    );

    return config;
};

const getPendingOrders = () => {
    const config = sellersProductsPendingOrders(
        {},
        {
            transform: (body: any) => ({
                pendingOrders: body,
            }),
            update: {
                pendingOrders: (prev: any, next: any) => next,
            },
        },
    );

    return config;
};

export { bestSellingProducts, getPendingOrders };
