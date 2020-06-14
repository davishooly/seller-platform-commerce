import styled, { css } from 'styled-components';

const HamburgerContainer = styled.div<any>`
    display: flex;
    flex-direction: column;

    ${(props) =>
        props.isMenuOpen &&
        css<any>`
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 99;
            background: #00ad9f;
        `}

    svg path {
        fill: #006dbf;
    }
    svg:not(:root) {
        width: 48px;
    }

    .top__section {
        height: 80px;
        display: flex;
        align-items: center;

        .toggle__container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            padding: 20px;
            border-radius: 4px;
            background: #f7f8f8;
            width: 98%;
            margin: 0 auto;

            .brand__section {
                display: flex;
                width: 78%;
                align-items: center;
                justify-content: space-evenly;

                span {
                    font-weight: 900;
                    font-size: 20px;
                    @media only screen and (max-width: 320px) {
                        font-size: 16px;
                    }
                }
            }

            .anticon {
                font-size: 30px;
            }
        }
    }
    .menu__items--section {
        width: 90%;
        margin: 0 auto;
        color: #fff;
        font-weight: 700;
        font-size: 1.5625em;

        div {
            height: 50%;
        }
    }
`;

export { HamburgerContainer };
