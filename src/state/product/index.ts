import {
    getRootCategories,
    deleteSellerProduct,
    getCategorySubCategories,
    viewProductVariation,
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

const deleteProductVariant = ({ variations, productId, valueId }: any, optimistic: any) => {
    if (variations < 2) {
        const config = deleteSellerProduct({
            id: productId,
        });
        if (optimistic) {
            config.optimisticUpdate = {
                sellerProducts: (body: any) => body,
            };
        }

        return config;
    }

    const config = deleteVariationValue({
        id: valueId,
    });
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
