import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .ant-menu-item, .ant-menu-submenu-title{
    padding: 0 15px;
  }
  body {
    height: 100%;
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
    text-align: center;
    // margin-bottom: -50px;
  }

  .main-layout-content{
    background-color: white;
    // height:100%;
    // min-height: 100vh;
    margin-bottom: 100px;
    min-height: calc(100% - 20px);
  }
  .header {
    background-color: white;
  }
`;

export default GlobalStyle;
