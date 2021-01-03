import React from 'react';
import { Form } from 'antd';
import RichEditor from 'components/Input/editor';
import { InlineInput, Inline } from 'components/Input';
import { SellerProduct } from 'api/src';

interface IProps {
    form: any;
    sellerProduct: SellerProduct;
}

const BasicInfo: React.FC<any> = ({ form, sellerProduct }: any) => {
    const { getFieldDecorator } = form;

    return (
        <>
            <Form.Item>
                {getFieldDecorator('name', {
                    initialValue: sellerProduct?.product?.name,
                    rules: [{ required: true, message: 'Please input product name' }],
                })(<InlineInput label="Name" placeholder="Product Name" />)}
            </Form.Item>

            <Form.Item>
                {getFieldDecorator('sku', {
                    initialValue: sellerProduct?.values[0]?.sku,
                    rules: [{ required: true, message: 'Please input sku!' }],
                })(<InlineInput tip="stock keeping unit" label="SKU" placeholder="SKU" />)}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('salePrice', {
                    initialValue: sellerProduct?.values[0]?.salePrice,
                    rules: [{ required: true, message: 'Please input price!' }],
                })(<InlineInput label="Sale Price" placeholder="Sale Price" type="number" prefix="$" />)}
            </Form.Item>

            <Form.Item hasFeedback>
                {getFieldDecorator('availableUnits', {
                    initialValue: sellerProduct?.values[0]?.availableUnits,
                    rules: [{ required: true, message: 'Please input price!' }],
                })(<InlineInput label="stock" placeholder="stock" type="number" />)}
            </Form.Item>
            <Form.Item>
                <Inline label="Description" placeholder="">
                    <RichEditor placeholder="This is a text editor.  Add and edit as you wish." editorType="package" />
                </Inline>
            </Form.Item>
        </>
    );
};

export default BasicInfo;
