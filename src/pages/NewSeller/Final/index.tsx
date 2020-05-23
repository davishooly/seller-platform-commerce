import React from "react";
import { Result, Button } from 'antd';
import { Center } from "components";
import PreviewSellerInfo from "../Preview";


const FinalDetails = ({ onClick , loading, submit, customer,setCurrent}: any) => {
    return (
        <Center>
            <Result
    status="info"
    title="Thank you for your application. Kindly confirm the information provided is correct."
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
