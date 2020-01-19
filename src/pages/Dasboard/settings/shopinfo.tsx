import React from 'react';
import { Row, Col, Button, Divider } from 'antd';
import Input from 'components/Input';

const ShopInfo = () => {
    return (
        <>
            <h2> Shop Info </h2>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>

                    <Input
                        label="Your unique business display name"
                        tip="What is business display name?"
                        placeholder="Display name"
                    />


                    <Input
                        textarea
                        rows={5}
                        label="About the Shop"

                        placeholder="About the Shop"
                    />


                    <Button type="primary" style={{ marginTop: "2rem" }}>
                        Update Settings
                    </Button>

                </Col>
            </Row>
        </>
    );
}

export default ShopInfo;
