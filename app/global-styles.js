import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .ant-menu-item, .ant-menu-submenu-title{
    padding: 0 15px;
  }
  body {
    min-height: 100%;
    position: relative;
   }
  .footer {
    /*position: absolute;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    background-color: white;
    position: fixed;
    // left: 0;
    bottom: 0;
    width: 100%;
    // height: 100px;
    text-align: center;
  }

  .main-layout-content{
    background-color: white;
    width:100%;
    // height:100%;
    // min-height: 100vh;
    padding: 20px;
    margin-bottom: 100px;
    // min-height: calc(100% - 100px);
  }
  .header {
    background-color: white;
  }
`;

export default GlobalStyle;
