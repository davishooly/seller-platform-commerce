import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Button, Icon } from 'antd';
import { Action } from './images';
import { TabsContainer } from './styles'
import {hasErrors} from "utils/validators";


const Pricing: React.FC<any> = ({ product, onNext, form, callback, }: any) => {

    const [ variants, setVariants ] = useState(["variant"]);

    const [deletedVariants, setDeletedVariants] = useState<any>([]);

    const { getFieldDecorator, getFieldError, validateFields, isFieldTouched, getFieldsError } = form;


    useEffect(() => {
        validateFields()
    }, []);

    const labelError = (name: string) => isFieldTouched(name) && getFieldError(name);

    const formatData = (data: any) => {
        const formattedData: any = [];
        Object.keys(data).forEach((value, i) => {
            if(data[`price${i}`] !== undefined) {
                formattedData.push({
                    price: Number(data[`price${i}`]),
                    inventoryQuantity: Number(data[`quantity${i}`]),
                    compareAtPrice: data[`salesPrice${i}`],
                    name: data[`name${i}`],
                    requiresShipping: true,
                    sku: data[`sku${i}`],
                    barcode:"",
                    trackInventory: true,
                    taxable: true,
                    weight: 20,
                    weightUnit:"g"
                })
            }
        });
        return formattedData;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
            if (!err) {
                const formattedData = formatData(values);
                onNext({variants: formattedData});
            }
        })

    };

    const deleteVariant = (variantId: any) => {
        setDeletedVariants([...deletedVariants, variantId])
    };

    const renderFormContent = (index: number) => (
            <TabsContainer id={`variant${index}`}>
                <Col className="price__tabs">

                    <Form.Item
                        validateStatus={labelError(`name${index}`) ? 'error': '' }
                        help={labelError("name") || '' }
                    >
                        {getFieldDecorator(`name${index}`, {
                            rules: [{ required: true, message: 'Please provide variant name'  }]
                        })(<Input  placeholder="name" />)}
                    </Form.Item>


                    <Form.Item
                        validateStatus={labelError(`sku${index}`) ? 'error': '' }
                        help={labelError("sku") || '' }
                    >
                        {getFieldDecorator(`sku${index}`, {
                            rules: [{ required: true, message: 'Please provide stock keeping unit!'  }]
                        })(<Input  placeholder="sku" />)}
                    </Form.Item>

                    <Form.Item
                        validateStatus={labelError("quantity") ? 'error': '' }
                        help={labelError("quantity") || '' }
                    >
                        {getFieldDecorator(`quantity${index}`, {
                            rules: [
                                { required: true, message: 'How many units do you care for!'  },
                            ]
                        })(<Input  placeholder="Quantity" type="number" />)}
                    </Form.Item>

                    <Form.Item
                        validateStatus={labelError("price") ? 'error': '' }
                        help={labelError("price") || '' }
                    >
                        {getFieldDecorator(`price${index}`, {
                            rules: [
                                {required: true, message: 'Please provide price!'},
                            ]
                        })(<Input prefix="$" placeholder="price" suffix="KSH" type="number"/>) }
                    </Form.Item>

                    <Form.Item
                        validateStatus={labelError("salesPrice") ? 'error': '' }
                        help={labelError("salesPrice") || '' }
                    >
                        {getFieldDecorator(`salesPrice${index}`, {
                            rules: [
                                {required: true, message: 'Please provide sale price!'},
                            ]
                        })( <Input name="" prefix="$" placeholder="Sale Price" suffix="KSH" type="number" />) }
                    </Form.Item>
                    <>
                        {
                            index === 0
                                ? ''
                                :
                                <Icon onClick={ () => deleteVariant(index)} type="close" />
                        }
                    </>
                </Col>
            </TabsContainer>
        )
    ;
    const incrementVariants = (count: number) => {
        setVariants( [ ...variants, `variant${count}`])
    };

    return (
        <>
            <Form layout="inline" onSubmit={handleSubmit}>
                <Row>
                    <div >
                        {
                            variants.map((value: any,index: number) => {
                                return deletedVariants.includes(index) ? '' : renderFormContent(index)
                            }) }
                        <Form.Item>
                            <TabsContainer>
                            <Button className="variants__buttons" type="dashed" onClick={() =>incrementVariants(variants.length -1)}  >
                                <Icon type="plus" /> Add product Variation
                            </Button>
                            </TabsContainer>
                        </Form.Item>
                    </div>

                </Row>

                <Action>
                    <Button
                    onClick={()=>callback("2")}> Back </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Save and proceed
                    </Button>
                </Action>

            </Form>
        </>
    )
};


export default Form.create({ name: 'pricing' })(Pricing);
