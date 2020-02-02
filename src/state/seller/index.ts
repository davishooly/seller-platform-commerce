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


export const useSeller = () => {
    const seller = useSelector((state: any) => state.entities.seller)
    const actions =
        sellerFromToken({
            transform: (body: any) => {
                return {
                    seller: body.data
                }},
            update: {
                seller: (prev: any, next: any) => next
            }
        })


    useRequest(actions)

    return seller;
}