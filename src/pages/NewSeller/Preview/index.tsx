import React from 'react';

import { Descriptions } from 'antd'

import styled from "styled-components";


export const Container = styled.div`
  margin-bottom : 40px;
  tbody {
  text-align: left;
  }
  th { color: #000000; }
  td { color: rgba(70, 66, 66, 0.65); }
`;

const PreviewSellerInfo: React.FC<any> = ({ customer}) => {
  const {
    bankName,
    businessName,
    businessNameLocation,
    phone,
    town,
    county,
    displayName,
    email,
    website,
    description,
    bankLocation,
    bankAccountNumber,
    bankAccountHoldersName } = customer;
  return (
      <Container>
        <Descriptions title="Preview" layout="vertical" bordered>
          <Descriptions.Item label="Bank name">{bankName}</Descriptions.Item>
          <Descriptions.Item label="Bank Account Number">{bankAccountNumber}</Descriptions.Item>
          <Descriptions.Item label="Bank location">{bankLocation}</Descriptions.Item>
          <Descriptions.Item label="Business account holder">{bankAccountHoldersName}</Descriptions.Item>
          <Descriptions.Item label="Business Name">{businessName}</Descriptions.Item>
          <Descriptions.Item label="Business Location">{ town }</Descriptions.Item>
          <Descriptions.Item label="County/Region">{ county }</Descriptions.Item>
          <Descriptions.Item label="Website">{website}</Descriptions.Item>
          <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
          <Descriptions.Item label="Display name">{displayName}</Descriptions.Item>
          <Descriptions.Item label="Description">{description}</Descriptions.Item>
        </Descriptions>
      </Container>
  );
};

export default PreviewSellerInfo;
