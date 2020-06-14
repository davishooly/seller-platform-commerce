import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Input } from 'components';
import { Col, Row } from 'antd';
import { validateEmail, validateNameFields } from 'utils/validators';

import { device } from 'mediaScreen/mediaQueries';

const StyledInfo = styled.div`
    display: grid;

    place-content: center;
    padding: 3rem;

    @media only screen and ${device.mobileS} and (max-device-width: 768px) {
        .ant-col-8,
        .ant-col-16,
        .ant-col-12 {
            width: 100% !important;
        }
    }

    .verify {
        background-color: #203341;
        border-radius: 4px;
        color: #fff;
        padding: 0;
        outline: none;
    }
`;

// prevent paste events
export const handlePaste = (e: any) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
};

const Owner = ({ owner, changeCustomerDetails, setInputError, error }: any) => {
    const { username, email, firstname, lastname, password, confirmPassword } = owner;

    useEffect(() => {
        if (username !== '') {
            validateNameFields(username, 'username', setInputError, error, 'username');
        }
    }, [username]);

    useEffect(() => {
        if (email !== '') {
            if (!validateEmail(email)) {
                setInputError({ ...error, email: 'please enter a valid email address' });
            } else {
                setInputError({ ...error, email: '' });
            }
        }
    }, [email]);

    useEffect(() => {
        if (firstname !== '') {
            validateNameFields(firstname, 'firstname', setInputError, error, 'firstname');
        }
    }, [firstname]);

    useEffect(() => {
        if (lastname !== '') {
            validateNameFields(lastname, 'lastname', setInputError, error, 'display name');
        }
    }, [lastname]);

    useEffect(() => {
        if (password !== '') {
            validateNameFields(password, 'password', setInputError, error, 'password');
        }
    }, [password]);

    useEffect(() => {
        if (confirmPassword !== password) {
            setInputError({ ...error, confirmPassword: 'confirm password does not match password' });
        } else {
            setInputError({ ...error, confirmPassword: '' });
        }
    }, [confirmPassword]);

    return (
        <StyledInfo>
            <h1>Tell us about you</h1>
            <Input
                label="User details"
                placeholder="Username"
                style={{ borderColor: error.username ? 'red' : '' }}
                tip="Whats your username ?"
                className="input"
                allowClear
                name="username"
                value={username}
                onChange={changeCustomerDetails}
            />
            <span style={{ color: 'red' }}>{error.username}</span>

            <Input
                style={{ borderColor: error.email ? 'red' : '' }}
                name="email"
                allowClear
                tip="Enter email"
                onChange={changeCustomerDetails}
                value={email}
                placeholder="example@mail.com"
            />
            <span style={{ color: 'red' }}>{error.email}</span>

            <div className="input">
                <Row gutter={16}>
                    <Col span={12}>
                        <Input
                            style={{ borderColor: error.firstname ? 'red' : '' }}
                            allowClear
                            name="firstname"
                            onChange={changeCustomerDetails}
                            value={firstname}
                            tip="Enter first name"
                            placeholder="first name"
                        />
                        <span style={{ color: 'red' }}>{error.firstname}</span>
                    </Col>

                    <Col span={12}>
                        <Input
                            style={{ borderColor: error.lastname ? 'red' : '' }}
                            name="lastname"
                            tip="Enter last name"
                            allowClear
                            onChange={changeCustomerDetails}
                            value={lastname}
                            placeholder="last name"
                        />
                        <span style={{ color: 'red' }}>{error.lastname}</span>
                    </Col>
                </Row>
                <Input
                    style={{ borderColor: error.password ? 'red' : '' }}
                    name="password"
                    allowClear
                    tip="Enter  password"
                    onPaste={handlePaste}
                    onChange={changeCustomerDetails}
                    value={password}
                    type="password"
                    placeholder="password"
                />
                <span style={{ color: 'red' }}>{error.password}</span>

                <Input
                    style={{ borderColor: error.password ? 'red' : '' }}
                    name="confirmPassword"
                    type="password"
                    tip="confirm password"
                    onPaste={handlePaste}
                    allowClear
                    onChange={changeCustomerDetails}
                    value={confirmPassword}
                    placeholder="confirm password"
                />
                <span style={{ color: 'red' }}>{error.confirmPassword}</span>
            </div>
        </StyledInfo>
    );
};

export default Owner;
