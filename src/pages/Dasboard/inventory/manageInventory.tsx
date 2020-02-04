import React from "react";
import {renderCardContent} from "components/Card";
import TableSection from 'components/Table'
import styled from "styled-components";
import details from "components/Card/cardContent";
import {sellersProductsList} from "../../../api/src/apis";
import {useRequest} from "redux-query-react";
import {useSelector} from "react-redux";

export const CardSection = styled.section`
 display: flex;
 justify-content: space-between;
 width: 97.09%;
`;


const getSellerProducts = () => {
    const config = sellersProductsList({}, {
        transform: (body: any) => ({
            sellerProducts: body
        }),
        update: {
            sellerProducts: (prev: any, next: any) => next
        }
    })

    return config;
}

const ManageInventory = () => {
    const [{isFinished, isPending}, refresh] = useRequest(getSellerProducts())
    const sellerProducts = useSelector((state: any) => state.entities.sellerProducts)

    console.log({isPending})


    if (isPending) {
        return (
            <>
                loading.......
            </>
        )
    }
    return (
        <div>
            <CardSection>
                {details.map((detail: any, i: { toString: () => any; }) => (
                    renderCardContent(detail, i.toString(), 340)
                ))}
            </CardSection>
            < TableSection products={sellerProducts}/>
        </div>
    )
};

export default ManageInventory;

