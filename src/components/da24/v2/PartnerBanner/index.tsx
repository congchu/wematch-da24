import React from 'react'
import styled from 'styled-components/macro'

import * as colors from 'styles/colors'

const Banner = styled.section`
  padding: 50px 24px;
  
  a {
    cursor: pointer;
  }
  
  h3 {
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.03em;
    color: ${colors.gray33};
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.03em;
    color: ${colors.gray66};
    margin-bottom: 21px;
  }
  .banner {
    height: 80px;
    position: relative;
    background: linear-gradient(225deg, ${colors.pointBlue} 0%, ${colors.pointSky} 100%);
    border-radius: 8px;
    
    .text {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      display: flex;
      align-items: center;
      letter-spacing: -0.03em;
      color: ${colors.white};
      padding-top: 18px;
      padding-left: 20px;
    }
    img {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`

export default function PartnerBanner() {
    return (
        <Banner>
            <a href="https://da24.wematch.com/partnernew.asp">
                <h3>파트너 등록문의</h3>
                <p>No.1 이사업체 매칭플랫폼 위매치다이사</p>
                <div className="banner">
                    <p className="text">500만 고객의 선택!<br /> 이제 영업은 저희에게 맡기세요</p>
                    <img src={require('assets/images/partner_banner.svg')} alt="Banner"/>
                </div>
            </a>
        </Banner>
    )
}
