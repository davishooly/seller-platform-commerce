import React from 'react';
import styled from 'styled-components';
import { Input as InputAnt, Checkbox } from 'antd';
import { device } from 'mediaScreen/mediaQueries';

const StyledInput = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 20px;

    span {
        padding-bottom: 1rem;
        color: #009d98;
        font-size: 14px;
    }

    input {
        height: 40px;

        border: 1px solid #dcdfe6;
        border-radius: 4px;
        background-color: #ffffff;
        padding: 1rem;
    }

    h2 {
        max-width: 400px;
    }
`;

const StyleRadio = styled.div`
    display: flex;
    text-align: left;

    @media only screen and ${device.mobileS} and (max-device-width: 768px) {
        text-align: center;

        .text {
            width: 100% !important;
        }
    }

    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 1rem;

    .text {
        display: flex;
        padding: 0;
        margin: 0;

        width: 350px;
        font-size: 16px;
        letter-spacing: 0.5px;
        line-height: 19px;

        justify-content: space-between;
        p {
            padding-left: 20px;
        }
    }
`;

const Input = (props: any) => (
    <StyledInput>
        <h2> {props.label} </h2>
        {props.tip ? <span> {props.tip} </span> : ''}
        {!props.textarea ? <InputAnt {...props} /> : <InputAnt.TextArea {...props} />}
    </StyledInput>
);

export const TermAndCons = (props: any) => (
    <StyleRadio>
        <div className="">
            <h2> {props.label} </h2>
        </div>
        <div className="text">
            <Checkbox {...props} />
            <p> {props.tip} </p>
        </div>
        <span style={{ color: 'red' }}>{props.error.agreeTerms}</span>
    </StyleRadio>
);

const StyledInline = styled.div`
    /* margin-top: 5px; */
    /* margin-bottom: 1rem; */
    .label {
        display: flex;
        align-items: baseline;

        span {
            margin-left: 5px;
        }
        span:after {
            content: ')';
        }

        span:before {
            content: '(';
        }
    }
`;

export const InlineInput = (props: any) => (
    <StyledInline>
        <div className="label">
            <h4> {props.label} </h4>
            {props.tip && <span> {props.tip} </span>}
        </div>

        {!props.textarea ? <InputAnt size="large" {...props} /> : <InputAnt.TextArea {...props} />}
    </StyledInline>
);

export const Inline = (props: any) => (
    <StyledInline>
        <div className="label">
            <h4> {props.label} </h4>
            {props.tip && <span> {props.tip} </span>}
        </div>

        {props.children}
    </StyledInline>
);

export default Input;
