import { productsBestSeller } from "api/src";

const bestSellingProducts = () => {

    const config = productsBestSeller({
        offset: 1,
        limit: 10
    }, {
        transform: (body: any) => ({
            bestSellerProducts: body
        }),
        update: {
            bestSellerProducts: (prev: any , next: any) => next
        }
    })

    return config;

};


export  { bestSellingProducts }