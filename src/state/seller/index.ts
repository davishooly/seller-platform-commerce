import {sellerFromToken, sellersCreate} from "api/src/apis";
import {useRequest} from "redux-query-react";
import {useSelector} from "react-redux";


export const createSeller = (customerDetails: any) => {
    return  sellersCreate({
        data: {
            owner: {
                password: customerDetails.password,
                email: customerDetails.email,
                firstName: customerDetails.firstname,
                lastName: customerDetails.lastname,
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
