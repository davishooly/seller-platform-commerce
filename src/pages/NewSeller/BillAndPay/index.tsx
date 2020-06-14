import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Center, Input } from 'components';

import { validateNameFields } from 'utils/validators';

const StyledBillAndPay = styled.div`
    padding: 3rem;
    .hide {
        display: none;
        input {
            display: none;
        }
    }
`;

const BillAndPay = ({ customer, changeCustomerDetails, setInputError, error }: any) => {
    const { bankName, bankLocation, bankAccountNumber, bankAccountHoldersName, confirmBankAccount } = customer;

    useEffect(() => {
        if (bankLocation !== '') {
            validateNameFields(bankLocation, 'bankLocation', setInputError, error, 'bank Location');
        }
    }, [bankLocation, setInputError, error]);

    useEffect(() => {
        if (bankAccountHoldersName !== '') {
            validateNameFields(
                bankAccountHoldersName,
                'bankAccountHoldersName',
                setInputError,
                error,
                'bank account holder',
            );
        }
    }, [bankAccountHoldersName, setInputError, error]);

    useEffect(() => {
        if (bankAccountNumber !== '') {
            /^[0-9]{9,17}$/.test(bankAccountNumber)
                ? setInputError({ ...error, bankAccountNumber: '' })
                : setInputError({ ...error, bankAccountNumber: 'Please input a valid bank account number' });
        }
    }, [bankAccountNumber, setInputError, error]);
    useEffect(() => {
        if (confirmBankAccount !== '') {
            setInputError({ ...error, confirmBankAccount: '' });
        }
    }, [confirmBankAccount, setInputError, error]);

    useEffect(() => {
        if (bankName !== '') {
            validateNameFields(bankName, 'bankName', setInputError, error, ' bank name');
        }
    }, [bankName, setInputError, error]);

    return (
        <Center>
            <StyledBillAndPay>
                <h1> Set up your billing & payment methods </h1>

                <Input
                    className="hide"
                    label="Enter your bank information to receive payments from OE"
                    tip="Why do we ask for your bank information?"
                />
                <Input
                    label="Bank Name"
                    style={{ borderColor: error.bankLocation ? 'red' : '' }}
                    value={bankName}
                    allowClear
                    name="bankName"
                    onChange={changeCustomerDetails}
                />
                <span style={{ color: 'red' }}>{error.bankName}</span>

                <Input
                    label="Bank Location"
                    style={{ borderColor: error.bankLocation ? 'red' : '' }}
                    value={bankLocation}
                    allowClear
                    name="bankLocation"
                    onChange={changeCustomerDetails}
                />
                <span style={{ color: 'red' }}>{error.bankLocation}</span>
                <Input
                    label="Account Holder's Name"
                    style={{ borderColor: error.bankAccountHoldersName ? 'red' : '' }}
                    value={bankAccountHoldersName}
                    allowClear
                    name="bankAccountHoldersName"
                    onChange={changeCustomerDetails}
                />
                <span style={{ color: 'red' }}>{error.bankAccountHoldersName}</span>
                <Input
                    label="Bank Account Number "
                    style={{ borderColor: error.bankAccountNumber ? 'red' : '' }}
                    value={bankAccountNumber}
                    allowClear
                    name="bankAccountNumber"
                    onChange={changeCustomerDetails}
                />
                <span style={{ color: 'red' }}>{error.bankAccountNumber}</span>
                <Input
                    label="Confirm Bank Account Number"
                    allowClear
                    style={{ borderColor: error.confirmBankAccount ? 'red' : '' }}
                    value={confirmBankAccount}
                    name="confirmBankAccount"
                    onChange={changeCustomerDetails}
                />
                <span style={{ color: 'red' }}>{error.confirmBankAccount} </span>
            </StyledBillAndPay>
        </Center>
    );
};

export default BillAndPay;
