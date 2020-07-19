import styled from 'styled-components';
import { device } from '../../mediaScreen/mediaQueries';

const Menu = styled.ul`
    width: 100%;
    background-color: #ffffff;
    box-shadow: inset 0 -1px 0 0 rgba(32, 51, 65, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    color: #000;

    display: flex;
    list-style: none;

    align-items: center;
    padding: 20px 100px;

    @media only screen and ${device.mobileS} and (max-device-width: 768px) {
        padding: 20px 0 !important;
        .welcome {
            text-align: center;
            display: block;
            width: 100%;
        }
    }

    a {
        color: #131a1e;
    }

    li {
        padding-right: 30px;
        @media only screen and ${device.mobileS} and (max-device-width: 768px) {
            padding: unset;
            font-size: 14px;
        }

        @media only screen and (max-device-width: 320px) {
            font-size: 12px;
        }
        font-size: 16px;
        line-height: 26px;
        padding-left: 0;
    }

    .active {
        color: #0065b0;
        border-bottom: 1px solid #0065b0;
        font-weight: bold;
        padding-bottom: 6px;
    }
`;

export default Menu;
