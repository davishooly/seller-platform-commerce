import { productsList } from "api/src/apis";
import { useRequest } from "redux-query-react";


export const useProducts = ( ) => {
    const config =  productsList({
        // transform: (responseBody: any) => ({
        //     products: responseBody
        // }),
        // update: {
        //     products: (prev, next) => next
        // }
    });

    useRequest(config)
};
