import styled, {css} from "styled-components";
import { ThemesType } from "../../../providers/themes/ThemeTypes";

const StyledHeader = styled.header<ThemesType>`
    grid-area: header;
    background: ${props => props.linearBackground};
    padding: 20px 100px;
    color: #fff;
    a {
        color: ${props => props.textColor};
    }
    li {
        line-height: 30px;
        font-weight: 700;
        font-size: 16px;   
        padding-right: 30px;    
    }
    .header {
        display: flex;
        justify-content: space-between;

        ul {
            display: flex;
            list-style: none;
        }
    }
    .logo {
        font-size: 3em;
        color:  ${props => props.textColor} ;
    }
    .pop__container {
      position: relative;
    }
    .footer {
        display: flex;
        justify-content: space-between;
        .active {
            border: 1px solid rgba(255, 255, 255, 0.35);	
            	
            border-radius: 4px;
            color:  ${props => props.textColor};

            padding: 5px;
        }
        ul {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
        }
    }
    
    .account {
      cursor: pointer;
    }
`;

const Button = styled.button<ThemesType>`
   background: ${props => props.logoBackground};
   border: none;
   border-radius: 4px;
   cursor: pointer;
   width: 92px;
   outline: none;
   height: 32px;
`;

const PopContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: fill-available;
  padding: 20px;
  
  ${props => props.logout && css`
    height: 100%;
    justify-content: unset;
  `}
  span {
    color: #8D959B;
    cursor: pointer;
    border-bottom: 1px solid #8d959b3b;
  }
  .pop__content {
  
      a { 
        color: #000000;
      }
     display: flex;
     flex-direction: column;
      height: 100%;
     justify-content: space-between;
  }
`;
const SignUpSpan = styled.span<ThemesType>`
  a {
     color: ${props => props.logoBackground} !important;
  }
   cursor: pointer;
   
`;

export {StyledHeader, Button, PopContainer, SignUpSpan};
