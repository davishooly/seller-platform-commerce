import {productsCreate, sellersProductsCreate, productsAddMedia , Product} from "api/src";

export const createProduct = (product: any) => {    
  return productsCreate(
    {
      data: {
        ...product
      }
    },
    {
      transform: (requestBody: any) => ({
        product_draft: requestBody
      }),
      update: {
        product_draft: (prev: any, next: any) => next
      }
    }
  );
};

export const createProductSeller = (product: any, sellerId: number, categoryId: number,  optimistic: any) => {
    const config =  sellersProductsCreate({
        data: {
            product: {
                ...product,
            },
            seller: sellerId,
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
                }
                return newState
            }
        }
    })

    if(optimistic){
         config.optimisticUpdate = {
             sellerProducts: (body: any ) => body
         }
    }

    return config;
}




export const productAddMedia = (productId: any, file: any, path: any) => {
    return  productsAddMedia({
        id: productId,
        data: {
            file,
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
}

