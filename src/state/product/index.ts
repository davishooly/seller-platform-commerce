import {  productsCategoriesRoot} from "api/src/apis";


// const useDraftProduct = () => {

// }

const getProductsCategories = (categories: any) => {
    if(!categories) {
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


export { getProductsCategories }

