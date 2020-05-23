import { sellersProductsUpdate } from "../../../../api/src/apis";


const updateSellerProduct = ( product: any) => {

    const config =  sellersProductsUpdate(
        {
            id: product.id,
            data: {
                primaryCategory: product.primaryCategory,
                // availableUnits: product.availableUnits,
                // salePrice: product.salePrice,
                // defaultPrice: product.defaultPrice,
                seller: product.seller,
                product: {
                    ...product
                }
            }
        },{
            transform:((body:any) => ({
                product: body
            })),
            update: {
                product: (prev: any, next: any) => {

                }
            }
        }
    );

    return config;

};

export { updateSellerProduct }