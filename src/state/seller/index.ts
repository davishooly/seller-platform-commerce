import { sellersCreate } from "api/src/apis";


export const createSeller = (customerDetails: any) => {
    console.log({ customerDetails })
    return  sellersCreate({
        data: {
            owner: {
                password: customerDetails.password,
                email: customerDetails.email,
            },
            bank: {
                name:customerDetails.bankName
            },
            address: {
                street:customerDetails.businessNameLocation,
                city:customerDetails.town,
                name: customerDetails.businessNameLocation
            },
            logo: '',
            businessName: customerDetails.businessName,
            phoneNumber: customerDetails.phone,
            name: ""
        },
    }, {
        update: () => {
        },
    })
};
