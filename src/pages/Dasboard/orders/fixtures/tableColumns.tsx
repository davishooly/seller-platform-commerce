import React from "react";
import {Icon} from "antd";
import Styled from 'styled-components'

const Div = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const columns =  [
  {
    title: 'Order #',
    dataIndex: 'order',
    key: 'order'
  },
  {
    title: 'Order Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Pending Since',
    dataIndex: 'pendingDate',
    key: 'pendingDate',
  },
  {
    title: 'Payment method',
    dataIndex: 'payment',
    key: 'payment',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Pack',
    dataIndex: 'pack',
    key: 'pack',
  },
 {
   title: 'Shipping',
    dataIndex: 'shipping',
    key: 'shipping',
    },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text: any) => (
        <Div>
        <span style={{color: text === "Waiting Pickup" ?
          '#E6A441': '#F56C6C'
        }}>{text}</span>
          <Icon type="eye"/>
        </Div>
    )
  },];
