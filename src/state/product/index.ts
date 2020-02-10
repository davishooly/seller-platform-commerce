import {productsCategoriesRoot, productsDelete} from "api/src/apis";
import {Product} from "../../api/src/models";


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

const deleteProduct = (productId: number, optimistic: any) => {

    const config =  productsDelete({
            id: productId
        },
        {
            transform: (body: any) => ({
                sellerProducts: body
            }),
            update: {
                sellerProducts: (prev: any, next: any) => {
                    const { results , count  }  = prev
                    const newState = {
                        count: count - 1,
                        results: results.filter((product: any) => product.id !== productId)
                    }
                    return newState
                }
            }
        })
        if (optimistic) {
            config.optimisticUpdate = {
                sellerProducts: (body: any) => body
            };
        }

        return config
}


export {getProductsCategories, deleteProduct }

