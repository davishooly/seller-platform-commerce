import React from "react";
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ResetPasswordContainer } from './styles'

const ResetPassword =  ( { form }: any) => {

    const { getFieldDecorator } = form;

    const onFinish = (e:any) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
            if (!err) {
            //
            }
        });
    };

    return (
        <ResetPasswordContainer>
            <Form onSubmit={onFinish}>
                <div className="title">
                    <h1> First, let's find your account </h1>
                    <h3> Please enter your email or phone </h3>
                </div>
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [{ required: true, message:  'Please input your email!' }]
                    })(
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                    )}

                </Form.Item>

                <Form.Item>
                    <Button loading={false} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <Button loading={false} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            </ResetPasswordContainer>
    )
};


export default Form.create<any>({ name: "reset"}, )(ResetPassword);
