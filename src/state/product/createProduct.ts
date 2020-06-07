import { productsAddMedia, sellersProductsVariablesCreate, sellersProductsCreate  } from "api/src";

import { options } from "../../pages/Dasboard/inventory/additional";

export const createProductSeller = (product: any, sellerId: number, categoryId: number,  optimistic: any) => {
    const config =  sellersProductsCreate({
        data: {
            product: {
                ...product,
            },
            seller: sellerId,
            basePrice: product.basePrice,
            primaryCategory: categoryId ,
        }
    }, {
        transform: (body: any) => ({
            sellerProducts: body
        }),
        update: {
            sellerProducts: (prev: any , next: any) => {
                const { results , count  }  = prev
                const newState = {
                    count: count + 1,
                    results: [...results, next ]
                };
                return newState
            }
        }
    });

    if(optimistic){
         config.optimisticUpdate = {
             sellerProducts: (body: any ) => body
         }
    }

    return config;
};



export const createProductVariation = ({ id, values }: any) => {
    const { variation } = values[0];

    return sellersProductsVariablesCreate({
        id,
        data: {
          values,
          variable: options.filter( ({ value}):any => value === variation)[0].index
        }
    },{

    })
};

export const productAddMedia = (productId: any, file: any, path: any) => {
    return  productsAddMedia({
        id: productId,
        data: {
            file: file,
            path,
            kind: 2
        }
    }, {
        transform: ( body:any ) => ({
            response: body
        }),
        update: {
            response: (prev: any, next: any) => {
                console.log({ next })
            }
        }
    })
};

