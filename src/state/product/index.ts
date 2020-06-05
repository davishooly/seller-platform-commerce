import {
    productsCategoriesRoot,
    sellersProductsVariablesRead,
    sellersProductsVariablesDestroyDelete,
    sellersProductsDelete,
    sellersProductsDetailsRead
} from "api/src/apis";

import { useRequest } from "redux-query-react";
import { useSelector } from "react-redux";


const getProductsCategories = (categories: any) => {
    if (!categories) {
        const config = productsCategoriesRoot({
            offset: 1,
            limit:10
        }, {
            transform: (body: any) => ({rootCategories: body}),
            update: {
                rootCategories: (prev: any, next: any) => next
            }
        });
        return config
    }
    return

};

const deleteProduct = (productId: number, optimistic: any) => {

    const config =  sellersProductsDelete({
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
        });
        if (optimistic) {
            config.optimisticUpdate = {
                sellerProducts: (body: any) => body
            };
        }

        return config
};

const getSellerProduct = (id: any) => {

  const QueryConfig = sellersProductsVariablesRead(
    {
      id
    },
    {
      transform: (body: any) => ({
        currentSellerProduct: body
      }),
      update: {
        currentSellerProduct: (prev: any, next: any) => next
      },
      force: true
    }
  );

  return QueryConfig;
};


export { getProductsCategories, deleteProduct, getSellerProduct };
