import React from 'react';

import { Input, Popconfirm } from 'antd';
import { themes } from '../../providers/themes/Themes';

const renderPopup = (text: any, title: string) => (
    <Popconfirm
        icon={<Input value={text} />}
        placement="bottom"
        title={`update ${title}`}
        okText="Update"
        cancelText="Cancel"
    >
        <span style={{ color: '#0065B0' }}>{text}</span>
    </Popconfirm>
);

export const options = ['category', 'price', 'keywords'];

export const columns = [
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
    },
    {
        title: 'Date added',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Variant',
        dataIndex: 'variant',
        key: 'variant',
        render: (text: any) => renderPopup(text, 'price'),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text: any) => renderPopup(text, 'price'),
    },
    {
        title: 'Sale Price',
        dataIndex: 'sale',
        key: 'sale',
        render: (text: any) => renderPopup(text, 'Sale Price'),
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
        render: (text: any) => renderPopup(text, 'Stock'),
    },
    {
        title: 'Sku',
        dataIndex: 'sku',
        key: 'sku',
        render: (text: any) => renderPopup(text, 'Stock'),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text: any) => (
            <span
                style={{
                    color:
                        text === 'Live'
                            ? themes.greenBright
                            : text === 'In Review'
                            ? '#E6A441'
                            : themes.lightRedBackground,
                }}
            >
                {text}
            </span>
        ),
    },
    {
        title: 'Listing',
        dataIndex: 'listing',
        key: 'listing',
    },
];

export const mobileColumn = [
    {
        title: 'Date added',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Variant',
        dataIndex: 'variant',
        key: 'variant',
        render: (text: any) => renderPopup(text, 'price'),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text: any) => renderPopup(text, 'price'),
    },
    {
        title: 'Sale Price',
        dataIndex: 'sale',
        key: 'sale',
        render: (text: any) => renderPopup(text, 'Sale Price'),
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
        render: (text: any) => renderPopup(text, 'Stock'),
    },
    {
        title: 'Sku',
        dataIndex: 'sku',
        key: 'sku',
        render: (text: any) => renderPopup(text, 'Stock'),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text: any) => (
            <span
                style={{
                    color:
                        text === 'Live'
                            ? themes.greenBright
                            : text === 'In Review'
                            ? '#E6A441'
                            : themes.lightRedBackground,
                }}
            >
                {text}
            </span>
        ),
    },
];
