import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ResetPasswordContainer } from './styles';
import { AuthHeader } from './index';
import ThemeContext from '../../providers/themes/ThemeContext';
import { useWindowSize } from 'react-use';
import { Hamburger } from '../../components/Menu/hamburger';
import { menuItems } from '../../components/Layout';

const ResetPassword = ({ form }: any) => {
    const { getFieldDecorator } = form;

    const { themes } = useContext(ThemeContext);
    const { width } = useWindowSize();

    const onFinish = (e: any) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
            if (!err) {
                //
            }
        });
    };

    return (
        <>
            {width > 768 ? <AuthHeader reset themes={themes} /> : <Hamburger menuItems={menuItems} />}

            <ResetPasswordContainer>
                <Form onSubmit={onFinish}>
                    <div className="title">
                        <h1> {"First, let's find your account"} </h1>
                        <h3> Please enter your email or phone </h3>
                    </div>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />)}
                    </Form.Item>

                    <Form.Item>
                        <Button loading={false} type="ghost" className="login-form-button">
                            <Link to={'/login'}>Cancel</Link>
                        </Button>
                        <Button loading={false} type="primary" htmlType="submit" className="login-form-button">
                            Find account
                        </Button>
                    </Form.Item>
                </Form>
            </ResetPasswordContainer>
        </>
    );
};

export default Form.create<any>({ name: 'reset' })(ResetPassword);
