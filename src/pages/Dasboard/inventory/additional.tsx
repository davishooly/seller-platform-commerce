import React, { useEffect } from "react";
import { InlineInput } from "components/Input";
import { Button, Form, Select } from "antd";
import styled from "styled-components";
import { hasErrors } from "utils/validators";


const Action = styled.div`
  button {
    margin-right: 2rem;
  }
`;

const { Option } = Select;


const children: Array<any> = [];

export const options = [
    { value: "Size", index: 0},
    { value: "Color", index:1},
    { value: "packaging", index:2 },
    { value:"local", index:3 },
    {value: "imported", index:4 }

    ];

for (let i = 0; i < options.length; i++) {
    children.push(<Option key={options[i].value}>{options[i].value}</Option>);
}

const Additional: React.FC = ({ form, onNext, callback, setSize }: any) => {
  const {
    getFieldDecorator,
    getFieldError,
    validateFields,
    isFieldTouched,
    getFieldsError
  } = form;


  const handleSizeChange = (e: any) => {
      setSize(e);
  };

  useEffect(() => {
    validateFields();
  }, []);

  // field validations
  const barcodeError = isFieldTouched("barcode") && getFieldError("barcode");
  const gtinError = isFieldTouched("gtin") && getFieldError("gtin");
  const netWeightError = isFieldTouched("net_weight") && getFieldError("net_weight");
  const variantError =
        isFieldTouched("variation types") && getFieldError("variation types");

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
          rules: [{ required: true, message: "Please input weight!" }]
        })(
          <InlineInput
            label="Weight"
            tip="kg"
            type="number"
            placeholder="Example: 20kg"
          />
        )}
      </Form.Item>
        <Form.Item
            validateStatus={netWeightError ? "error" : ""}
            help={netWeightError || ""}
        >
            {getFieldDecorator("basePrise", {
                rules: [{ required: true, message: "Please input base prose !" }]
            })(
                <InlineInput
                    label="Base price"
                    type="number"
                    placeholder="base price"
                />
            )}
        </Form.Item>

        <span > Choose product variant attribute (Example variant by color, size, material) </span>
        <Form.Item
            validateStatus={variantError ? "error" : ""}
            help={variantError || ""}
        >
            {getFieldDecorator("Variation types", {
            })(
                <Select
                    mode="tags"
                    placeholder="Example color, size"
                    onChange={handleSizeChange}
                    style={{ width: '100%' , height: "40px"}}
                >
                    {children}
                </Select>
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
