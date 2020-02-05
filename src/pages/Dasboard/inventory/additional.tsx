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

const Additional = ({ form, onNext, onPrevClick, save }: any) => {
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

  const barcodeError = isFieldTouched("barcode") && getFieldError("barcode");
  const gtinError = isFieldTouched("gtin") && getFieldError("gtin");
  const widthError = isFieldTouched("width") && getFieldError("width");
  const heightError = isFieldTouched("height") && getFieldError("height");
  const depthError = isFieldTouched("depth") && getFieldError("depth");
  const netWeightError = isFieldTouched("net_weight") && getFieldError("net_weight");
  const grossWeightError = isFieldTouched("gross_weight") && getFieldError("gross_weight");
  const defaultPriceError = isFieldTouched("default_price") && getFieldError("default_price");
  const slugError =
    isFieldTouched("slug") && getFieldError("slug");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        onNext(values);
        // save()

      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>

    <Form.Item  validateStatus={defaultPriceError ? "error" : ""}
    help={defaultPriceError || ""}>
    {getFieldDecorator("default_price", {
      rules: [{ required: true, message: "Please input Default price!" }]
    })(
      <InlineInput
        label="Default price"
        tip="required"
        placeholder="Default price"
      />
    )}
  </Form.Item>


  {/* <Form.Item>
    {getFieldDecorator("default_price", {
      rules: [{ required: true, message: "Please input Default price!" }]
    })(
      <InlineInput
        label="Sale price"
        tip="required"
        placeholder="Default price"
      />
    )}
    </Form.Item> */}

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
        validateStatus={widthError ? "error" : ""}
        help={widthError || ""}
      >
        {getFieldDecorator("width", {
          rules: [{ required: true, message: "Please input a width!" }]
        })(
          <InlineInput
            label="Width"
            tip="The main color of the product"
            placeholder="Example: Red, Green, Blue"
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={heightError ? "error" : ""}
        help={heightError || ""}
      >
        {getFieldDecorator("height", {
          rules: [{ required: false }]
        })(
          <InlineInput
            label="Height"
            tip="Color family of the product"
            placeholder="Color family"
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={depthError ? "error" : ""}
        help={depthError || ""}
      >
        {getFieldDecorator("depth", {
          rules: [{ required: true, message: "Please input a keywords name!" }]
        })(
          <InlineInput
            label="Depth"
            tip="Add relevant search queries to help find your product on the site via search"
            placeholder="Example: Digital Camera, Light Camera "
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
            label="Net weight"
            tip="Add relevant search queries to help find your product on the site via search"
            placeholder="Example: Digital Camera, Light Camera "
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={grossWeightError ? "error" : ""}
        help={grossWeightError || ""}
      >
        {getFieldDecorator("gross_weight", {
          rules: [{ required: true, message: "Please input a keywords name!" }]
        })(
          <InlineInput
            label="Gross Weight"
            tip="Add relevant search queries to help find your product on the site via search"
            placeholder="Example: Digital Camera, Light Camera "
          />
        )}
      </Form.Item>

      <Form.Item
        validateStatus={slugError ? "error" : ""}
        help={slugError || ""}
      >
        {getFieldDecorator("slug", {
          rules: [{ required: true, message: "Please input a slug!" }]
        })(
          <InlineInput
            label="Slug"
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
        >
          Save and proceed
        </Button>
      </Action>
    </Form>
  );
};

export default Form.create<any>({ name: "product_info" })(Additional);
