import React, { useState } from "react";
import { Button, Form, Layout, Menu } from "antd";
import Container from "components/Common/Container";
import { InlineInput } from "components/Input";

import BasicInfo from "./BasicInfo";
import Additional from "./Additional";
import Images from "./Images";
import { useSellerProduct } from "state/product";
import {hasErrors} from "../../../../utils/validators";
import { useMutation } from "redux-query-react";
import {updateSellerProduct} from "./updateProducts";

const { Header, Footer, Sider, Content } = Layout;

const Edit: React.FC<any> = ({ form , match }) => {
  const {
    getFieldDecorator,
    getFieldError,
    validateFields,
    isFieldTouched,
    getFieldsError
  } = form;
  const [ page, setPage ]  = useState("1")
  const id = match.params?.id

  const sellerProduct = useSellerProduct(id)

  const [productDetails, setDetails] = useState(sellerProduct)


  const [{ isFinished, isPending}, updateProduct] = useMutation(product => (
      updateSellerProduct(product)
  ))


  const handleSubmit = (e:any) => {
    e.preventDefault()
    form.validateFields((err: any, values: any) => {
      if (!err) {
        const newProduct = { ...sellerProduct, ...sellerProduct.product, ...values }
        updateProduct(newProduct);
      }
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Sider style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[page]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <Menu.Item key="1" onClick={() => setPage("1")}>Basic Information</Menu.Item>
              <Menu.Item key="2" onClick={() => setPage("2")}>Additional Details</Menu.Item>
              <Menu.Item key="3" onClick={() => setPage("3")} >Product Images</Menu.Item>
              <Menu.Item key="4" onClick={() => setPage("4")}>Stock management</Menu.Item>
              <Menu.Item key="5" onClick={() => setPage("5")}>Orders</Menu.Item>
            </Menu>
          </Sider>
          <Content
            style={{ padding: "0 24px", minHeight: "200px", maxWidth: "700px" }}
          >
          { page === "1" && <BasicInfo form={form} sellerProduct={sellerProduct} />}
          { page === "2" && <Additional form={form} sellerProduct={sellerProduct} />}
          { page === "3" && <Images sellerProduct={sellerProduct} />}
            <Button
                type="primary"
                size="large"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
            >
              Save
            </Button>
          </Content>
        </Layout>
      </Form>
    </Container>
  );
};

export default Form.create<any>({ name: "edit" })(Edit);
