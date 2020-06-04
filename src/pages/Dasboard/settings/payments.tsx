import React from 'react';
import {Button, Col, Divider, Form, Row} from "antd";
import {InlineInput} from "../../../components/Input";


const Payment = ({ form }: any ) => {


    const {
        getFieldDecorator,
    } = form;

    return (
        <>
            <h2> Payment Information </h2>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item>
                        {getFieldDecorator("Bank name", {
                            initialValue: "Stanbic",
                            rules: [{ required: true, message: "Please input bank" }]
                        })(<InlineInput label="Bank Name" placeholder="Bank name" />)}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator("Bank location", {
                            initialValue: "Nairobi",
                            rules: [{ required: true, message: "Please add  Bank location!" }]
                        })(<InlineInput label="Bank location" placeholder="location" />)}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator("account", {
                            initialValue: "0228742724748",
                            rules: [{ required: true, message: "Please input bank account number!" }]
                        })(<InlineInput label="Bank Account" placeholder="account number" />)}
                    </Form.Item>

                    <Button type="primary" style={{ marginTop: "2rem" }}>
                        Update
                    </Button>

                </Col>
            </Row>

        </>
    );
}
export default Form.create<any>({ name: "edit" })(Payment);

