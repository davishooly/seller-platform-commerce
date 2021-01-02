import {
    getRootCategories,
    deleteSellerProduct,
    getCategorySubCategories,
    viewProductVariation,
    deleteProductVariations,
} from 'api/src/apis';

const getProductsCategories = () => {
    return getRootCategories(
        {},
        {
            transform: (body: any) => ({ rootCategories: body }),
            update: {
                rootCategories: (prev: any, next: any) => next,
            },
        },
    );
};

const getProductsSubCategory = (id: number) => {
    const config = getCategorySubCategories(
        {
            id,
        },
        {
            transform: (body: any) => ({ productSubCategory: body }),
            update: {
                productSubCategory: (prev: any, next: any) => next,
            },
        },
    );

    return config;
};

const deleteProductVariant = ({ variations, productId, variantId }: any, optimistic: any) => {
    if (variations < 2) {
        const config = deleteSellerProduct(
            {
                id: productId,
            },
            {
                transform: (body: any) => ({
                    sellerProducts: body,
                }),
                update: {
                    sellerProducts: (prev: any) => {
                        const { results, count } = prev;
                        return {
                            count: count - 1,
                            results: results.filter((product: any) => product.id !== productId),
                        };
                    },
                },
            },
        );
        if (optimistic) {
            config.optimisticUpdate = {
                sellerProducts: (body: any) => body,
            };
        }

        return config;
    }

    const config = deleteProductVariations(
        {
            id: variantId,
        },
        {
            transform: (body: any) => ({
                sellerProducts: body,
            }),
            update: {
                sellerProducts: (prev: any) => {
                    const { results, count } = prev;
                    return {
                        count: count,
                        results: results.map((product: any) => {
                            let filteredVariables = [];
                            if (product.id === productId) {
                                filteredVariables = product.product.variationVariables.filter(
                                    (variation: any) => variation.pk !== variantId,
                                );
                            }

                            return {
                                ...product,
                                product: {
                                    ...product.product,
                                    variationVariables: filteredVariables,
                                },
                            };
                        }),
                    };
                },
            },
        },
    );
    if (optimistic) {
        config.optimisticUpdate = {
            sellerProducts: (body: any) => body,
        };
    }

    return config;
};

const getSellerProduct = (id: any) => {
    return viewProductVariation(
        {
            id,
        },
        {
            transform: (body: any) => ({
                currentSellerProduct: body,
            }),
            update: {
                currentSellerProduct: (prev: any, next: any) => next,
            },
            force: true,
        },
    );
};

export { getProductsCategories, deleteProductVariant, getSellerProduct, getProductsSubCategory };
