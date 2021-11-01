import { createGlobalStyle } from 'styled-components'
import { resetButton, resetInput } from './mixins'
import reset from './reset'
import * as colors from 'styles/colors'

export default createGlobalStyle`
  ${reset}
  html, body, #root {
    height: 100%;
  }
  body {
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

  .p-8{
    padding: 8px;
  }
  .p-16{
    padding: 16px;
  }
  .p-24{
    padding:24px;
  }

  .pb-8{
    padding-bottom: 8px;
  }
  .pb-16{
    padding-bottom: 16px;
  }
  .pb-64{
    padding-bottom: 64px;
  }
  .pb-128{
    padding-bottom: 64px;
  }

  .pt-8{
    padding-top: 8;
  }
  .pt-16{
    padding-top: 16px;
  }

  .py-16{
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .px-24{
    padding-left: 24px;
    padding-right: 24px;
  }
  .py-24{
    padding-top: 24px;
    padding-bottom: 24px;
  }

  .pl-8{
    padding-left: 8px;
  }

  .mr-8{
    margin-right: 8px;
  }
  .mb-8{
    margin-bottom: 8px;
  }
  .mb-16{
    margin-bottom: 16px;
  }
  .mb-24{
    margin-bottom: 24px;
  }



  .color-88{
    color: #888888;
  }
  .color-66{
    color: #666666;
  }
  .color-33{
    color: #333333;
  }


  .bg-ect1{
    background: #C4C9D1;
  }
  .bg-ect2{
    background: #D7DBE2;
  }
  .bg-ect3{
    background: #EBEEF2;
  }
  .bg-ect4{
    background: #F7F8F4;
  }
  .bg-ect5{
    background: #FAFAFA;
  }
  .bg-white{
    background: #FFFFFF;
  }

  .flex{
    display:flex;
  }
  .items-center {
    align-items: center;
  }

  .radius-6{
    border-radius: 6px;
  }

  .border{
    border: solid 1px;
  }
  .border-etc2{
    border-color: #D7DBE2;
  }

  .pointer{
    cursor: pointer;
  }
`
