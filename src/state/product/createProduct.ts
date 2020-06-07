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



export const createProductVariation = ({ id, products, currentProduct }: any) => {

    const { variants } = currentProduct;

    const { variation, salePrice, minimumPrice, availableUnits } = variants[0];

    let newProduct  = {
        ...currentProduct,
        product: {
            ...currentProduct,
            variationVariables:
                [ {
                    values: [{
                        sale_price: salePrice,
                        minimum_price: minimumPrice,
                        available_units: availableUnits
                    }],
                    variant: variation } ]
        }
    };

    return sellersProductsVariablesCreate({
        id,
        data: {
            values: variants,
            variable: options.filter( ({ value}):any => value === variation)[0].index
        }
    },{
        update: {
            sellerProducts: (prev: any, next: any) => {
                return  {
                    count: products.count,
                    results: [ ...products.results, newProduct ]
                };
            }
        }
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

