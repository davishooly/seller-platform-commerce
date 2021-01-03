import {
    getRootCategories,
    deleteSellerProduct,
    getCategorySubCategories,
    viewProductVariation,
    deleteProductVariations,
    deleteVariationValue,
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

const deleteProductVariant = ({ variations, variationVariables, productId, variantId }: any, optimistic: any) => {
    console.log({ variations });

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

    const config = deleteVariationValue(
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
                            let filteredValues = [];
                            if (product.id === productId) {
                                const values = product.product.variationVariables?.values || [];
                                filteredValues = values.filter((variation: any) => variation.pk !== variantId);
                            }

                            return {
                                ...product,
                                product: {
                                    ...product.product,
                                    variationVariables: {
                                        ...product.product.variationVariables,
                                        values: filteredValues,
                                    },
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
