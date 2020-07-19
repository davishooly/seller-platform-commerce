import styled from 'styled-components';
import { device } from '../../../mediaScreen/mediaQueries';

const StyledSettings = styled.div`
    @media only screen and ${device.mobileS} and (max-device-width: 768px) {
        .menu {
            padding: 20px 0;
            display: flex;
            width: 100%;
            justify-content: space-around;
        }
        .menu + div {
            padding: 20px;
            width: 90%;
            margin: 0 auto;
        }
        .ant-row {
            margin-left: unset !important;
            margin-right: unset !important;
            width: 100%;
            margin: 0 auto;

            .ant-col {
                width: 100%;

                .ant-form-item {
                    margin-bottom: 24px;
                    .label {
                        span {
                            display: none;
                        }
                    }
                }
            }
        }
    }

    @media only screen and (max-device-width: 320px) {
        .menu {
            li {
                padding-right: 20px;
            }
        }
    }
`;

export { StyledSettings };
