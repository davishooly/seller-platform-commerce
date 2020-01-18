import React from 'react';
import styled from "styled-components";
import { Overlay } from "./index";

const ModalComponent = styled.div`
   div: first-of-type {
    i { padding: 20px;
      text-align: end;
     }
   }
   width: 431px;
   z-index: 999;
   visibility: visible;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
   position: fixed;
   background-color: #FFFFFF;
   border-radius: 4px;
`;

const Modal = ({isOpen, children}: any) => {
    return (
        isOpen ?(
            <Overlay>
                <ModalComponent>
                    {children}
                </ModalComponent>
            </Overlay>
        ) : ''
    );
};

export default Modal;
