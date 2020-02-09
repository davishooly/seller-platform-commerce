import {productsCategoriesRoot, productsDelete} from "api/src/apis";


// const useDraftProduct = () => {

// }

const getProductsCategories = (categories: any) => {
    if (!categories) {
        const config = productsCategoriesRoot({}, {
            transform: (body: any) => ({rootCategories: body}),
            update: {
                rootCategories: (prev: any, next: any) => next
            }
        })
        return config
    }
    return

}

const deleteProduct = (productId: number) => {

    return productsDelete({
            id: productId
        },
        {
            transform: (body: any) => ({
                product: body
            }),
            update: {
                product: (prev: any, next: any) => {
                    console.log({ next })
                }
            }
        })

}


export {getProductsCategories, deleteProduct }

