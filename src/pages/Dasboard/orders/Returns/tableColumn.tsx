import React from "react";

export const columns =  [
    {
        title: 'Requested',
        dataIndex: 'requested',
        key: 'requested',
    },
    {
        title: 'Amount submitted',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Payment method',
        dataIndex: 'payment',
        key: 'payment',
        // render: text => renderPopup(text)
    },
    {
        title: 'Account',
        dataIndex: 'account',
        key: 'account',
        // render: text => <span style={{color: '#0065B0'}}>{text}</span>
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        // render: text => renderPopup(text)
    },];