import Styled from 'styled-components';

const AnalyticsSection = Styled.section`
    display: flex;
    width: 97.09%;
    justify-content: space-between;
    margin-bottom: 20px;
    
    .summary { 
       height: 16vh;
       margin-top: 20px;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
       &__section {
       background: #E6F1FC;
       padding: 4px;
       display: flex;
       justify-content: space-between;
       }
    }
    
    .fulfilled{
      margin-top: 20px;
      border-bottom: 1px solid #FFFFFF;
    }
    .link__orders {
      display: flex;
      justify-content: center;
      height: 8vh;
      align-items: center;
      span {
         font-size: 14px;
         cursor: pointer;
      }
    };
    .payments { 
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 479px;
      
      &__summary {
       margin-top: 14px;
       border-top: 1px solid #FFFFFF;
       border-bottom: 1px solid #FFFFFF;
       padding: 8px 0 8px 0;
       p {
         font-size: 14px;
         color: rgba(255,255,255,0.8);
         line-height: 20px;
         letter-spacing: 0.5px;
         padding-bottom: 8px;
         border-bottom: 1px solid #FFFFFF;
       }
      }
    }
    
    .disputes {
      margin-top: 8px;
      border-bottom: 1px solid #FFFFFF;
    }
    
`;

const DivCard = Styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
   span {
      color: #FFFFFF;
      }
`;

const Span = Styled.span`
  font-size: 20px;
  color: white;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.5px;
`;

const Div = Styled.div`
   display: flex;
   justify-content: space-between;
   color: white;
   align-items: center;
`;

export { AnalyticsSection, Span, Div, DivCard };
