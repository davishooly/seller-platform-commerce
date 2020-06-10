import React from "react";

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
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (text: React.ReactNode) => <span style={{color: '#0065B0'}}>{text}</span>
  },
  {
    title: 'Unit Sold',
    dataIndex: 'sales',
    key: 'sales',
    render: (text: React.ReactNode) => <span style={{color: '#0065B0'}}>{text}</span>
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    render: (text: React.ReactNode) => <span style={{color: '#0065B0'}}>{text}</span>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render:
      (        text: {} | null | undefined) => <span style={{
          color: text === 'Replenish' ? '#F56C6C' :
          text === 'Check' ? '#E6A441' : '#67C23A'
        }
        }
        >
          {text}
    </span>
  }, {
    title: 'Listing',
    dataIndex: 'listing',
    key: 'listing',
  },
];
