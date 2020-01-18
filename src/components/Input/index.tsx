import React from 'react';
import styled from "styled-components";
import { Input as InputAnt, Radio, Checkbox, Typography } from "antd"

const StyledInput = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 20px;
    span {
        padding-bottom: 1rem;
        color: #009D98;
        font-size: 14px;
    }

    input {
        height: 40px;
       	
        border: 1px solid #DCDFE6;	
        border-radius: 4px;	background-color: #FFFFFF;
        padding: 1rem;
    }

    h2 {
        max-width: 400px;
    }
`

const StyleRadio = styled.div`
    display: flex;
    text-align: left;

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
`

const Input = (props: any) => (<StyledInput>
    <h2> {props.label} </h2>
    {props.tip ? <span>  {props.tip} </span> : ''}
    {!props.textarea ? <InputAnt {...props} /> : <InputAnt.TextArea {...props} />}
</StyledInput>);

export const TermAndCons = (props: any) => (<StyleRadio>
    <div className="">
        <h2> {props.label} </h2>
    </div>
    <div className="text">
        <Checkbox {...props} />
        <p>  {props.tip} </p>
    </div>
    <span style={{ color: "red" }}>{props.error.agreeTerms}</span>
</StyleRadio>);


const StyledInline = styled.div`
    margin-top: 1rem;
    /* margin-bottom: 1rem; */
    .label {
        display: flex;
        align-items: baseline;

        span {
            margin-left: 20px;
            
        }
        span:after {
            content:")";
        }

        span:before {
            content: "(";
        }
    }
`

export const InlineInput = (props: any) => (
    <StyledInline>
        <div className="label">
            <h2> {props.label} </h2>
            <span> {props.tip} </span>
        </div>

        {!props.textarea ? <InputAnt size="large" {...props}/> : <InputAnt.TextArea {...props}  />}
    </StyledInline>
)

export default Input
