import React from 'react';
import { Form, List, Avatar, Button } from 'antd';
import { Upload, Icon, message } from 'antd';
import { InlineInput } from 'components/Input';
import { SellerProduct } from 'api/src';
// import { ProductMedia } from "api/src/models/ProductMedia";

const { Dragger } = Upload;

interface IProps {
    form: any;
    sellerProduct: SellerProduct;
}

const props = {
    name: 'file',
    multiple: true,

    beforeUpload: () => {
        return false;
    },
    onChange(info: any) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const Images: React.FC<IProps> = ({ form, sellerProduct }: any) => {
    const data = sellerProduct?.product?.media;
    const { getFieldDecorator } = form;

    return (
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other band
                    files
                </p>
            </Dragger>
            <List
                header={<div> Product Images </div>}
                style={{ marginTop: '1rem' }}
                bordered
                dataSource={data}
                renderItem={(item: any) => (
                    <List.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Avatar shape="square" size={64} src={item.file} />

                            <div>
                                <h4> Product Image 1 </h4>

                                <Button type="danger" shape="circle" icon="delete" />
                            </div>
                        </div>

                        <div>
                            <Button> Set as Primary image </Button>
                            <Form onSubmit={() => console.log('submit')}>
                                <Form.Item>
                                    {getFieldDecorator('Ordering', {
                                        initialValue: item.ordering,
                                        rules: [{ required: true, message: 'Please input product name' }],
                                    })(<InlineInput value={0} label="Ordering" placeholder="Ordering" type="number" />)}
                                </Form.Item>
                            </Form>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Form.create<any>({ name: 'images' })(Images);
