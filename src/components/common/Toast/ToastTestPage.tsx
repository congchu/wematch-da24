import React from 'react'
import { useMedia } from 'react-use-media'
import styled from 'styled-components'


import * as colors from 'styles/colors'
import { showToast } from './index'

const S = {
  Container: styled.div`
    margin: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    .icon {
      margin-bottom: 30px;
    }
    
    @media screen and (min-width:768px) {
      .icon {
        margin-top: 262px;
        margin-bottom: 49px;
      }
    }
  `,
  Logo: styled.h1`
    display: block;
    height: 55px;
    padding: 0 24px;
    margin-top:0;
    
    a {
      display: block;
      width: 87px;
      height: 16px;
      padding: 16px 0 10px;
    }
    
    span {
      display: block;
      width: 87px;
      height: 16px;
      font-size: 1px;
      background: url(https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/logo/wematch_c.png) 0 0 no-repeat;
      background-size: 100% auto;
      color: transparent;
    }
    @media screen and (min-width:768px) {
      height: 72px;
    
      a {
        width: 108px;
        height: 20px;
        padding-top: 26px;
      }
    }
  `,
  Title: styled.h3`
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 33px;
    letter-spacing: -0.03em;
    text-align: center;
  `,
  Link: styled.a`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.03em;
    text-decoration-line: underline;
    margin-top: 20px;
  `,
  Button: styled.button`
    width: 100px;
    height: 56px;
    margin: 10px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 6px;
    color: ${colors.white};
    background: ${colors.pointBlue};
    box-shadow: 0 4px 10px rgba(22, 114, 247, 0.25);

  `
}

export default function ToastTestPage() {
  const isTablet = useMedia({
    minWidth: 760,
  })

  return (
    <>
      <br/><br/><br/><br/><br/>
      <h1>나타날때 : 수직위로(기본직선형) / 사라질때: 작게사라짐 </h1>
      <br/><br/>
      <S.Button id='dsl_button_empty' onClick={()=> showToast({ message: '저장되었습니다.', type: 'success' })}>SUCCESS</S.Button>
      <S.Button id='dsl_button_empty' onClick={()=> showToast({ message: '이사 예정일을 선택해주세요!', type: 'error'  })}>ERROR</S.Button>
      <S.Button id='dsl_button_empty' onClick={()=> showToast({ message: 'A등급 업체를 선택했습니다.', type: 'detail' })}>DETAIL</S.Button>

    </>
  )
}
