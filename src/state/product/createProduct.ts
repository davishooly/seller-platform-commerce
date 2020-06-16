import { productsAddMedia, sellersProductsCreate, sellersProductsVariablesCreate } from 'api/src';

import { options } from '../../pages/Dasboard/inventory/additional';

export const createProductSeller = (product: any, sellerId: number, categoryId: number, optimistic: any) => {
    const config = sellersProductsCreate(
        {
            data: {
                product: {
                    ...product,
                },
                seller: sellerId,
                basePrice: product.basePrice,
                primaryCategory: categoryId,
            },
        },
        {
            transform: (body: any) => ({
                sellerProducts: body,
            }),
        },
    );

    if (optimistic) {
        config.optimisticUpdate = {
            sellerProducts: (body: any) => body,
        };
    }

    return config;
};

export const createProductVariation = ({ id, products, currentProduct }: any) => {
    const { variants } = currentProduct;

    const { variation } = variants[0];

    return sellersProductsVariablesCreate(
        {
            id,
            data: {
                values: variants,
                variable: options.filter(({ value }): any => value === variation)[0].index,
            },
        },
        {
            transform: (body: any) => ({
                sellerProducts: body,
            }),
            update: {
                sellerProducts: (prev: any, next: any) => {
                    const { product, values } = next;
                    const createdProduct = {
                        id: product.pk,
                        product: {
                            ...currentProduct,
                            id: product.pk,
                            variationVariables: [
                                {
                                    values: values,
                                    variant: variation,
                                },
                            ],
                        },
                    };

                    return {
                        count: products.count + 1,
                        results: [...products.results, createdProduct],
                    };
                },
            },
        },
    );
};

export const productAddMedia = (productId: any, file: any, path: any) => {
    return productsAddMedia(
        {
            id: productId,
            data: {
                file: file,
                path,
                kind: 2,
            },
        },
        {
            transform: (body: any) => ({
                response: body,
            }),
            update: {
                response: (prev: any, next: any) => {
                    console.log({ next });
                },
            },
        },
    );
};
