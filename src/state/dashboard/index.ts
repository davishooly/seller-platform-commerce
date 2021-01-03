import { sellersProductsBestSellersListList, sellersPendingOrders } from 'api/src';

const bestSellingProducts = () => {
    const config = sellersProductsBestSellersListList(
        {
            offset: 1,
            limit: 10,
        },
        {
            transform: (body: any) => ({ bestSellerProducts: body }),
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
