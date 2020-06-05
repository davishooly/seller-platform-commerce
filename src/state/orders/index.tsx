import { sellersProductsOrders, sellersProductsReturns } from 'api/src';

const getSellerProductsOrders = () => {
   const config =  sellersProductsOrders({
        limit: 10,
        offset: 1
    },  {
       transform: (body: any) => ({
           sellerOrders: body
       }),
       update: {
           sellerOrders: (prev: any, next: any) => next
       }
   });

    return config;
};


const getOrderReturns = () => {
    const config =  sellersProductsReturns({
        limit: 10,
        offset: 1
    },  {
        transform: (body: any) => ({
            orderReturns: body
        }),
        update: {
            orderReturns: (prev: any, next: any) => next
        }
    });

    return config;

};


export { getSellerProductsOrders, getOrderReturns };
