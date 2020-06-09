import styled from "styled-components";
import {ThemesType} from "../../../providers/themes/ThemeTypes";
import {device} from "../../../mediaScreen/mediaQueries";

const StyledFooter = styled.footer<ThemesType>`
    background:  ${props => props.footerBackground};
    grid-area: footer;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    .container {
        display: flex;
        color: ${props => props.textColor};
        width: 91%;
        margin: auto;
    }
    .about{
     justify-content: space-between;
     margin-top: 80px;
     
     @media only screen and ${device.mobileS} and (max-width: 768px) {
         display: grid;
         grid-template-columns: 2fr 2fr;
         grid-gap: 20px;
      }
      
      @media only screen and ${device.tablet} and (max-device-width: 1024px) {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr;
        grid-gap: 20px;
       }
    }

    .terms {
      justify-content: space-between;
      align-items: center;
      color:  ${props => props.dullTextColor};
      font-size: 14px;
      border-top: 2px solid #64696E;
      height: 20vh;
      
      @media only screen and ${device.mobileS} and (max-width: 768px) {
        height: 200px;
        flex-direction: column;
        justify-content: center;
        
        img {
        padding: 20px !important;
        }
  } 

      .privacy {
        display: flex;
        width: 15%;
        justify-content: space-between;
        
        @media only screen and ${device.mobileS} and (max-width: 768px) {
            width: 100%;
            height: 60px;
            align-items: center;
            flex-direction: column;
            justify-content: space-around;
   } 
      }
    }
    .details {
      margin-top: 20px;
    }
`;

const Span  = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export { Span, StyledFooter};
