import React from "react";

import {Popconfirm, Input} from 'antd';

const renderPopup = (text: any) => (
    <Popconfirm
        icon={<Input value={text}/>}
       placement="bottom"
       title="update price"
        // onConfirm=''
      okText="Update"
     cancelText="Cancel">
<span style={{color: '#0065B0'}}>{text}</span>
</Popconfirm>
);

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
        render: (text: any) => renderPopup(text)
    },
    {
        title: 'Sale Price',
        dataIndex: 'sale',
        key: 'sale',
        render: (text: any) => renderPopup(<span style={{color: '#0065B0'}}>{text}</span>)
},
{
    title: 'Stock',
        dataIndex: 'stock',
    key: 'stock',
    render: (text: any) =>renderPopup(text)
},
{
    title: 'Description',
        dataIndex: 'description',
    key: 'description',
    // render: text => renderPopup( <Editor readOnly toolbarHidden editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(text)))} />)
},
{
    title: 'Status',
        dataIndex: 'status',
    key: 'status',
    render:
        (text: any) => <span style={{
    color: text === 'Live' ? '#67C23A' :
        text === 'In Review' ? '#E6A441' : '#F56C6C'
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
