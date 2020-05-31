import { sellersProductsOrders } from 'api/src';

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


export { getSellerProductsOrders };
