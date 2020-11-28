import { updateProductVariation } from 'api/src/apis';

const updateSellerProduct = ({ id, product, value }: any) => {
    const config = updateProductVariation(
        {
            id,
            data: {
                product: product,
                values: value,
                variable: 0,
            },
        },
        {
            transform: (body: any) => ({
                currentSellerProduct: body,
            }),
            update: {
                currentSellerProduct: (prev: any, next: any) => next,
            },
        },
    );

    return config;
};

export { updateSellerProduct };
