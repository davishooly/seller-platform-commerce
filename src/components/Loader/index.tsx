import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Div = styled.div`
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
`;

const Loader = () => {
    return (
        <Div>
            <Spin size="large" tip="Loading..." />
        </Div>
    );
};

export default Loader;
