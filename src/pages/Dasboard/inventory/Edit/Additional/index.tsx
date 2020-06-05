import React from "react";
import { Button, Form, Layout, Menu } from "antd";
import { InlineInput } from "components/Input";
import { SellerProduct } from "api/src";

interface IProps {
  form: any;
  sellerProduct: SellerProduct;
}

const Additional: React.FC<IProps> = ({ form, sellerProduct }) => {
  const {
    getFieldDecorator,
    getFieldError,
    validateFields,
    isFieldTouched,
    getFieldsError
  } = form;

  return (
    <>
      <Form.Item hasFeedback>
        {getFieldDecorator("Barcode", {
          initialValue: sellerProduct?.product?.barcode,
          rules: [{ required: true, message: "Please input barcode" }]
        })(<InlineInput label="Barcode" placeholder="Barcode" />)}
      </Form.Item>

      {/*<Form.Item hasFeedback>*/}
      {/*  {getFieldDecorator("gtin", {*/}
      {/*    initialValue: sellerProduct?.product?.gtin,*/}
      {/*    rules: [{ required: true, message: "Please GTIN!" }]*/}
      {/*  })(<InlineInput label="GTIN" placeholder="GTIN" />)}*/}
      {/*</Form.Item>*/}

      <Form.Item hasFeedback>
        {getFieldDecorator("Keywords", {
          initialValue: sellerProduct?.product?.keywords,
          rules: [{ required: true, message: "Please input Keywords!" }]
        })(<InlineInput label="Keywords " placeholder="Keywords " />)}
      </Form.Item>

    </>
  );
};

export default Additional;
