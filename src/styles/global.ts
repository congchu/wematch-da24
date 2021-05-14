import {createGlobalStyle} from "styled-components";
import reset from "./reset";
import {resetButton, resetInput} from "./mixins";
import * as colors from "styles/colors";

export default createGlobalStyle`
  ${reset}
  html, body, #root {
    height: 100%;
  }
  body {
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap');
    min-width:320px;
    font-family: 'Noto Sans KR', 'AppleSDGothicNeo-Light', 'Malgun Gothic', '맑은 고딕', sans-serif;
    font-size: 14px;
    background-color: white;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    color:#333;
    line-height: normal;
    letter-spacing: -1px;
  }
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  button {
    ${resetButton};
    color: ${colors.gray33};
  }
  input {
    ${resetInput};
  }
`;
