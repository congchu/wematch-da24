import React, { useEffect, useState } from 'react'
import styled, {keyframes} from 'styled-components'
import * as colors from 'styles/colors'
import {Check, CheckInRound, DotDot} from 'components/Icon'


const blink = keyframes`
  50%{
    color:#82B5FF
  }
`

const S = {
    Container: styled.div`
      height: 230px;
    `,
    ListContainer: styled.ul`
      margin: 0 8px 0 5px;
      padding: 24px 0 0 20px;
      list-style: dash;
      position: relative;
      font-weight: bold;
 
      .point{
        color: ${colors.pointBlue};
        animation: ${blink} 1.5s;
        animation-iteration-count: 3;
      }
      
      .disabled{
        color: ${colors.gray99};
        font-weight: normal;
      }

      li{
        position: relative;
        padding: 0 0 4px 5px;
            &:first-child {
              span:after{
                content: '';
                position: absolute;
                top: 15px;
                left: 9px;
                width: 2px;
                height: 23px;
                border-left: 2px #333 solid;
              }
              
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

            span{
              position: absolute;
              top: 10px;
              left: -22px;
              width: 16px;
              height: 16px;
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
              color: ${colors.gray66};
              cursor: pointer;
              
              svg{
                position: absolute;
                top: -10%;
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
          top: 90px;
          left: 7px;
          width: 2px;
          height: 45%;
          border-left: 1px dashed #C4C9D1;
        }
      
    `
};

interface Props {
    step?: number
}

export default function ProcessBar({step}: Props) {




    return (
        <S.Container>
            <S.ListContainer>
                <li className='firstItem'>
                    <span><CheckInRound/></span>
                    <p>업체 매칭 완료</p>
                </li>
                <li>
                    <span><DotDot/></span>
                    <p className='point'>업체와 방문견적 일정 상담</p>
                </li>
                <li>
                    <span><CheckInRound fill={'#C4C9D1'}/></span>
                    <p className='disabled'>무료 방문견적 진행</p>
                </li>
                <li>
                    <span><CheckInRound fill={'#C4C9D1'}/></span>
                    <p className='disabled'>업체 비교 및 최종 확정</p>
                </li>
                <li>
                    <span><CheckInRound fill={'#C4C9D1'}/></span>
                    <p className='disabled'>이사 완료</p>
                </li>
            </S.ListContainer>
        </S.Container>
    );
}
