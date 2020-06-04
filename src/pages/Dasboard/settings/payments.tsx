import React from 'react';
import {Button, Col, Divider, Form, Row} from "antd";
import {InlineInput} from "../../../components/Input";
import {useSelector} from "react-redux";


const Payment = ({ form }: any ) => {

    const seller = useSelector((state: any) => state.entities.sellerInfo);

    const {
        getFieldDecorator,
    } = form;

    return (
        <>
            <h2> Payment Information </h2>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item hasFeedback>
                        {getFieldDecorator("Bank name", {
                            initialValue: seller?.bank?.name,
                            rules: [{ required: true, message: "Please input bank" }]
                        })(<InlineInput label="Bank Name" placeholder="Bank name" />)}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator("Bank location", {
                            initialValue: seller?.bank?.location,
                            rules: [{ required: true, message: "Please add  Bank location!" }]
                        })(<InlineInput label="Bank location" placeholder="location" />)}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator("account", {
                            initialValue: seller?.bank?.accNumber,
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

