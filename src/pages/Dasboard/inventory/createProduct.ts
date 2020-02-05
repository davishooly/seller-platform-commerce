import { productsCreate, sellersProductsCreate, productsAddMedia } from "api/src";

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



export const createProductSeller = (productSeller: any, productId: any) => {
    
    return sellersProductsCreate({
        data: {
            product: productId,
            defaultPrice: productSeller.default_price
            
        }
    })
}




export const productAddMedia = (productId: any, file: any, path: any) => {
    console.log(">>>>>>>>>>>>", file,  productId, path );
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
}