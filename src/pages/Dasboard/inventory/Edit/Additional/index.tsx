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
      <Form.Item>
        {getFieldDecorator("Barcode", {
          initialValue: sellerProduct?.product?.barcode,
          rules: [{ required: true, message: "Please input barcode" }]
        })(<InlineInput label="Barcode" placeholder="Barcode" />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("gtin", {
          initialValue: sellerProduct?.product?.gtin,
          rules: [{ required: true, message: "Please GTIN!" }]
        })(<InlineInput label="GTIN" placeholder="GTIN" />)}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator("width", {
          initialValue: sellerProduct?.product?.width,
          rules: [{ required: true, message: "Please input width!" }]
        })(
          <InlineInput
            label="Width"
            placeholder="width"
            type="number"
            tip="mm"
          />
        )}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator("height", {
          initialValue: sellerProduct?.product?.height,
          rules: [{ required: true, message: "Please input Height!" }]
        })(
          <InlineInput
            label="Height"
            placeholder="Height"
            type="number"
            tip="mm"
          />
        )}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator("depth", {
          initialValue: sellerProduct?.product?.depth,
          rules: [{ required: true, message: "Please input Depth!" }]
        })(
          <InlineInput
            label="Depth"
            placeholder="Depth"
            type="number"
            tip="mm"
          />
        )}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator("net_weight", {
          initialValue: sellerProduct?.product?.netWeight,
          rules: [{ required: true, message: "Please input Net weight!" }]
        })(
          <InlineInput
            label="Net weight"
            placeholder="Net weight"
            type="number"
            tip="g"
          />
        )}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator("gross_weigh", {
          initialValue: sellerProduct?.product?.grossWeight,
          rules: [{ required: true, message: "Please input Gross weigh!" }]
        })(
          <InlineInput
            label="Gross weigh"
            placeholder="Gross weigh"
            type="number"
            tip="g"
          />
        )}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator("Keywords", {
          initialValue: sellerProduct?.product?.keywords,
          rules: [{ required: true, message: "Please input Keywords!" }]
        })(<InlineInput label="Keywords " placeholder="Keywords " />)}
      </Form.Item>

      <Button type="primary" size="large">
        Save
      </Button>
    </>
  );
};

export default Form.create<any>({ name: "basic" })(Additional);
