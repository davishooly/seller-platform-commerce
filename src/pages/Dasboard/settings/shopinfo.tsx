import React from 'react';
import {Row, Col, Button, Divider, Form} from 'antd';
import { InlineInput } from 'components/Input';
import {useSelector} from "react-redux";

const ShopInfo = ({ form }: any ) => {

    const seller = useSelector((state: any) => state.entities.seller);

    const {
        getFieldDecorator,
    } = form;

    return (
        <>
            <h2> Shop Info </h2>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>

                    <Form.Item>
                        {getFieldDecorator("Business Name", {
                            initialValue: seller?.businessName,
                            rules: [{ required: true, message: "Please add Business Name" }]
                        })(<InlineInput
                            tip="What is business display name?"
                            label="Business Name"
                            placeholder="Business Name" />)}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator("Bank location", {
                            initialValue: seller?.shortDescription,
                            rules: [{ required: true, message: "Please add Bank location!" }]
                        })(<InlineInput
                            textarea
                            rows={5}
                            label="Bank location"
                            placeholder="About the Shop"
                        />)}
                    </Form.Item>


                    <Button type="primary" style={{ marginTop: "2rem" }}>
                        Update
                    </Button>

                </Col>
            </Row>
        </>
    );
}

export default Form.create<any>({ name: "edit" })(ShopInfo);
