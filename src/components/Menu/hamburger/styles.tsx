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
            padding-top: 20px;
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

            ${(props) =>
                props.isMenuOpen &&
                css<any>`
                    background: unset;
                `}
            width: 100%;
            margin: 0 auto;

            .brand__section {
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: space-evenly;

                ${(props) =>
                    props.isMenuOpen &&
                    css<any>`
                        background: #f7f8f8;
                        border-radius: 40px;
                        padding: 8px;
                    `}

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
                ${(props) =>
                    props.isMenuOpen &&
                    css<any>`
                        svg path {
                            fill: #f7f8f8;
                        }
                        background: unset;
                    `}
            }
        }
    }
    .menu__items--section {
        width: 86%;
        margin: 0 auto;
        color: #fff;
        font-weight: 700;
        height: 70%;
        flex-direction: column;
        justify-content: space-between;
        display: flex;
        padding-top: 20px;
        font-size: 1.5625em;
    }
`;

export { HamburgerContainer };
