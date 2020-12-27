import { sellersBestSellers, sellersPendingOrders } from 'api/src';

const bestSellingProducts = () => {
    const config = sellersBestSellers(
        {
            offset: 1,
            limit: 10,
        },
        {
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
            update: {
                pendingOrders: (prev: any, next: any) => next,
            },
        },
    );

    return config;
};

export { bestSellingProducts, getPendingOrders };
