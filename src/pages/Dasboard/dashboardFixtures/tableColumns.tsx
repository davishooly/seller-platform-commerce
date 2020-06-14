import React from 'react';
import { Icon } from 'antd';
import Styled from 'styled-components';

const Div = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const columns = [
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
    },
    {
        title: 'Units sold',
        dataIndex: 'unitSold',
        key: 'unitSold',
    },
    {
        title: 'Refunds',
        dataIndex: 'refunds',
        key: 'refunds',
    },
    {
        title: 'Sales',
        dataIndex: 'sales',
        key: 'sales',
    },
    {
        title: 'OE Fees (KES)',
        dataIndex: 'oeFees',
        key: 'oeFees',
    },
    {
        title: 'Est. Earnings',
        dataIndex: 'earnings',
        key: 'earnings',
        render: (text: React.ReactNode) => (
            <Div>
                <span>{text}</span>
                <Icon type="eye" />
            </Div>
        ),
    },
];
