import React from 'react'
import styled from 'styled-components'

import * as colors from 'styles/colors'
import * as constants from 'constants/env'

interface Props {}

const S = {
    Wrapper: styled.div`
      overflow: hidden;
      min-width: 320px;
    `,
    HeaderWrapper: styled.div`
      overflow: hidden;
      position: relative;
      box-shadow: inset 0 -1px 0 #d7dbe2;
      letter-spacing: -1px;
  `,
    Header: styled.div`
      position: relative;
      @media screen and (min-width:1200px) {
        width: 992px;
        margin: 0 auto;
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
        padding: 0 32px;
      
        a {
          width: 108px;
          height: 20px;
          padding-top: 26px;
        }
      }
      @media screen and (min-width:1200px) {
        padding: 0px;
      }
    `,
    Categories: styled.ul`
      display: flex;
      top: 26px;
      left: 168px;
      width: auto;
      height: auto;
      font-size: 18px;
      color: ${colors.gray33};
      border-top: 1px solid #d7dbe2;
    
      li {
        margin-left: 18px;
        padding: 13px 2px 11px;
        font-size: 15px;
        line-height: 16px;
        color: ${colors.gray33};
        letter-spacing: -1px;
        &:first-child {
            margin-left: 22px;
        }
        
        .on {
          color: ${colors.pointBlue};
          box-shadow: none;
        }
      }
    
      @media screen and (min-width:768px) {
        position: absolute;
        top: 26px;
        left: 168px;
        width: auto;
        height: auto;
        border-top: 0 none;
      
        li {
          margin-left: 20px;
          padding: 0;
          font-size: 18px;
          line-height: 24px;
          &:first-child {
            margin: 0;
          }
        }
      }
      @media screen and (min-width:1200px) {
        left: 152px;
      }
    `,
    Lnb: styled.div`
      position: absolute;
      top: 9px;
      right: 25px;
      color: ${colors.gray66};
    
      @media screen and (min-width:768px) {
        top: 20px;
        right: 32px;
      }
      @media screen and (min-width:1200px) {
        right: 0;
      }
  `,
    Partner: styled.div`
      display: inline-block;
      padding: 8px 14px 5px;
      border: 1px solid #c3c7d0;
      border-radius: 15px;
      font-size: 14px;
      letter-spacing: -1px;
      @media screen and (min-width:768px) {
        margin-left: 14px;  
      }
      @media screen and (min-width:1200px) {
        margin-left: 32px;
      }
    `,
    QuickGnb: styled.div`
      display: none;
      a {
        display: inline-block;
        letter-spacing: -0.5px;
        margin-left: 6px;
      }
      
      .divide {
        &:before {
          content: '';
          display: inline-block;
          width: 1px;
          height: 14px; 
          margin-top: 1px; 
          margin-right: 10px;
          background-color: #bcc0c6;
          vertical-align:top;
        }
      }
              
      @media screen and (min-width: 768px) {
       display: block;
        float: left;
        a {
          padding-top: 9px;
          font-size: 15px;
        }
      }
  `,
}

const TopHeader = ({}: Props) => {
    return (
      <S.Wrapper>
          <S.HeaderWrapper>
              <S.Header>
                  <S.Logo><a href="https://wematch.com/"><span>위매치</span></a></S.Logo>
                  <S.Categories>
                      <li><a href={constants.MOVE_URL} className="on">이사</a></li>
                      <li><a href={constants.CLEAN_URL}>청소</a></li>
                      <li><a href={constants.INTERIOR_URL}>인테리어</a></li>
                  </S.Categories>
                  <S.Lnb>
                      <S.QuickGnb>
                          <a href="https://wematch.com/service_search.html">서비스찾기</a>
                          <a href="https://wematch.com/inquiry" className="divide">내 신청내역 확인</a>
                      </S.QuickGnb>
                      <S.Partner>
                          <a href="https://wematch.com/partner_gate.html">파트너 가입</a>
                      </S.Partner>
                  </S.Lnb>
              </S.Header>
          </S.HeaderWrapper>
      </S.Wrapper>
    )
}

export default TopHeader