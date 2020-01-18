import React from 'react';
import styled, { css } from "styled-components"

const Button = styled.button`
	height: 40px;
	border: 1px solid #006DBF;
	border-radius: 4px;
  background-color: #006DBF;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
    
    &:focus {
        outline: 0;
    }
    ${(props: any) => props.register && css `
      background-color: #FFFFFF;
      color: #203341 !important;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
      border: 1px solid #FFFFFF;
      width: 143px;
    `}
    ${(props: any) => props.signin && css `
      background-color: transparent;
      border: 1px solid  #FFFFFF;
      width: 80px;
    `}
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    text-align: center; 
`;


export default Button
