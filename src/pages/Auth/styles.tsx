import styled from "styled-components";
import { device } from "../../mediaScreen/mediaQueries";
import {ThemesType} from "../../providers/themes/ThemeTypes";

const HeaderContainer = styled.div<ThemesType>`
    background-color: #fff;
    min-height: 65px;
    box-shadow: 0 1px 6px rgba(57,73,76,.35);
    svg path {
     fill: #006DBF;
   }    
    .container {
     position: relative;
     margin-left: auto;
     width: 90%;
     margin-right: auto;
     padding-right: 15px;
     padding-left: 15px;
    }
   .navbar-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 65px;
    height: 55px;
    flex-basis: 100%;
    }
    .navigation {
      cursor: pointer;
      width: 14%;
      display: flex;
      justify-content: space-around;
      align-items: baseline;

      span {
        font-weight: 500;
        font-size: 16px;
      }
      span:hover {
        color: ${props => props.buttonBackground};
      }
      
      span:last-of-type {
       padding: 8px;
       border: solid 1px ${props => props.buttonBackground};
      }
    }
`;

const RegisterContainer = styled.div`
 margin: 60px auto 60px auto;
 width: 70%;
 display: flex;
 flex-direction: column;
 @media only screen and ${device.mobileS} and (max-device-width: 425px) {
    width: unset;
  } 
  
 .modal__container {
  display: flex;
  justify-content: center;
  span {
     font-size: 18px;
  }
 }
 .title {
    margin-top: 20px;
  }
  
  .ant-form  {
    width: 70%;
    
    .ant-btn-primary, .ant-input{
     height: 50px;
    }
      
  .login-form {
      max-width: 300px;
   }
  .login-form-forgot {
    float: right;
   }
   .ant-col-rtl .login-form-forgot {
     float: left;
   }
   .login-form-button {
    width: 100%;
   }

   .remember__section { 
     .ant-form-item-children {
       display: flex;
       justify-content: space-between;
    } 
  }
    .create {
      text-align: center;
      margin-top: 20px;
    }
}

`;

const Container = styled.div`
 height: 60vh;
 width: 50%;
 
   @media only screen and ${device.mobileS} and (max-width: 425px) {
    width: unset;
  }
  display: flex;
 justify-content: center;
 align-items: center;
`;


const ResetPasswordContainer = styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: calc(50vh - 72px);
    
    .title {
      h1 {
         font-size: 24px;
      }
      h3 {
         font-weight: 300;
      }
    }
    
    .ant-form  {
    width: 30%;
    
    .ant-input{
     height: 50px;
    }
    .login-form-button {
       width: 30%;
       height: 50px;
       margin-right: 20px;
    }
`;



export { HeaderContainer, Container, RegisterContainer, ResetPasswordContainer };
