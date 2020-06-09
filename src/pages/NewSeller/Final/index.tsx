import React from "react";
import { Result, Button } from 'antd';
import { Center } from "components";
import PreviewSellerInfo from "../Preview";
import styled from "styled-components";

import { device } from 'mediaScreen/mediaQueries';


const Container = styled.div`
   display: flex;
   height : auto;
   width: 60%;
    @media only screen and ${device.mobileS} and (max-device-width: 600px) {
       width: 100%;
    } 
   flex-direction: column;
   justify-content: space-between;
   text-align: center;
   margin: 0 auto;
   
   span:first-of-type { 
      font-weight: 600;
      font-size: 24px;
       color: rgba(0, 0, 0, 0.85);
     }
   span:last-of-type {
      font-weight: 300;
      
    @media only screen and ${device.mobileS} and (max-device-width: 600px) {
      text-align: start;
    } 
   }
`;


const previewTitle = () => (
    <Container>
        <span> Summary Section </span>
        <span> Thank you for your application. Kindly confirm the information provided is correct. </span>
    </Container>
);


const FinalDetails = ({ onClick , loading, submit, customer,setCurrent}: any) => {
    return (
        <Center>
            <Result
                title= {previewTitle()}
                extra={[
                    <PreviewSellerInfo  customer={customer} onClick={setCurrent}/>,
                    <Button loading={loading} onClick={submit} type="primary" key="console">
                        Create Seller
                    </Button>,
                    <Button key="buy" onClick={onClick}>Back</Button>,
                ]}
            />
        </Center>
    );
};



export default FinalDetails
