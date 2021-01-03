import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Button, Icon } from 'antd';
import { Action } from './images';
import { TabsContainer } from './styles';
import { hasErrors } from 'utils/validators';

type Props = {
    onNext(value: any): void;
    variations: Array<string>;
    form: any;
    callback(value: string): void;
};

const Pricing = ({ onNext, form, callback, variations }: Props) => {
    const [variants, setVariants] = useState(['variant']);

    const [deletedVariants, setDeletedVariants] = useState<any>([]);

    const { getFieldDecorator, getFieldError, validateFields, isFieldTouched, getFieldsError } = form;

    useEffect(() => {
        validateFields();
    }, []);

    const labelError = (name: string) => isFieldTouched(name) && getFieldError(name);

    const formatData = (data: any) => {
        const formattedData: any = [];
        Object.keys(data).forEach((value, i) => {
            if (data[`price${i}`] !== undefined) {
                formattedData.push({
                    minimumPrice: Number(data[`price${i}`]),
                    availableUnits: Number(data[`quantity${i}`]),
                    salePrice: data[`salesPrice${i}`],
                    variation: variations[0],
                    requiresShipping: true,
                    sku: data[`sku${i}`],
                    value: data[`${variations[0]}${i}`],
                    barcode: '',
                    b2bQuantity: 0,
                    provisionalPrice: data[`salesPrice${i}`],
                    trackInventory: true,
                    taxable: true,
                    weight: 20,
                    weightUnit: 'g',
                });
            }
        });
        return formattedData;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
            if (!err) {
                const formattedData = formatData(values);
                onNext({ variants: formattedData });
            }
        });
    };

    const deleteVariant = (variantId: any) => {
        setDeletedVariants([...deletedVariants, variantId]);
    };

    const renderVariationFields = (index: number) => {
        return variations.map((variation: string) => (
            <>
                <Form.Item
                    key={index.toString()}
                    validateStatus={labelError(`${variation}${index}`) ? 'error' : ''}
                    help={labelError(variation) || ''}
                >
                    {getFieldDecorator(`${variation}${index}`, {
                        rules: [{ required: true, message: `Please provide ${variation}` }],
                    })(<Input placeholder={variation} />)}
                </Form.Item>
            </>
        ));
    };

    const renderFormContent = (index: number) => (
        <TabsContainer key={index.toString()} id={`variant${index}`}>
            <Col className="price__tabs">
                {/* eslint-disable-next-line react/prop-types */}
                {variations.length ? renderVariationFields(index) : ''}

                <Form.Item validateStatus={labelError(`sku${index}`) ? 'error' : ''} help={labelError('sku') || ''}>
                    {getFieldDecorator(`sku${index}`, {
                        rules: [{ required: true, message: 'Please provide stock keeping unit!' }],
                    })(<Input placeholder="sku" />)}
                </Form.Item>

                <Form.Item validateStatus={labelError('quantity') ? 'error' : ''} help={labelError('quantity') || ''}>
                    {getFieldDecorator(`quantity${index}`, {
                        rules: [{ required: true, message: 'How many units do you care for!' }],
                    })(<Input placeholder="Quantity" type="number" />)}
                </Form.Item>

                <Form.Item validateStatus={labelError('price') ? 'error' : ''} help={labelError('price') || ''}>
                    {getFieldDecorator(`price${index}`, {
                        rules: [{ required: true, message: 'Please provide price!' }],
                    })(<Input prefix="ksh" placeholder="price" type="number" />)}
                </Form.Item>

                <Form.Item
                    validateStatus={labelError('salesPrice') ? 'error' : ''}
                    help={labelError('salesPrice') || ''}
                >
                    {getFieldDecorator(`salesPrice${index}`, {
                        rules: [{ required: true, message: 'Please provide sale price!' }],
                    })(<Input prefix="ksh" name="" placeholder="Sale Price" type="number" />)}
                </Form.Item>
                <>{index === 0 ? '' : <Icon onClick={() => deleteVariant(index)} type="close" />}</>
            </Col>
        </TabsContainer>
    );
    const incrementVariants = (count: number) => {
        setVariants([...variants, `variant${count}`]);
    };

    return (
        <>
            <Form layout="inline" onSubmit={handleSubmit}>
                <Row>
                    <div>
                        {variants.map((value: any, index: number) => {
                            return deletedVariants.includes(index) ? '' : renderFormContent(index);
                        })}
                        <Form.Item>
                            <TabsContainer>
                                <Button
                                    className="variants__buttons"
                                    type="dashed"
                                    onClick={() => incrementVariants(variants.length - 1)}
                                >
                                    <Icon type="plus" /> Add product Variation
                                </Button>
                            </TabsContainer>
                        </Form.Item>
                    </div>
                </Row>

                <Action>
                    <Button onClick={() => callback('2')}> Back </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => callback('4')}
                        disabled={hasErrors(getFieldsError())}
                    >
                        Save and proceed
                    </Button>
                </Action>
            </Form>
        </>
    );
};

export default Form.create<any>({ name: 'pricing' })(Pricing);
