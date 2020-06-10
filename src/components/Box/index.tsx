
import styled  from "styled-components"

const Box = styled.div`
  box-sizing: border-box;
  border: 1px solid #E2E7F2;
  border-radius: 3px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
  padding: 20px;
  max-width: 97.5%;
  .ant-breadcrumb {
    font-size: 16px;
    height: 6vh;
  }
  
  .ant-col-16 {
    width: 80%;
  }
  
  .ant-progress-circle {
    background: #FFFFFF;
  }
  
  .ant-col-8 {
    padding-left: 8px;
    width: 20%;
    padding-right: 8px;
    z-index: 999;
    position: sticky;
    top: 60px;
  }
  .ant-select-selection{
    height: 40px;
  }
  
  .ant-progress-text > div {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    min-height: 6vh;
    justify-content: space-between;
  }
  
  .ant-select-selection__rendered > ul > li {
    height: 24px;
    margin-top: 6px;
    margin-left: 2px;
    line-height: 22px;
  }
 `;


export default Box

