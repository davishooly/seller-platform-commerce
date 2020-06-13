import { productsCategoriesList } from 'api/src';

const filterCategories = (searchValue: string) => {
    const config = productsCategoriesList(
        {
            search: searchValue,
        },
        {
            transform: (body: any) => {
                return body;
            },
        },
    );

    return config;
};

export { filterCategories };
