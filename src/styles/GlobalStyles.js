import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  resize: none;
  outline: 0;  
  font-family: 'Montserrat', sans-serif;
}
html,
body {
  background-color: #191d21;
  color: #fff;
  scroll-behavior: smooth;
  /* overflow: hidden; */
}
#__next {}
/* rc-dialog styles */
.rc-dialog-content {
  border-radius: 7.3px;
}
.rc-dialog-header {
  display: none;
}
.rc-dialog-body {
  padding: 0;
}
.rc-dialog-footer {
  display: none;
}
`;
