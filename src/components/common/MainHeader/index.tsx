import React from 'react'
import styled, { css } from 'styled-components'

import * as colors from 'styles/colors'
import * as constants from 'constants/env'

interface Props {
    isFixed?: boolean | undefined;
    border?: boolean;
}

const S = {
    Wrapper: styled.div<{ isFixed: boolean }>`
      position: ${props => props.isFixed ? 'fixed' : 'absolute'};
      left: 0;
      top: 0;
      width: 100%;
      z-index: 100;
      //overflow: hidden;
      min-width: 320px;

      @media screen and (min-width: 1200px) {
        position: ${props => props.isFixed ? 'fixed' : 'static'};
        background: #fff;
      }
    `,
    HeaderWrapper: styled.div<{ border: boolean }>`
      overflow: hidden;
      position: relative;
      
      ${props => props.border && css`
        box-shadow: inset 0 -1px 0 ${colors.lineDefault};
      `};
    `,
    Header: styled.div<{ isFixed: boolean }>`
      position: relative;
      
      ${props => props.isFixed && css`
        background-color: ${colors.white};
        opacity: 0.96;
        transition: background-color 0.25s ease;
      `};
      
      @media screen and (min-width: 1200px) {
        width: 992px;
        margin: 0 auto;
        
        ${props => props.isFixed && css`
          //width: 100%;
          width: 992px;
          margin: 0 auto;
          background-color: transparent;
        `};
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

      @media screen and (min-width:1200px) {
        height: 72px;
        padding: 0;
        a {
          width: 108px;
          height: 20px;
          padding-top: 26px;
        }
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
    
      li {
        margin-left: 30px;
        padding: 13px 2px 11px;
        font-size: 16px;
        line-height: 23px;
        color: ${colors.gray33};
        letter-spacing: -0.01em;
        
        &:first-child {
          margin-left: 22px;
        }
        
        &.on {
          color: ${colors.pointBlue};
          padding-bottom: 8px;
          border-bottom: 2px solid ${colors.pointBlue};
          font-weight: bold;
        }
        
        @media screen and (min-width: 1200px) {
          &.on {
            border-bottom: 0;
          }
        }
      }
    
      @media screen and (min-width: 1200px) {
        left: 152px;
        position: absolute;
        top: 25px;
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
    `,
    Lnb: styled.div`
      position: absolute;
      top: 9px;
      right: 25px;
      color: ${colors.gray66};
    
      @media screen and (min-width: 1200px) {
        top: 18px; 
        right: 0;
      }
  `,
    Partner: styled.div`
      display: inline-block;
      padding: 6px 10px 7px;
      border: 1px solid #C4C9D1;
      border-radius: 28px;
      font-size: 14px;
      letter-spacing: -1px;
      background: rgba(255, 255, 255, 0.5);
      
      a {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        color: ${colors.gray33};
      }

      @media screen and (min-width:1200px) {
        margin-left: 32px;
        
        a {
          font-weight: normal;
          font-size: 15px;
          color: ${colors.gray66};
          padding: 8px 10px;
        }
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
              
      @media screen and (min-width: 1200px) {
        display: block;
        float: left;
        a {
          padding-top: 9px;
          font-size: 15px;
        }
      }
  `,
}

const MainHeader = ({ isFixed = false, border = false }: Props) => {
    return (
        <S.Wrapper isFixed={isFixed} id="dsl_move_header_1">
            <S.HeaderWrapper border={border}>
                <S.Header isFixed={isFixed}>
                    <S.Logo><a href={constants.MOVE_URL}><span>위매치</span></a></S.Logo>
                    <S.Categories>
                        <li className="on"><a href={constants.MOVE_URL}>이사</a></li>
                        <li><a href={constants.CLEAN_URL}>청소</a></li>
                        {/*<li><a href={constants.INTERIOR_URL}>인테리어</a></li>*/}
                    </S.Categories>
                    <S.Lnb>
                        <S.QuickGnb>
                            {/*<a href="https://wematch.com/service_search.html">서비스찾기</a>*/}
                            <a href="https://wematch.com/inquiry">내 신청내역 확인</a>
                        </S.QuickGnb>
                        <S.Partner>
                            <a href="https://da24.wematch.com/myconsult.asp">내 신청내역</a>
                        </S.Partner>
                    </S.Lnb>
                </S.Header>
            </S.HeaderWrapper>
        </S.Wrapper>
    )
}

export default MainHeader
