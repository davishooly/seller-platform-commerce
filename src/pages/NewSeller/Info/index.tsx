import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Input from 'components/Input';
import { Col, Row } from 'antd';
import { validateNameFields } from 'utils/validators';

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

const Info = ({ customer, changeCustomerDetails, setInputError, error }: any) => {
    const { businessNameLocation, town, county, displayName, website, phone } = customer;

    useEffect(() => {
        if (town !== '') {
            validateNameFields(town, 'town', setInputError, error, 'town');
        }
    }, [town]);

    useEffect(() => {
        if (county !== '') {
            validateNameFields(county, 'county', setInputError, error, 'county');
        }
    }, [county]);

    useEffect(() => {
        if (displayName !== '') {
            validateNameFields(displayName, 'displayName', setInputError, error, 'display name');
        }
    }, [displayName]);

    useEffect(() => {
        if (businessNameLocation !== '') {
            validateNameFields(businessNameLocation, 'businessNameLocation', setInputError, error, 'business location');
        }
    }, [businessNameLocation]);

    useEffect(() => {
        if (phone !== '') {
            setInputError({ ...error, phone: '' });
        }
    }, [phone]);

    return (
        <StyledInfo>
            <h1>Tell us about your business</h1>

            <Input
                style={{ borderColor: error.businessNameLocation ? 'red' : '' }}
                name="businessNameLocation"
                value={businessNameLocation}
                onChange={changeCustomerDetails}
                tip="Building and street"
                allowClear
                label="Business Location"
                placeholder="Building and street"
                className="input"
            />
            <span style={{ color: 'red' }}>{error.businessNameLocation}</span>

            <div className="input">
                <Row gutter={16}>
                    <Col span={12}>
                        <Input
                            style={{ borderColor: error.town ? 'red' : '' }}
                            name="town"
                            onChange={changeCustomerDetails}
                            tip="Town/City"
                            value={town}
                            allowClear
                            placeholder="Town/City"
                        />
                        <span style={{ color: 'red' }}>{error.town}</span>
                    </Col>

                    <Col span={12}>
                        <Input
                            style={{ borderColor: error.county ? 'red' : '' }}
                            name="county"
                            tip="County"
                            allowClear
                            onChange={changeCustomerDetails}
                            value={county}
                            placeholder="County/Region"
                        />
                        <span style={{ color: 'red' }}>{error.county}</span>
                    </Col>
                </Row>
            </div>

            <Input
                label="Choose a unique business display name"
                placeholder="Display name"
                style={{ borderColor: error.displayName ? 'red' : '' }}
                tip="What is business display name?"
                className="input"
                name="displayName"
                allowClear
                value={displayName}
                onChange={changeCustomerDetails}
            />
            <span style={{ color: 'red' }}>{error.displayName}</span>

            <Input
                label="If you sell your products online, enter your website URL (optional)"
                placeholder="Website"
                tip="Why do we ask for this?"
                style={{ borderColor: error.website ? 'red' : '' }}
                value={website}
                allowClear
                name="website"
                onChange={changeCustomerDetails}
            />
            <span style={{ color: 'red' }}>{error.website}</span>

            <div className="input">
                <Row gutter={16}>
                    <Col span={16}>
                        <Input
                            placeholder="E.g +254076786786"
                            name="phone"
                            tip={'Enter your mobile number '}
                            allowClear
                            value={phone}
                            onChange={changeCustomerDetails}
                        />
                        <span style={{ color: 'red' }}>{error.phone}</span>
                    </Col>

                    <Col span={8}>
                        <Input type="Submit" value="Verify number" className="verify" />
                    </Col>
                </Row>
            </div>
        </StyledInfo>
    );
};

export default Info;
