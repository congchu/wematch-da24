import React from 'react'
import styled from 'styled-components/macro'

import * as colors from 'styles/colors'

const Banner = styled.section`
  padding: 50px 24px 73px;
  
  a {
    cursor: pointer;
  }
  
  h3 {
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    letter-spacing: -0.03em;
    color: ${colors.gray33};
    margin-bottom: 8px;
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.03em;
    color: ${colors.gray66};
  }
  .banner {
    position: relative;
    min-width: 312px;
    width: 100%;
    height: 80px;
    background-color: #f7f7f7;
    border-radius: 8px;
    
    display: flex;
    align-items: center;
    .box {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: -0.03em;
      color: ${colors.gray33};

      margin-left: 20px;

      .title {
        font-weight: 500;
      }
      
      .text {
        font-size: 14px;
      }
    }
    
    &:after {
      content: '';
      background-image: url(${require('assets/images/partner_banner.svg')});
      background-repeat: no-repeat;
      background-size: cover;
      width: 115px;
      height: 80px;
      position: absolute;
      top: 0;
      right: 0;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  
  @media screen and (min-width:768px) {
    .banner {
      width: 100%;
      height: 120px;
      
      .box {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        line-height: 30px;
        
        .title {
          font-weight: bold;
          font-size: 20px;
        }
        .text {
          font-size: 20px;
        }
      }
      
      &:after {
        width: 204px;
        height: 120px;
      }
    }
  }
`

export default function PartnerBanner() {
    return (
        <Banner>
            <a href="https://da24.wematch.com/partnernew.asp">
                <h3>파트너 등록문의</h3>
                <p style={{ marginBottom: 21 }}>No.1 이사업체 매칭플랫폼 위매치다이사</p>
                <div className="banner">
                    <div className="box">
                        <strong className="title">500만 고객의 선택! &nbsp;</strong>
                        <p className="text">이제 영업은 저희에게 맡기세요</p>
                    </div>
                </div>
            </a>
        </Banner>
    )
}
