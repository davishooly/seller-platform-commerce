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



export const createProductSeller = (product: any, sellerId: number) => {
    return sellersProductsCreate({
        data: {
            product: {
                ...product,
            },
            availableUnits: product.stock,
            seller: sellerId,
            primaryCategory: 1 ,
            salePrice: product.sale_price,
            defaultPrice: product.default_price,
        }
    }, {
        transform: (body: any) => ({
            product: body
        }),
        update: {
            product: (prev: any , next: any) => next
        }
    })
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
