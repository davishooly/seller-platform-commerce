import { sellersProductsVariablesUpdateVariable } from "api/src/apis";


const updateSellerProduct = ( product: any) => {
    console.log( ">>>>>>>.", product);

    const config =  sellersProductsVariablesUpdateVariable(
        {
            id: product.id,
            data: {
                product: product,
                values: product.values,
                variable: 0
            }
        },{
            transform:((body:any) => ({
                product: body
            })),
            update: {
                product: (prev: any, next: any) => next
            }
        }
    );

    return config;

};

export { updateSellerProduct }