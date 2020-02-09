import React from "react";
import { Button, Form, Layout, Menu, Select } from "antd";
import RichEditor from "components/Input/editor";
import { InlineInput, Inline } from "components/Input";
import { SellerProduct } from "api/src";

const { Option } = Select;

interface IProps {
  form: any;
  sellerProduct: SellerProduct;
}

const BasicInfo: React.FC<IProps> = ({ form, sellerProduct }) => {
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
        {getFieldDecorator("name", {
          initialValue: sellerProduct?.product?.name,
          rules: [{ required: true, message: "Please input product name" }]
        })(<InlineInput label="Name" placeholder="Product Name" />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("sku", {
          initialValue: sellerProduct?.product?.sku,
          rules: [{ required: true, message: "Please input sku!" }]
        })(<InlineInput label="SKU" placeholder="SKU" />)}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator("price", {
          initialValue: sellerProduct?.defaultPrice,
          rules: [{ required: true, message: "Please input price!" }]
        })(
          <InlineInput
            label="Price"
            placeholder="price"
            type="number"
            prefix="$"
          />
        )}
      </Form.Item>

      <Form.Item hasFeedback>
        {getFieldDecorator("sale_price", {
          initialValue: sellerProduct?.salePrice,
          rules: [{ required: true, message: "Please input price!" }]
        })(
          <InlineInput
            label="Sale Price"
            placeholder="Sale Price"
            type="number"
            prefix="$"
          />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("visibility", {
          initialValue: sellerProduct?.visibility,
          rules: [{ required: true, message: "Please input Visibility!" }]
        })(
          <Inline label="Visibility" placeholder="Visibility">
            <Select
              showSearch
              // style={{ }}
              placeholder="Select  Visibility"
              optionFilterProp="children"
            >
              <Option value={1}>not visible</Option>
              <Option value={2}>Searchable</Option>
              <Option value={3}>Listed</Option>
              <Option value={4}>Always Visible</Option>
            </Select>
          </Inline>
        )}
      </Form.Item>

      <Form.Item>
      <Inline label="Description" placeholder="">
        <RichEditor
          placeholder="This is a text editor.  Add and edit as you wish."
          editorType="package"
        />

        </Inline>
      </Form.Item>

      <Button type="primary" size="large">
        Save
      </Button>
    </>
  );
};

export default Form.create<any>({ name: "basic" })(BasicInfo);
