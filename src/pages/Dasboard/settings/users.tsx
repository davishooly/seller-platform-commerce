import React from 'react';
import {Button, Col, Divider, Form, Row} from "antd";
import {InlineInput} from "../../../components/Input";
import {useSelector} from "react-redux";


const Users = ({ form }: any ) => {

    const seller = useSelector((state: any) => state.entities.sellerInfo);

    const {
        getFieldDecorator,
    } = form;

    return (
        <>
            <h2> Personal Information </h2>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item hasFeedback>
                        {getFieldDecorator("Username", {
                            initialValue: seller?.owner?.username,
                            rules: [{ required: true, message: "Please input Username" }]
                        })(<InlineInput label="username" placeholder="username" />)}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator("email", {
                            initialValue: seller?.owner?.email,
                            rules: [{ required: true, type: "email", message: "Please enter a valid email!" }]
                        })(<InlineInput label="email" placeholder="email" />)}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator("first name", {
                            initialValue: seller?.owner?.firstName,
                            rules: [{ required: true, message: "Please enter a valid first name!" }]
                        })(<InlineInput label="first name" placeholder="first name" />)}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator("last name", {
                            initialValue: seller?.owner?.lastName,
                            rules: [{ required: true, message: "Please enter a valid last name!" }]
                        })(<InlineInput label="last name" placeholder="last name" />)}
                    </Form.Item>


                    <Form.Item hasFeedback>
                        {getFieldDecorator("phone number", {
                            initialValue: seller?.phoneNumber,
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

