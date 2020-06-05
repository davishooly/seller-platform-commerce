import {sellersCreate, sellersProductsList, sellersRead } from "api/src/apis";


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


export { createSeller, getSellerProducts, readSeller };