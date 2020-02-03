import {productsList, productsCategoriesRoot} from "api/src/apis";
import {useRequest} from "redux-query-react";


const useProducts = () => {
    const config = productsList({
        // transform: (responseBody: any) => ({
        //     products: responseBody
        // }),
        // update: {
        //     products: (prev, next) => next
        // }
    });

    useRequest(config)
}


const getProductsCategories = (categories: any) => {
    console.log({categories})
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


export {useProducts, getProductsCategories}