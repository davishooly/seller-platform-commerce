import React from 'react';
import { Button, Col, Divider, Form, notification, Row } from 'antd';
import { InlineInput } from '../../../components/Input';
import { useSelector } from 'react-redux';
import { useUpdateSeller } from './index';

const Users = ({ form }: any) => {
    const seller = useSelector((state: any) => state.entities.sellerInfo);
    const { isPending, updateSellerDetails } = useUpdateSeller();

    const { getFieldDecorator } = form;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
            if (!err) {
                const updatedInfo = {
                    businessName: seller.businessName,
                    phoneNumber: seller.phoneNumber,
                    name: seller.displayName,
                    ...seller.bank,
                    bankName: seller.bank.name,
                    addressName: seller.address.name,
                    personalMail: seller.owner.email,
                    ...seller.address,
                    ...seller.owner,
                    ...values,
                };
                updateSellerDetails(updatedInfo).then((result: any) => {
                    const { status } = result;
                    if (status === 200) {
                        notification.success({
                            message: 'Success',
                            description: 'Your user details has been updated successfully',
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="setting__container">
            <h2> Personal Information </h2>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Item hasFeedback>
                            {getFieldDecorator('username', {
                                initialValue: seller?.owner?.username,
                                rules: [{ required: true, message: 'Please input Username' }],
                            })(<InlineInput label="username" placeholder="username" />)}
                        </Form.Item>

                        <Form.Item hasFeedback>
                            {getFieldDecorator('email', {
                                initialValue: seller?.owner?.email,
                                rules: [{ required: true, type: 'email', message: 'Please enter a valid email!' }],
                            })(<InlineInput label="email" placeholder="email" />)}
                        </Form.Item>

                        <Form.Item hasFeedback>
                            {getFieldDecorator('firstName', {
                                initialValue: seller?.owner?.firstName,
                                rules: [{ required: true, message: 'Please enter a valid first name!' }],
                            })(<InlineInput label="first name" placeholder="first name" />)}
                        </Form.Item>

                        <Form.Item hasFeedback>
                            {getFieldDecorator('lastName', {
                                initialValue: seller?.owner?.lastName,
                                rules: [{ required: true, message: 'Please enter a valid last name!' }],
                            })(<InlineInput label="last name" placeholder="last name" />)}
                        </Form.Item>

                        <Form.Item hasFeedback>
                            {getFieldDecorator('phoneNumber', {
                                initialValue: seller?.phoneNumber,
                                rules: [{ required: true, message: 'Please input phone number!' }],
                            })(<InlineInput label="phone number" placeholder="Keywords " />)}
                        </Form.Item>
                        <Button htmlType="submit" loading={isPending} type="primary" style={{ marginTop: '2rem' }}>
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
export default Form.create<any>({ name: 'edit' })(Users);
