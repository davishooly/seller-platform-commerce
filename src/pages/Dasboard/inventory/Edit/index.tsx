import React, { useState } from 'react';
import { Button, Form, Layout, Menu, notification } from 'antd';
import { useParams } from 'react-router-dom';
import Container from 'components/Common/Container';

import BasicInfo from './BasicInfo';
import Additional from './Additional';
import Images from './Images';
import { getSellerProduct } from 'state/product';
import { hasErrors } from '../../../../utils/validators';
import { useMutation, useRequest } from 'redux-query-react';
import { updateSellerProduct } from './updateProducts';
import { useSelector } from 'react-redux';

const { Sider, Content } = Layout;

const Edit: React.FC<any> = ({ form }) => {
    const { getFieldsError } = form;
    const [page, setPage] = useState('1');

    const { id } = useParams();

    useRequest(getSellerProduct(id));

    const sellerProduct = useSelector((state: any) => state.entities.currentSellerProduct);

    const [productDetails, setDetails] = useState(sellerProduct);

    const [{ isPending }, updateProduct] = useMutation((product) => updateSellerProduct(product));

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
            if (!err) {
                const newProduct = {
                    id: sellerProduct.pk,
                    product: {
                        ...sellerProduct.product,
                        ...values,
                    },
                    value: [{ ...sellerProduct.values[0], ...values, id: sellerProduct.pk }],
                };

                console.log({ newProduct });

                updateProduct(newProduct).then((result: any) => {
                    if (result.status === 200) {
                        notification.success({
                            message: 'Success',
                            description: 'Your Product details has been updated successfully',
                        });
                    }
                });
            }
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[page]}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <Menu.Item key="1" onClick={() => setPage('1')}>
                                Basic Information
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => setPage('2')}>
                                Additional Details
                            </Menu.Item>
                            <Menu.Item key="3" onClick={() => setPage('3')}>
                                Product Images
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 46px', minHeight: '200px', maxWidth: '700px' }}>
                        {page === '1' && <BasicInfo form={form} sellerProduct={sellerProduct} />}
                        {page === '2' && <Additional form={form} sellerProduct={sellerProduct} />}
                        {page === '3' && <Images sellerProduct={sellerProduct} />}
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={isPending}
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

export default Form.create<any>({ name: 'edit' })(Edit);
