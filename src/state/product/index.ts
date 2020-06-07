import {
    productsCategoriesRoot,
    sellersProductsVariablesRead,
    sellersProductsVariablesRemoveVariable,
    sellersProductsDelete
} from "api/src/apis";



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

const deleteProductVariant = ( { variations, productId, variantId } : any, optimistic: any) => {

    if (variations < 2) {
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
                        };
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
    }

    const config =  sellersProductsVariablesRemoveVariable({
            id: variantId
        },
        {
            transform: (body: any) => ({
                sellerProducts: body
            }),
            update: {
                sellerProducts: (prev: any, next: any) => {
                    const { results , count  }  = prev;
                    return  {
                        count: count,
                        results: results.map((product: any) => {
                            let filteredVariables = [];
                            if(product.id === productId){
                                filteredVariables = product.product.variationVariables.filter((variation: any) => variation.pk !== variantId)
                            }

                            return {
                                ...product,
                                product: {
                                    ...product.product,
                                    variationVariables: filteredVariables
                                }
                            }
                        })
                    };
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


export { getProductsCategories, deleteProductVariant, getSellerProduct };
