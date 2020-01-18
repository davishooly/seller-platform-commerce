import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { Steps, Button } from "antd";
import Agreement from "./Terms";
import styled from "styled-components";
import { connect } from "react-redux";
import { validate } from "utils/validators";
import Info from "./Info";
import Owner from "./Info/owner";
import BillAndPay from "./BillAndPay";
import FinalDetails from "./Final";
import { compose } from "redux";
import {sellersCreate} from "../../api/src/apis";
import {mutateAsync} from "redux-query";

const { Step } = Steps;

const customer = {
  businessName: "",
  businessNameLocation: "",
  phone: "",
  town: "",
  county: "",
  displayName: "",
  website: "",
  description: "",
  bankLocation: "",
  bankAccountNumber: "",
  bankAccountHoldersName: "",
  confirmBankAccount: "",
  bankName: "",

  username: "",
  password: "",
  email: "",
  lastname: "",
  firstname: ""
};

const steps = [
  {
    title: "Seller Agreement"
  },
  {
    title: "User Information"
  },
  {
    title: "Seller Information"
  },

  {
    title: "Billing and Payment"
  },
  {
    title: "Finish"
  }
];

const Center = styled.div`
  margin-bottom: 60px;
  display: flex;
  place-content: center;
`;

const stepStyle = {
  boxShadow: "0px -1px 0 0 #e8e8e8 inset"
};

interface IProp extends RouteComponentProps {
  dispatch: any
}

const NewSeller: React.FC<IProp> = (props) => {
  const [current, setCurrent] = useState(0);
  const [customerDetails, setCustomerDetails] = useState(customer);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setInputError] = useState({});


  const agreeTerms = () => {
    setIsChecked(!isChecked);
  };

  const next = () => {
    if (current === 0) {
      if (customerDetails.businessName === "") {
        setInputError({
          ...error,
          businessName: "Please enter your business name"
        });
      } else if (!isChecked) {
        setInputError({
          ...error,
          agreeTerms: "Accept terms and conditions of our business"
        });
      } else {
        setCurrent(current + 1);
      }
    } else if (current === 2) {
      const infoFields = [
        { businessNameLocation: customerDetails.businessNameLocation },
        { town: customerDetails.town },
        { county: customerDetails.county },
        { displayName: customerDetails.displayName },
        { website: customerDetails.website },

        { phone: customerDetails.phone }
      ];
      const fieldErrors = validate(infoFields);
      setInputError({ ...error, ...fieldErrors });
      if (Object.keys(fieldErrors).length === 0) {
        setCurrent(current + 1);
      }
    } else if (current === 1) {
      const fields = [
        { username: customerDetails.username },
        { email: customerDetails.email },
        { password: customerDetails.password },
        { lastname: customerDetails.lastname },
        { firstname: customerDetails.firstname }
      ];

      const fieldErrors = validate(fields);
      setInputError({ ...error, ...fieldErrors });
      if (Object.keys(fieldErrors).length === 0) {
        setCurrent(current + 1);
      }
    } else if (current === 3) {
      const fields = [
        { bankName: customerDetails.bankName },
        { bankLocation: customerDetails.bankLocation },
        { bankAccountNumber: customerDetails.bankAccountNumber },
        { bankAccountHoldersName: customerDetails.bankAccountHoldersName },
        { confirmBankAccount: customerDetails.confirmBankAccount }
      ];
      const errors = validate(fields);
      setInputError({ ...error, ...errors });
      if (Object.keys(errors).length === 0) {
        if (
          customerDetails.bankAccountNumber !==
          customerDetails.confirmBankAccount
        ) {
          setInputError({
            ...error,
            confirmBankAccount: "bank account does not match"
          });
        } else {
          setCurrent(current + 1);
        }
      }
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const inputChange = (e: any) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const submitDetails = () => {
    const { dispatch } = props;
    setLoading(true);
    dispatch(
      mutateAsync(
        sellersCreate({
          data: {
            businessName: customerDetails.businessName,
            phoneNumber: customerDetails.phone,
            bank: {
              name:customerDetails.bankName
            },
            address: {
              street:customerDetails.businessNameLocation,
              city:customerDetails.town,
              name: customerDetails.businessNameLocation
            },
            owner: {
              password: customerDetails.password,
              email: customerDetails.email
            }
          }
        }),
      )
    ).then(redirect).catch(() => {
      setLoading(false)
    })
  };


  const redirect = (response: any) => {
    setLoading(false)
  };

  return (
    <div>
      <Steps type="navigation" current={current} style={stepStyle}>
        {steps.map(step => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      {current === 0 && (
        <Agreement
          isChecked={isChecked}
          agreeTerms={agreeTerms}
          setInputError={setInputError}
          error={error}
          businessName={customerDetails.businessName}
          changeName={inputChange}
        />
      )}
      {current === 1 && (
        <Owner
          error={error}
          setInputError={setInputError}
          owner={customerDetails}
          changeCustomerDetails={inputChange}
        />
      )}

      {current === 2 && (
        <Info
          error={error}
          setInputError={setInputError}
          customer={customerDetails}
          changeCustomerDetails={inputChange}
        />
      )}

      {current === 3 && (
        <BillAndPay
          error={error}
          setInputError={setInputError}
          customer={customerDetails}
          changeCustomerDetails={inputChange}
        />
      )}
      {current === 4 && (
        <FinalDetails
          customer={customerDetails}
          submit={submitDetails}
          loading={false}
          onClick={() => {
            prev();
          }}
        />
      )}
      <Center>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()} loading={loading}>
            Next Step
          </Button>
        )}

        {current > 0 && current !== 4 && (
          <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
            Back
          </Button>
        )}
      </Center>
    </div>
  );
};


const mapStateToProps = (state: any) => ({

});

export default compose<any>(connect(mapStateToProps))(NewSeller);
