import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import useUserAgent from 'hooks/useUserAgent'
import * as colors from 'styles/colors'

const S = {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-style: normal;
      font-weight: normal;
      letter-spacing: -0.03em;
      margin: 32px 24px;
      
      .logo {
        img {
          width: 110px;
          height: 20px;
        }
      }
      
      .title {
        font-size: 18px;
        line-height: 26px;
        color: ${colors.gray66};
        margin-top: 50px;
        margin-left: 35px;
        position: relative;
        
        &:before {
          content: '';
          background-image: url(${require('assets/images/problem.svg')});
          width: 22px;
          height: 19px;
          position: absolute;
          left: -30px;
          top: 1px;
        }
      }
      
      .text {
        font-size: 32px;
        line-height: 48px;
        color: ${colors.gray33};
        margin-top: 95px;
        text-align: center;
        
        strong {
          font-weight: bold;
        }
      }
      
      .point {
        font-size: 18px;
        line-height: 26px;
        color: ${colors.gray33};
        margin-top: 30px;
        
        em {
          font-weight: bold;
          color: ${colors.pointBlue};
        }
      }
      
      @media screen and (min-width:768px) {
        .title {
          margin-left: 0;
        }
      }
    `,
    Stores: styled.div`
      display: flex;
      margin-top: 16px;
    `,
    Store: styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 32px;
      img {
        width: 48px;
        height: 48px;
      }
      
      span {
        font-size: 14px;
        line-height: 20px;
        color: ${colors.gray99};
        margin-top: 9px;
      }
    `,
}

export default function UnSupported() {
    const { isIE } = useUserAgent()
    const location = useLocation()
    // ie redirection to edge
    useEffect(() => {
        if (isIE) {
            window.open(`microsoft-edge:https://wematch.com${location.search}`, '_blank')
            // window.open('microsoft-edge:https://da24.wematch.com', '_blank')

            // setTimeout(function() {
            //     window.opener='self'
            //     window.open('','_parent','')
            //     window.close();
            // }, 1)
        }
    }, [isIE])

    return (
        <S.Container>
            <div className="logo">
                <img src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/logo/wematch_c.png" alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사"/>
            </div>
            <strong className="title">
                현재 이용하고 계신 Window Explorer는 구형 서비스로 보안에 취약해요!
            </strong>
            <p className="text">
                간단한 <strong>앱 다운로드</strong>로 <br />
                <strong>위매치</strong>를 더 안전하고 편하게 이용해보세요!
            </p>
            <p className="point">구글플레이와 앱스토어에서 <em>‘위매치’</em> 를 검색하세요.</p>
            <S.Stores>
                <S.Store>
                    <img src={require('assets/images/google_store.svg')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사" />
                    <span>구글플레이</span>
                </S.Store>
                <S.Store>
                    <img src={require('assets/images/apple_store.svg')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사" />
                    <span>앱스토어</span>
                </S.Store>
            </S.Stores>
        </S.Container>
    )
}
