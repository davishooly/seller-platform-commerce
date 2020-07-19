import styled, { css } from 'styled-components';
import { ThemesType } from '../../providers/themes/ThemeTypes';

const TableSection = styled.section<ThemesType>`
    width: 97.09%;
    box-sizing: border-box;
    border: 1px solid #e2e7f2;
    border-radius: 3px;
    background-color: ${(props) => props.textColor};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    padding: 20px;

    th {
        background-color: #00acdc !important;
        span {
            color: ${(props) => props.textColor};
        }
    }
    .ant-table-thead > tr:first-child > th:first-child {
        border-top-left-radius: 0;
    }
    .ant-table-thead > tr:first-child > th:last-child {
        border-top-right-radius: 0;
    }
    .ant-table-pagination.ant-pagination {
        text-align: center;
        float: none;
    }
    .ant-select-selection-selected-value {
        color: #909399;
        font-family: PingFang SC, sans-serif;
    }
    .ant-select-selection--single {
        height: 37px;
    }
    .ant-switch-checked {
        background-color: ${(props) => props.greenBright};
    }

    .head {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        .anticon {
            margin-right: 4px;
            color: ${(props) => props.blueText} !important;
        }

        .reload {
            width: 6% !important;
            display: flex;
            justify-content: space-around;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }
        .reload:hover {
            transform: scale(1.1);
        }

        .anticon:hover {
            color: #40a9ff !important;
        }

        a {
            font-size: 18px;
            font-weight: 700;
        }

        span {
            font-weight: bold;
            color: ${(props) => props.blueText};
            letter-spacing: 0.39px;
            line-height: 16px;
            font-size: 14px;
            font-family: Roboto, sans-serif;
        }

        span:first-of-type {
            height: 21px;
            color: #203341;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 0.5px;
            line-height: 21px;
        }
    }
`;

const DivContainer = styled.div<any>`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;

    .disable-link {
        pointer-events: none;
    }

    .filterSection {
        width: 35%;
        ${(props: any) =>
            props.order &&
            css`
                width: 25%;
            `}
        display: flex;
        justify-content: space-between;
    }
    .filter {
        width: 35%;
    }

    .ant-input-group {
        text-align: end;
    }

    .reload {
        width: 16%;
        ${(props: any) =>
            props.order &&
            css`
                width: 22%;
            `}
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }
    .reload:hover {
        transform: scale(1.1);
    }
`;

const ListingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    button {
        width: 22px;
    }

    .ant-switch-checked .ant-switch-inner {
        width: fit-content;
    }
`;

const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: 0.4fr 0.8fr 3fr;
    ${(props: any) =>
        props.dashboard &&
        css`
            grid-template-columns: 0.5fr 3fr;
        `}
    align-items: center;
    .product__details {
        display: grid;
        grid-template-columns: 2fr 3fr;
        span {
            color: rgba(32, 51, 65, 0.5);
        }
    }
`;

const Button = styled.button<any>`
    border: none;
    height: 16px;
    color: #c0c4cc;
    ${(props: any) =>
        props.primary &&
        css`
            color: #203341;
            cursor: pointer;
        `}
    ${(props: any) =>
        props.delete &&
        css`
            color: #f56c6c;
            cursor: pointer;
        `}
  font-family: Roboto, sans-serif;
    outline: none;
    line-height: 16px;
    padding-right: 16px;
`;

const ButtonContainer = styled.div<any>`
    display: flex;
    justify-content: space-between;
    width: 260px;
    height: 36px;
    ${(props: any) =>
        props.order &&
        css`
            width: 139px;
        `}
    ${(props: any) =>
        props.express &&
        css`
            width: 340px;
        `}
  align-items: center;
    border: 1px solid #dcdfe6;
    border-radius: 4px;

    button {
        background: unset;
    }
    .verticalLine {
        border-right: 1px solid #dcdfe6;
    }
`;

const TableMobileSection = styled.div<any>`
    .head {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        .anticon {
            margin-right: 4px;
            color: ${(props) => props.blueText} !important;
        }

        .reload {
            width: 6% !important;
            display: flex;
            justify-content: space-around;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }
        .reload:hover {
            transform: scale(1.1);
        }

        .anticon:hover {
            color: #40a9ff !important;
        }

        a {
            font-size: 18px;
            font-weight: 700;
        }

        span {
            font-weight: bold;
            color: ${(props) => props.blueText};
            letter-spacing: 0.39px;
            line-height: 16px;
            font-size: 14px;
            font-family: Roboto, sans-serif;
        }

        span:first-of-type {
            height: 21px;
            color: #203341;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 0.5px;
            line-height: 21px;
        }
    }
    .details {
        display: flex;
        justify-content: space-between;

        h4 {
            font-weight: bold;
        }
    }
    .filterSection > div,
    .filterSection > div > span,
    .filterSection > .ant-input,
    .filterSection > .ant-input-group.ant-input-group-compact {
        width: 100% !important;
        margin-bottom: 1em;
    }
    .filterSection > div > span {
        width: 100% !important;
    }
    .filterSection > .ant-input-group > input[type='number'] {
        width: 45% !important;
    }
`;

export { DivContainer, TableSection, ListingContainer, ProductContainer, Button, ButtonContainer, TableMobileSection };
