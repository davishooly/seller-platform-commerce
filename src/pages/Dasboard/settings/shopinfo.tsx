import React from 'react';
import {Row, Col, Button, Divider, Form, notification} from 'antd';
import { InlineInput } from 'components/Input';
import {useSelector} from "react-redux";
import {useUpdateSeller} from "./index";

const ShopInfo = ({ form }: any ) => {

    const seller = useSelector((state: any) => state.entities.sellerInfo);
    const { isPending,  updateSellerDetails } = useUpdateSeller();

    const {
        getFieldDecorator,
    } = form;


    const handleSubmit = (e:any) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
            if(!err){
                const updatedInfo =  {
                    businessName: values.businessName,
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
                    if(status === 200) {
                        notification.success({
                            message: "Success",
                            description: "Your Business details has been updated successfully"
                        });
                    }
                })
            }
        })
    };

    return (
        <>
            <h2> Shop Info </h2>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>
                    <Form onSubmit={handleSubmit}>
                    <Form.Item hasFeedback>
                        {getFieldDecorator("businessName", {
                            initialValue: seller?.businessName,
                            rules: [{ required: true, message: "Please add Business Name" }]
                        })(<InlineInput
                            tip="update your business name"
                            label="Business Name"
                            placeholder="Business Name" />)}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator("street", {
                            initialValue: seller?.address?.street,
                            rules: [{ required: true, message: "Please add Business Location" }]
                        })(<InlineInput
                            tip="update your street"
                            label="Street"
                            placeholder="street" />)}
                    </Form.Item>


                    <Form.Item hasFeedback>
                        {getFieldDecorator("city", {
                            initialValue: seller?.address?.city,
                            rules: [{ required: true, message: "Please add Business Name" }]
                        })(<InlineInput
                            tip="update your city"
                            label="City"
                            placeholder="city" />)}
                    </Form.Item>

                    <Form.Item hasFeedback>
                        {getFieldDecorator("shortDescription", {
                            initialValue: seller?.shortDescription,
                        })(<InlineInput
                            textarea
                            rows={5}
                            label="Business Description"
                            placeholder="About the Shop"
                        />)}
                    </Form.Item>
                        <Button  htmlType="submit" loading={isPending} type="primary" style={{ marginTop: "2rem" }}>
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default Form.create<any>({ name: "edit" })(ShopInfo);
