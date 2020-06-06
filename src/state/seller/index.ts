import {sellersCreate, sellersProductsList, sellersRead, sellersUpdate } from "api/src/apis";


const createSeller = (customerDetails: any) => {
    return  sellersCreate({
        data: {
            owner: {
                password: customerDetails.password,
                email: customerDetails.email,
                firstName: customerDetails.firstname,
                lastName: customerDetails.lastname,
                username: customerDetails.username
            },
            bank: {
                name:customerDetails.bankName,
                accNumber: customerDetails.bankAccountNumber,
                location: customerDetails.bankLocation
            },
            address: {
                street:customerDetails.businessNameLocation,
                city:customerDetails.town,
                name: customerDetails.businessNameLocation
            },
            logo: '',
            businessName: customerDetails.businessName,
            phoneNumber: customerDetails.phone,
            name: customerDetails.displayName
        },
    }, {
        update: () => {
        },
    })
};


const updateSeller = ( id: any, customerDetails: any) => {
    const config = sellersUpdate({
        id,
        data: {
            owner: {
                email: customerDetails.personalMail,
                firstName: customerDetails.firstName,
                lastName: customerDetails.lastName,
                username: customerDetails.username
            },
            bank: {
                name:customerDetails.bankName,
                accNumber: customerDetails.account,
                location: customerDetails.location
            },
            address: {
                street:customerDetails.street,
                city:customerDetails.city,
                name: customerDetails.addressName
            },
            logo: '',
            businessName: customerDetails.businessName,
            phoneNumber: customerDetails.phone,
            name: customerDetails.displayName
        },
    });
    return config;
};


const getSellerProducts = (param: any) => {
    const config = sellersProductsList({
        ...param,
    }, {
        transform: (body: any) => ({
            sellerProducts: body
        }),
        update: {
            sellerProducts: (prev: any, next: any) => next
        }
    })

    return config;
};



const readSeller = (id: any) => {
    const config = sellersRead ({
        id
    },{
        transform: (body: any) => ({
            sellerInfo: body
        }),
        update: {
            sellerInfo: (prev: any , next: any) => next
        }

    });
    return config;
};


export { createSeller, getSellerProducts, readSeller, updateSeller };