import {sellersProductsUpdate} from "../../../../../api/src/apis";


const updateSellerProduct = ( productId: string, product: any) => {

    console.log({product})

    // const config =  sellersProductsUpdate(
    //     {
    //         productId: productId,
    //         data: {
    //             primaryCategory: 1,
    //             availableUnits: 10,
    //             salePrice: product.sale_price,
    //             defaultPrice: product.default_price,
    //             product: {
    //                 ...product
    //             }
    //         }
    //     },{
    //         transform:((body:any) => ({
    //             product: body
    //         })),
    //         update: {
    //             product: (prev: any, next: any) => {
    //
    //             }
    //         }
    //     }
    // )

    return {};

}

export { updateSellerProduct }