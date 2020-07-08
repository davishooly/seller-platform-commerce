import React, { useEffect, useState } from 'react';

import { Steps, Button, notification } from 'antd';
import Agreement from './Terms';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { validate } from 'utils/validators';
import Info from './Info';
import Owner from './Info/owner';
import BillAndPay from './BillAndPay';
import FinalDetails from './Final';
import { compose } from 'redux';
import useBeforeUnload from 'use-before-unload';
import { createSeller } from '../../state/seller';

import { useMutation } from 'redux-query-react';
import { device } from 'mediaScreen/mediaQueries';

const { Step } = Steps;

const customer = {
    businessName: '',
    businessNameLocation: '',
    phone: '',
    town: '',
    county: '',
    displayName: '',
    website: '',
    description: '',
    bankLocation: '',
    bankAccountNumber: '',
    bankAccountHoldersName: '',
    confirmBankAccount: '',
    bankName: '',
    confirmPassword: '',
    username: '',
    password: '',
    email: '',
    lastname: '',
    firstname: '',
};

const steps = [
    {
        title: 'Seller Agreement',
    },
    {
        title: 'User Information',
    },
    {
        title: 'Seller Information',
    },

    {
        title: 'Billing and Payment',
    },
    {
        title: 'Finish',
    },
];

const Center = styled.div`
    margin-bottom: 60px;
    display: flex;
    place-content: center;
`;

const DivContainer = styled.div<any>`
    @media only screen and ${device.mobileS} and (max-device-width: 480px) {
        .ant-steps-horizontal.ant-steps-label-horizontal {
            display: flex;
            flex-direction: column;

            .ant-steps-item {
                display: none;
            }

            .ant-steps-item::before,
            .ant-steps-item::after {
                display: none;
            }
        }
    }
`;

const stepStyle = {
    boxShadow: '0px -1px 0 0 #e8e8e8 inset',
};

interface IProp {
    dispatch: any;
}

const NewSeller: React.FC<IProp> = () => {
    const [current, setCurrent] = useState(0);
    const [customerDetails, setCustomerDetails] = useState(customer);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setInputError] = useState({});

    const [{ isPending }, sellerCreate] = useMutation(() => createSeller(customerDetails));

    const agreeTerms = () => {
        setIsChecked(!isChecked);
    };

    // scroll to top on every section change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [current]);

    const next = () => {
        if (current === 0) {
            if (customerDetails.businessName === '') {
                setInputError({
                    ...error,
                    businessName: 'Please enter your business name',
                });
            } else if (!isChecked) {
                setInputError({
                    ...error,
                    agreeTerms: 'Accept terms and conditions of our business',
                });
            } else {
                setCurrent(current + 1);
            }
        } else if (current === 2) {
            const { businessNameLocation, town, county, displayName, phone } = customerDetails;
            const infoFields = [{ businessNameLocation }, { town }, { county }, { displayName }, { phone }];
            const fieldErrors = validate(infoFields);
            setInputError({ ...error, ...fieldErrors });
            if (Object.keys(fieldErrors).length === 0) {
                setCurrent(current + 1);
            }
        } else if (current === 1) {
            const { username, email, password, lastname, firstname, confirmPassword } = customerDetails;
            const fields = [{ username }, { email }, { password }, { lastname }, { firstname }, { confirmPassword }];

            const fieldErrors = validate(fields);
            setInputError({ ...error, ...fieldErrors });
            if (Object.keys(fieldErrors).length === 0) {
                setCurrent(current + 1);
            }
        } else if (current === 3) {
            const {
                bankName,
                bankAccountHoldersName,
                bankAccountNumber,
                bankLocation,
                confirmBankAccount,
            } = customerDetails;
            const fields = [
                { bankName },
                { bankLocation },
                { bankAccountNumber },
                { bankAccountHoldersName },
                { confirmBankAccount },
            ];
            const errors = validate(fields);
            setInputError({ ...error, ...errors });
            if (Object.keys(errors).length === 0) {
                if (customerDetails.bankAccountNumber !== customerDetails.confirmBankAccount) {
                    setInputError({
                        ...error,
                        confirmBankAccount: 'bank account does not match',
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sellerCreate()
            .then(redirect)
            .catch(() => {
                notification.error({
                    message: 'Error',
                    description: 'An Error occurred',
                });
            });
    };

    const redirect = (response: any) => {
        const { status, text } = response;
        if (status === 201) {
            notification.success({
                message: 'Success',
                description: 'Seller created successfully Check your email to activate your account',
            });
        } else {
            const {
                owner: { email },
            } = JSON.parse(text);
            notification.error({
                message: 'Error',
                description: email[0],
            });
        }
    };

    useBeforeUnload(() => {
        // preventing the auto reload for cocky novice users
        /* Do some checks here if you like */
        return true; // Suppress reload
    });

    return (
        <DivContainer current={current + 1}>
            <Steps type="navigation" current={current} style={stepStyle}>
                {steps.map((step) => (
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
                    loading={isPending}
                    setCurrent={setCurrent}
                    onClick={() => {
                        prev();
                    }}
                />
            )}
            <Center>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next Step
                    </Button>
                )}

                {current > 0 && current !== 4 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Back
                    </Button>
                )}
            </Center>
        </DivContainer>
    );
};

const mapStateToProps = () => ({});

export default compose<any>(connect(mapStateToProps))(NewSeller);
