import { sellersBestSellers, sellersPendingOrders } from 'api/src';

const bestSellingProducts = () => {
    const config = sellersBestSellers(
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
    const config = sellersPendingOrders(
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
