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
  const skuError = isFieldTouched("sku") && getFieldError("sku");
  const brandError = isFieldTouched("brand") && getFieldError("brand");
  const colorError = isFieldTouched("color") && getFieldError("color");
  const keywordsError = isFieldTouched("keywords") && getFieldError("keywords");
  const colorFamilyError =
    isFieldTouched("color_family") && getFieldError("color_family");

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

      <Form.Item validateStatus={skuError ? "error" : ""} help={skuError || ""}>
        {getFieldDecorator("sku", {
          rules: [{ required: true, message: "Please input a SKU!" }]
        })(<InlineInput label="SKU" tip="Enter SKU" placeholder="xxxxxxxx" />)}
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
        validateStatus={colorError ? "error" : ""}
        help={colorError || ""}
      >
        {getFieldDecorator("color", {
          rules: [{ required: true, message: "Please input a color name!" }]
        })(
          <InlineInput
            label="Color"
            tip="The main color of the product"
            placeholder="Example: Red, Green, Blue"
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={colorFamilyError ? "error" : ""}
        help={colorFamilyError || ""}
      >
        {getFieldDecorator("color_family", {
          rules: [{ required: false }]
        })(
          <InlineInput
            label="Color Family"
            tip="Color family of the product"
            placeholder="Color family"
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
