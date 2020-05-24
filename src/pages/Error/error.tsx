import React from "react";
import styled from "styled-components";

import { ReactComponent as ErrorSvg } from "../../icons/error.svg";


const ErrorContainer = styled.section`
   width: 100%;
   height: 600px;
   display: flex;
   padding: 60px;
   align-items: center;
   justify-content: space-evenly;
   flex-direction: column;
   .error__text {
     display: flex;
     flex-direction: column;
     align-items: center;
     height: 120px;
     justify-content: space-evenly;
     font-size: 24px;
     color: rgba(0, 0, 0, 0.85);
     span:last-of-type {
      color: red;
     } 
   }
   
   svg {
    width: 407.92px;
    height: auto;
    
    path:nth-child(4), 
    path:nth-child(5),
    path:nth-child(18){
       fill: #00B2A9;
    }
   }
   
`;

export default () =>  {
    return (
        <ErrorContainer>
            <ErrorSvg />
            <div className="error__text">
                <span>
                    Sorry the page you are looking for is not found!
                </span>
                <span> Error Code: 404 </span>
                </div>
        </ErrorContainer>
    )
}

