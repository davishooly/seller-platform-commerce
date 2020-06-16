import styled from 'styled-components';
import { device } from '../../mediaScreen/mediaQueries';

const Container = styled.div`
    padding: 20px 100px;
    width: 100%;

    @media only screen and ${device.mobileS} and (max-device-width: 768px) {
        padding: 20px;
    }
`;

export default Container;
