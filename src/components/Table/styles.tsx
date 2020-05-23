import styled, { css } from "styled-components";

const TableSection = styled.section`
  width: 97.09%;
  box-sizing: border-box;
  border: 1px solid #E2E7F2;
  border-radius: 3px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
  margin-top: 20px;
  padding: 20px;
  
  th {
    background-color: #00ACDC !important;
    span {color: #FFFFFF;}
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
    font-family: "PingFang SC";
  } 
  .ant-select-selection--single {
    height: 37px;
  }    
  .ant-switch-checked {
  background-color : #67C23A;
  }
  
  .head {
   display: flex;
   justify-content: space-between;
   padding-bottom: 20px;

   
   span {
   font-weight: bold;
   color: #0065B0;
   letter-spacing: 0.39px;
   line-height: 16px;
   font-size: 14px;
   font-family: Roboto;
  }
  
   span:first-of-type  {
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
   
   .filterSection {
     width: 35%;
     ${(props: any) => props.order && css `width:25%`}
     display: flex;
     justify-content: space-between;
   }
   .filter {
    width: 35%;
   }
   
   
   .reload {
    width: 20%;
    ${(props: any) => props.order && css` width: 32%;`}
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
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
    grid-template-columns: .4fr .8fr 3fr;
    ${(props: any) => props.dashboard && css`
      grid-template-columns: .5fr 3fr;
    ` }
    align-items: center;
     .product__details {
        display: grid;
        grid-template-columns: 2fr 3fr;
        span {
        color: rgba(32,51,65,0.5);
        }
     }
    `;

const Button =  styled.button<any>`
   border: none;
   height: 16px;
   color: #C0C4CC;
   ${(props: any) => props.primary && css`
     color: #203341;
     cursor: pointer;
   `}
   ${(props: any) => props.delete && css`
     color: #F56C6C;
     cursor: pointer;
   `}
   font-family: Roboto;
   outline: none;
   line-height: 16px;
   padding-right: 16px;
`;

const ButtonContainer = styled.div<any>`
 display: flex;
 justify-content: space-between;
 width: 260px;
 height: 36px;
 ${(props: any) => props.order && css` width: 139px;`}
 ${(props: any) => props.express && css `width: 340px;`}
 align-items: center;
 border: 1px solid #DCDFE6;
 border-radius: 4px;
 
 button {
   background: unset;
 }
 .verticalLine {
     border-right: 1px solid #DCDFE6;
 }
 `;

export { DivContainer, TableSection, ListingContainer, ProductContainer, Button, ButtonContainer };
