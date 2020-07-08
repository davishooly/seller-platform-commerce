import { sellersCreate, sellersProductsList, sellersRead, sellersUpdate } from 'api/src/apis';

const createSeller = (customerDetails: any) => {
    return sellersCreate({
        data: {
            owner: {
                password: customerDetails.password,
                email: customerDetails.email,
                firstName: customerDetails.firstname,
                lastName: customerDetails.lastname,
                username: customerDetails.username,
            },
            bank: {
                name: customerDetails.bankName,
                accNumber: customerDetails.bankAccountNumber,
                location: customerDetails.bankLocation,
            },
            address: {
                street: customerDetails.businessNameLocation,
                city: customerDetails.town,
            },
            logo: '',
            businessName: customerDetails.businessName,
            phoneNumber: customerDetails.phone,
            name: customerDetails.displayName,
        },
    });
};

const updateSeller = (id: any, customerDetails: any) => {
    const data = {
        owner: {
            email: customerDetails.personalMail,
            firstName: customerDetails.firstName,
            lastName: customerDetails.lastName,
            username: customerDetails.username,
        },
        bank: {
            name: customerDetails.bankName,
            accNumber: customerDetails.accNumber,
            location: customerDetails.location,
        },
        address: {
            street: customerDetails.street,
            city: customerDetails.city,
            name: customerDetails.addressName,
        },
        logo: '',
        businessName: customerDetails.businessName,
        phoneNumber: customerDetails.phoneNumber,
        name: customerDetails.displayName,
    };

    return sellersUpdate(
        {
            id,
            data: {
                ...data,
            },
        },
        {
            update: {
                sellerInfo: (prev: any) => {
                    return { ...prev, ...data };
                },
            },
        },
    );
};

const getSellerProducts = (param: any) => {
    return sellersProductsList(
        {
            ...param,
        },
        {
            transform: (body: any) => ({
                sellerProducts: body,
            }),
            update: {
                sellerProducts: (prev: any, next: any) => next,
            },
        },
    );
};

const readSeller = (id: any) => {
    return sellersRead(
        {
            id,
        },
        {
            transform: (body: any) => ({
                sellerInfo: body,
            }),
            update: {
                sellerInfo: (prev: any, next: any) => next,
            },
        },
    );
};

export { createSeller, getSellerProducts, readSeller, updateSeller };
