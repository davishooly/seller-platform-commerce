import React from "react";
import { Result, Button } from 'antd';
import { Center } from "components";
import PreviewSellerInfo from "../Preview";


const FinalDetails = ({ onClick , loading, submit, customer}: any) => {
    return (
        <Center>
            <Result
    status="info"
    title="You are about to create a new seller. Make sure that the details are collect"
    extra={[
        <PreviewSellerInfo  customer={customer}/>,
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
