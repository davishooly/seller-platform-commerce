import styles, { css } from 'styled-components';

const CategoriesContainer =  styles.div`
    display: flex;
    width: 1200px;
    overflow: scroll;
   .categories__options {
      display: flex;
      flex-shrink: 0;
      width: 271px;
      overflow: scroll;
      flex-direction: column;
      margin-right: 20px;
      height: 400px;
      background: #F5F7FA;
      border-radius: 2px;
      border: 1px solid #DEE3EC;
      padding:  20px;
      span {
      font-size: 16px;
      color: #0065B0;
      padding-bottom: 10px;
      }
      span: hover {
      cursor: pointer;
      }
   }
   .selected {
     font-weight: bold;
   }
`;

const ButtonContainer = styles.div<any>`
   ${(props: any) => props.list && css `
     display: flex !important;
     justify-content: center
   `}
   display: none;
`;

const TabsContainer = styles.div`
   height: 8vh;
   display: flex;
   align-items: center;
   
   .variants__buttons {
     margin-bottom: 20px;
   }
   
   .ant-col {
     display: flex;
     align-items: center;
   }
`;

const ImageContainer = styles.div`
  width: 50%;
  
  .image__pad {
    border: 1px solid #dcd5d575;
    padding: 8px;
    border-radius: 6px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  
  .image__pad--small {
     width: 28%;
     margin-right: 20px;
  }
  
 .item__image {
     height: 300px;
     background-position: 50% 50%;
     background-repeat: no-repeat;
     background-size: cover;
     border-radius: 2px;
    } 
    .images {
     width: 100%;
     height: 100px;
      }
    }
    
    .images__container {
        display: flex;
    }
    
    .empty__images {
      position: absolute;
      top: 30%;
      left: 14%;
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 16vh;
      justify-content: space-between;
      
      span {
       font-size: 18px;
       }
      
      span:hover {
        cursor: pointer;
        color: #1890ff;
      }
      
      svg {
        width: 6em;
        height: 6em;
       }
    }

`;

const PreviewProductDetailsContainer =  styles.div`
    display: flex;
    width: 100%;
    padding: 20px 0 20px 0;
    justify-content: space-between;
    
    .product__description {
       display: grid;
       grid-template-columns: 4fr 8fr;
       height: 30px;
    }
    label {
      font-weight: 900;
      font-variant: all-petite-caps;
      font-size: 16px;
    }
    .divider {
      height: 1px;
      opacity: 0.1;
      background-color: #203341;
      margin-bottom: 20px;
    }
`;

const Container = styles.div`
     margin-bottom : 20px;
     
     .title__container {
       display: flex;
       width: 60%;
       justify-content: space-between;
       align-items: center;
       
       i:hover {
         cursor: pointer;
         color: #1890ff;
       }
     }
     
     .title:first-of-type { 
       display: inline-block;
       margin-bottom: 10px
     }
     .title {
       font-size: 16px;
       font-weight: 500;
       color: #131A1E;
       font-weight: bold;
       font-family: Roboto;
     }
  }
  `
;

export { CategoriesContainer, ButtonContainer, TabsContainer , ImageContainer, PreviewProductDetailsContainer, Container};
