import React from 'react';
import { Divider, Tooltip } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { device } from 'mediaScreen/mediaQueries';

export const Container = styled.div`
    margin-bottom: 40px;
    .section {
        display: flex;
        flex-direction: column;
        width: 100%;

        .section__title {
            display: flex;
            width: 100%;
            justify-content: space-between;
            font-size: 24px;
            margin-bottom: 20px;

            span {
                font-weight: 300;
            }

            .anticon {
                color: #1890ff;
                font-size: 16px;
                cursor: pointer;
            }
        }

        .section__content {
            display: flex;
            flex-direction: column;
            width: 100%;
            .content {
                display: grid;
                grid-template-columns: 2fr 2fr;
                justify-items: start;
                width: 100%;
                padding: 16px 0 16px 0;
                font-size: 18px;
                span {
                    @media only screen and ${device.mobileS} and (max-device-width: 768px) {
                        text-align: start;
                    }
                }

                span:first-of-type {
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.85);
                    font-size: 14px;
                }
            }
        }
    }
`;

interface Section {
    section: string;
    path: number;
    details?: any;
}

const sections = [
    { section: 'Seller Agreement', path: 0 },
    { section: 'User Information', path: 1 },
    { section: 'Business Details', path: 2 },
    { section: 'Payment Information', path: 3 },
];

const previewSections = ({ section, path, details }: Section, setCurrent: Function) => (
    <>
        <Divider />
        <div className="section">
            <div className="section__title">
                <span> {section} </span>
                <Tooltip title={section}>
                    <FormOutlined onClick={() => setCurrent(path)} />
                </Tooltip>
            </div>
            <div className="section__content">
                {Object.keys(details).map((detail, index) => (
                    <div className="content" key={index.toString()}>
                        <span> {detail}</span>
                        <span> {details[detail]} </span>
                    </div>
                ))}
            </div>
        </div>
    </>
);

const PreviewSellerInfo: React.FC<any> = ({ customer, onClick }) => {
    const infoSections = {
        terms: {
            'Business Name': customer.businessName,
        },
        userInfo: {
            'First Name': customer.firstname,
            'Last Name': customer.lastname,
            email: customer.email,
            Username: customer.username,
        },
        businessInfo: {
            'Business Location': customer.businessNameLocation,
            County: customer.county,
            'Display Name': customer.displayName,
            Town: customer.town,
            Website: customer.website,
        },
        bankDetails: {
            'Bank Name': customer.bankName,
            'Bank Location': customer.bankLocation,
            'Bank Account Holders Name': customer.bankAccountHoldersName,
            'Bank Account Number': customer.bankAccountNumber,
        },
    };

    const updatedSections = sections.map((section, index) => {
        const key = Object.keys(infoSections)[index];
        return {
            ...section,
            details: infoSections[key],
        };
    });

    return <Container>{updatedSections.map((section) => previewSections(section, onClick))}</Container>;
};

export default PreviewSellerInfo;
