import React, { useEffect, useState } from "react";
import { Divider, Icon, Form, Typography, Radio } from "antd";
import styled, { css } from "styled-components";
import Input, { TermAndCons } from "components/Input";
import Bank from "icons/bank-24px.svg";
import Business from "icons/logistics-24px.svg";
import Phone from "icons/phone-24px.svg";
import Taxes from "icons/receipt-24px.svg";
import { validateNameFields } from "utils/validators";

const { Title } = Typography;

interface Props {
  error?: boolean;
}

const StyledAgreement = styled.div<Props>`
  display: grid;
  place-content: center;
  padding: 3rem;
  text-align: center;

  .ant-checkbox {
    ${(props: any) =>
      props.error &&
      css`
        border: 1px solid red;
      `}
  }

  img {
    width: 36.84px;
    height: 26.32px;
  }
  .oval {
    border-radius: 50%;
    box-sizing: border-box;
    height: 101px;
    width: 101px;
    border: 1px solid #00a1e5;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
  }

  .images {
    display: flex;
    width: 100%;
    justify-content: space-between h3 {
      margin-top: 20px;
    }
  }
`;

const Agreement = ({
  businessName,
  changeName,
  error,
  setInputError,
  isChecked,
  agreeTerms
}: any) => {
  useEffect(() => {
    if (businessName !== "") {
      validateNameFields(
        businessName,
        "businessName",
        setInputError,
        error,
        "name"
      );
    }
  }, [businessName]);

  useEffect(() => {
    if (isChecked) {
      setInputError({ ...error, agreeTerms: "" });
    }
  }, [isChecked]);

  return (
    <StyledAgreement error={error.agreeTerms}>
      <Title>Set up your OE seller account</Title>

      <Title level={4}> Have the following available: </Title>
      <div className="images">
        <div>
          <div className="oval">
            <img src={Business} alt="business" />
          </div>
          <h3> Business </h3>
        </div>

        <div>
          <div className="oval">
            <img src={Phone} alt="phone" />
          </div>
          <h3> Phone </h3>
        </div>

        <div>
          <div className="oval">
            <img src={Bank} alt="bank" />
          </div>
          <h3> Bank </h3>
        </div>

        <div>
          <div className="oval">
            <img src={Taxes} alt="taxes" />
          </div>
          <h3> Taxes </h3>
        </div>
      </div>
      <Divider />

      <div>
        <Input
          name="businessName"
          style={{ borderColor: error.businessName ? "red" : "" }}
          value={businessName}
          onChange={changeName}
          tip="What is your business name?"
          label="Business Name"
        />
        <span style={{ color: "red" }}>{error.businessName} </span>
      </div>

      <div>
        <TermAndCons
          error={error}
          onChange={agreeTerms}
          checked={isChecked}
          label="Seller Agreement"
          tip="I have read and accepted the terms and conditions of the OE seller Agreement"
        />
      </div>
    </StyledAgreement>
  );
};

export default Agreement;
