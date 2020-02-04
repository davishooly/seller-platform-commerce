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




export const productAddMedia = (productId: any, file: any, path: string) => { 
    return  productsAddMedia({
        id: productId,
        data: {
            file,
            path,
            kind: 2
            
        }
    })
}