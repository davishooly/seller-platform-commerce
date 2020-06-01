import React, { useEffect } from "react";
import { InlineInput } from "components/Input";
import { Button, Form } from "antd";
import styled from "styled-components";
import { hasErrors } from "utils/validators";
import {size} from "../../../mediaScreen/devices";

const Action = styled.div`
  button {
    margin-right: 2rem;
  }
`;

const Additional = ({ form, onNext, callback }: any) => {
  const {
    getFieldDecorator,
    getFieldError,
    validateFields,
    isFieldTouched,
    getFieldsError
  } = form;

  useEffect(() => {
    validateFields();
  }, []);

  // field validations
  const barcodeError = isFieldTouched("barcode") && getFieldError("barcode");
  const gtinError = isFieldTouched("gtin") && getFieldError("gtin");
  const netWeightError = isFieldTouched("net_weight") && getFieldError("net_weight");
  const sizeError =
    isFieldTouched("size") && getFieldError("size");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        onNext(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Item
        validateStatus={barcodeError ? "error" : ""}
        help={barcodeError || ""}
      >
        {getFieldDecorator("barcode", {
          rules: [{ required: false, message: "You can enter the barcode number for your product. This is useful for inventory/stock tracking and analysis." }]
        })(
          <InlineInput
            label="Barcode"
            tip="Max. 250 characters"
            placeholder="Your barcode number"
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={gtinError ? "error" : ""}
        help={gtinError || ""}
      >
        {getFieldDecorator("gtin", {
          rules: [{ required: true, message: "Please input a brand name!" }]
        })(
          <InlineInput
            label="GTIN"
            tip="The name of the manufacturer or publisher who issued the product"
            placeholder="Example: Sony, Nikon, Samsung"
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={netWeightError ? "error" : ""}
        help={netWeightError || ""}
      >
        {getFieldDecorator("net_weight", {
          rules: [{ required: true, message: "Please input a Net weight!" }]
        })(
          <InlineInput
            label="Weight"
            tip="kg"
            placeholder="Example: 20kg"
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={sizeError ? "error" : ""}
        help={sizeError || ""}
      >
        {getFieldDecorator("size", {
          rules: [{ required: true, message: "Please input size!" }]
        })(
          <InlineInput
            label="Size"
            tip="Add measurements in centimeter"
            placeholder="Example 5 X 10"
          />
        )}
      </Form.Item>

      <Action>
        <Button onClick={ () => callback("1")}> Back </Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
          onClick={() => callback("3")}
        >
          Save and proceed
        </Button>
      </Action>
    </Form>
  );
};

export default Form.create<any>({ name: "product_info" })(Additional);
