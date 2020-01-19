import styled from "styled-components";

const StyledHeader = styled.header`
    grid-area: header;
    background: linear-gradient(153.43deg, #00B2A9 0%, #0065B0 100%), linear-gradient(177.56deg, #0B6DAC 0%, #085F97 100%), linear-gradient(180deg, #0D609F 0%, #00518B 100%);
    padding: 20px 100px;
    color: #fff;
    a {
        color:#FFF;
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
        color: #fff ;
    }
    .footer {
        display: flex;
        justify-content: space-between;

        .active {
            border: 1px solid rgba(255, 255, 255, 0.35);	
            	
            border-radius: 4px;
            color: #FFFFFF;

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

const Button = styled.button`
   background: #006DBF;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   width: 92px;
   outline: none;
   height: 32px;
`;

const PopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: fill-available;
  padding: 20px;
  span {
    color: #8D959B;
  }
`;
const SignUpSpan = styled.span`
   color: #0065B0 !important;
   text-decoration: underline;
   cursor: pointer;
`;

export { StyledHeader, Button, PopContainer, SignUpSpan };
