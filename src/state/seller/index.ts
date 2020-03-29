import {sellerFromToken, sellersCreate} from "api/src/apis";


export const createSeller = (customerDetails: any) => {
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
