import React, { useEffect } from "react";
import { InlineInput } from "components/Input";
import { Button, Form } from "antd";
import styled from "styled-components";
import { hasErrors } from "utils/validators";

const Action = styled.div`
  button {
    margin-right: 2rem;
  }
`;

const ProductInfo = ({ form, onNext, onPrevClick, callback }: any) => {
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

  const nameError = isFieldTouched("name") && getFieldError("name");
  const brandError = isFieldTouched("brand") && getFieldError("brand");
  const keywordsError = isFieldTouched("keywords") && getFieldError("keywords");

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
        validateStatus={nameError ? "error" : ""}
        help={nameError || ""}
      >
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Please input a product name!" }]
        })(
          <InlineInput
            label="Product Name"
            tip="Max. 250 characters"
            placeholder="Example: Olympus Camedia C-50 Digital Camera"
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={brandError ? "error" : ""}
        help={brandError || ""}
      >
        {getFieldDecorator("brand", {
          rules: [{ required: true, message: "Please input a brand name!" }]
        })(
          <InlineInput
            label="Brand"
            tip="The name of the manufacturer or publisher who issued the product"
            placeholder="Example: Sony, Nikon, Samsung"
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={keywordsError ? "error" : ""}
        help={keywordsError || ""}
      >
        {getFieldDecorator("keywords", {
          rules: [{ required: true, message: "Please input a keywords name!" }]
        })(
          <InlineInput
            label="Keywords"
            type="string"
            tip="Add relevant search queries to help find your product on the site via search"
            placeholder="Example: Digital Camera, Light Camera "
          />
        )}
      </Form.Item>

      <Action>
        <Button onClick={onPrevClick}> Back </Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
          onClick={()=> callback("2")}
        >
          Save and proceed
        </Button>
      </Action>
    </Form>
  );
};

export default Form.create<any>({ name: "product_info" })(ProductInfo);
