import React from 'react'
import styled, { css } from 'styled-components'
import {useRouter} from 'hooks/useRouter'


import Layout from 'components/base/Layout'
import {Download} from 'components/Icon'
import {CheckCircleOff} from 'components/wematch-ui/Icon'
import SvgDotInDot from 'components/Icon/generated/DotInDot'

import * as colors from 'styles/colors'


const S = {
    Container: styled.div`
        display: block;
        padding: 0 0 40px 24px;
        @media screen and (min-width: 768px) {
          width: 608px;
          margin: 0 auto;
          padding: 0 0 60px;
        }
        
    `,
    MobileTitle: styled.div`
      display:block;
      z-index:1;
      width:240px;
      padding: 30px 0 16px;
      font-weight: 300;
      font-size: 22px;
      line-height: 30px;
      span {
        font-weight: 300;
        font-size: 22px;
        line-height: 30px;
      }
      em {
        font-weight: bold;
      }
      
      @media screen and (min-width:1200px) {
        display:none;
      }
    `,
    ListContainer: styled.ul`
      list-style: none;
      position: relative;
      padding-left: 32px;
      

      @media screen and (min-width:1200px) {
        margin-top: -24px;
      }

      li{
        position: relative;
        padding: 33px 20px 26px 0;
        border-top: 1px solid #ebeef2;
        
            &:first-child {
              padding-top: 33px;
              border-top: 0 none;
            }
            
            strong {
              display: block;
              font-weight: 600;
              font-size: 16px;
              line-height: 16px;
            }
            p{
              padding-top: 11px;
              font-size: 15px;
              line-height: 22px;
              word-break: keep-all;
            }

            // 임시 : 나중에 아이콘 생기면 맞춰서 조절
            span{
              position: absolute;
              top: 30px;
              left: -32px;
              width: 16px;
              height: 16px;
              //배경색 나중에 아이콘 바뀌면 삭제 요망 
              background: white;
            }
            
            a{
              display: inline-block;
              position: relative;
              height: 38px;
              padding-left: 41px;
              padding-right: 13px;
              margin-top: 16px;
              margin-right: 7px;
              border: 1px solid #c4c9d1;
              font-size: 15px;
              line-height: 40px;
              color: #666;
              cursor: pointer;
              
              // 임시 : 나중에 아이콘 생기면 맞춰서 조절
              svg{
                position: absolute;
                top: 25%;
                left: 10%;
                overflow: hidden;
                font-size: 1px;
                line-height: 1px;
                color: transparent;
                cursor: pointer;
              }
            }
        
        }
      
        
        &:before {
          content: '';
          position: absolute;
          top: 30px;
          left: 7px;
          width: 2px;
          height: 85%;
          background-color: #1672f7;

          @media screen and (max-width:464px) {
            height: 83%;
          } 
        }
      
      
    `
}


function ChecklistPage() {
    const router = useRouter()

    return (
        <Layout title='체크리스트' subTitle={<>이사/청소 준비 어려우셨죠?<br/>체크리스트만 따라해보세요!</>}>
            <S.Container>
                <S.MobileTitle>
                    <span>이사/청소 준비 어려우셨죠?</span>
                    <br/>
                    <em>체크리스트만 따라해보세요!</em>
                </S.MobileTitle>
                <S.ListContainer>
                        <li>
                            <span><SvgDotInDot width={17} height={17}/></span>
                            <strong>이사 확정 시</strong>
                            <p>이사가신다고요? 날짜까지 확정하셨나요?</p>
                        </li>
                        <li>
                            <span ><CheckCircleOff color={colors.pointBlue}/></span>
                            <strong>이사 1달 전</strong>
                            <p>이사/청소업체를 알아볼 시기입니다.<br/>업체평가등급을 확인하고 방문견적까지 꼼꼼하게 받아보세요.</p>
                            <p>견적상담 시 체크리스트를 확인해 보세요.</p>
                            <a onClick={()=> {router.history.push('/checklist/moveestimation')}}><Download/>이사 견적 시</a>
                            <a onClick={()=> {router.history.push('/checklist/cleanestimation')}}><Download/>청소 견적 시</a>
                        </li>
                        <li>
                            <span><CheckCircleOff color={colors.pointBlue}/></span>
                            <strong>이사 1주 전</strong>
                            <p>가져갈 짐/버릴 짐 구분, 가스차단, 공과금 납부 등 놓치기 쉬운 사소한 일들을 잘 체크해주세요.</p>
                            <a onClick={()=> {router.history.push('/checklist/moveprep')}}><Download/>이사준비 체크리스트</a>
                        </li>
                        <li>
                            <span><CheckCircleOff color={colors.pointBlue}/></span>
                            <strong>청소 당일</strong>
                            <p>청소 마무리 후 점검사항을 꼼꼼히 검수하세요.</p>
                            <a onClick={()=> {router.history.push('/checklist/cleancheck')}}><Download/>점검사항</a>
                        </li>
                        <li>
                            <span><CheckCircleOff color={colors.pointBlue}/></span>
                            <strong>이사 당일</strong>
                            <p>포장이사는 업체에 맡기시고 이사준비 체크리스트를 잊지 말고 한 번 더 확인하세요.</p>
                        </li>
                        <li>
                            <span><SvgDotInDot width={17} height={17}/></span>
                            <strong>이사한 후</strong>
                            <p>
                                이사/청소는 잘 하셨나요?<br/>
                                문자로 전송된 평가 링크를 통해 이용한 업체를 솔직하게 평가해주세요.<br/>
                                고객님의 평가는 소중한 데이터로 사용됩니다.
                            </p>
                        </li>
                </S.ListContainer>
            </S.Container>
        </Layout>
    )

}

export default ChecklistPage


