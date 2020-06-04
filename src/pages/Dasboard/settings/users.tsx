import React from 'react';
import {Button, Col, Divider, Form, Row} from "antd";
import {InlineInput} from "../../../components/Input";
import {useRequest} from "redux-query-react";
import {readSeller} from "../../../state/seller";
import {useSelector} from "react-redux";


const Users = ({ form }: any ) => {

    const seller = useSelector((state: any) => state.entities.seller);

    const  [{ isFinished}] =  useRequest(readSeller(seller?.id));

    const sellerInfo = useSelector((state: any) => state.entities.sellerInfo);



    console.log({ sellerInfo});

    const {
        getFieldDecorator,
    } = form;

    return (
        <>
            <h2> Personal Information </h2>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item>
                        {getFieldDecorator("Username", {
                            initialValue: "username",
                            rules: [{ required: true, message: "Please input Username" }]
                        })(<InlineInput label="username" placeholder="Barcode" />)}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator("email", {
                            initialValue: "hoolykim@gmail.com",
                            rules: [{ required: true, type: "email", message: "Please enter a valid email!" }]
                        })(<InlineInput label="email" placeholder="GTIN" />)}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator("phone number", {
                            initialValue: "0716334833",
                            rules: [{ required: true, message: "Please input phone number!" }]
                        })(<InlineInput label="phone number" placeholder="Keywords " />)}
                    </Form.Item>

                    <Button type="primary" style={{ marginTop: "2rem" }}>
                        Update
                    </Button>

                </Col>
            </Row>
        </>
    );
}
export default Form.create<any>({ name: "edit" })(Users);

