import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Checkbox, Input, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import notification from '../../utils/toast';
import { loginSeller } from '../../state/auth/authQuery';
import { useDispatch } from 'react-redux';
import { useMutation } from 'redux-query-react';
import { setStoreTokens } from '../../state/auth';

const Login = ({ form }: any) => {
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();

    const history = useHistory();

    const [{ isPending }, loginMutation] = useMutation((user: any) =>
        loginSeller({
            ...user,
        }),
    );

    const onFinish = (e: any) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
            if (!err) {
                logInUser(values);
            }
        });
    };

    const logInUser = (values: any) => {
        loginMutation({ ...values }).then(redirect);
    };

    const redirect = (response: any) => {
        const {
            status,
            text,
            body: { expires_in, access_token, refresh_token },
        } = response && response;
        const { error, error_description } = JSON.parse(text);

        const now = new Date();

        if (status === 200 && !error) {
            notification.success({
                message: 'Success',
                description: 'Welcome back to OE Seller Center',
            });
            dispatch(
                setStoreTokens({
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    expiresIn: now.getTime() + expires_in,
                }),
            );
            history.push('/dashboard');
        } else {
            notification.error({
                message: 'Error',
                description: error_description,
            });
        }
    };

    return (
        <Form onSubmit={onFinish}>
            <div className="modal__container title">
                <h1> Welcome back! </h1>
            </div>
            <Divider />
            <Form.Item>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                })(<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />)}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />,
                )}
            </Form.Item>
            <Form.Item className="remember__section">
                <Form.Item>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <span className="login-form-forgot">
                    <Link to={'/checkpoint/request-password-reset'}> Forgot password </Link>
                </span>
            </Form.Item>

            <Form.Item>
                <Button loading={isPending} type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                <div className="create">
                    <span> Don’t have an account? </span>
                    <span id="sign up">
                        <Link to={'/new'}> Create it </Link>
                    </span>
                </div>
            </Form.Item>
        </Form>
    );
};

export default Form.create<any>({ name: 'login' })(Login);
