import React from "react";
import { Form } from "antd";
import { InlineInput } from "components/Input";
import { SellerProduct } from "api/src";

interface IProps {
  form: any;
  sellerProduct: SellerProduct;
}

const Additional: React.FC<IProps> = ({ form, sellerProduct }) => {
  const {
    getFieldDecorator,
  } = form;

  return (
    <>
      <Form.Item hasFeedback>
        {getFieldDecorator("barcode", {
          initialValue: sellerProduct?.product?.barcode,
          rules: [{ required: true, message: "Please input barcode" }]
        })(<InlineInput label="Barcode" placeholder="Barcode" />)}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator("keywords", {
          initialValue: sellerProduct?.product?.keywords,
          rules: [{ required: true, message: "Please input Keywords!" }]
        })(<InlineInput label="Keywords " placeholder="Keywords " />)}
      </Form.Item>

    </>
  );
};

export default Additional;
