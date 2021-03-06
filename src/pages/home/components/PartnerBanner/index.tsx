import React from "react";
import styled from "styled-components/macro";

import * as colors from "styles/colors";

const Banner = styled.section`
  padding: 50px 24px 73px;

  a {
    cursor: pointer;
  }

  h3 {
    font-weight: bold;
    font-size: 22px;
    line-height: 32px;
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
    //min-width: 312px;
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
      content: "";
      background-image: url(${require("assets/images/partner_banner.png")});
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
  @media screen and (max-width: 320px) {
    .banner {
      &:after {
        width: 80px;
      }
    }
  }

  @media screen and (min-width: 768px) {
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
        background-image: url(${require("assets/images/partner_banner.svg")});
      }
    }
  }
`;

export default function PartnerBanner() {
  return (
    <Banner>
      <h3>????????? ????????????</h3>
      <p style={{ marginBottom: 21 }}>No.1 ???????????? ??????????????? ??????????????????</p>
      {/* <a onClick={()=> router.push('/partnernew')}> */}
      <a onClick={() => (window.location.href = `https://landing-da24.wematch.com/partner_application/`)}>
        <div className="banner">
          <div className="box">
            <strong className="title">500??? ????????? ??????! &nbsp;</strong>
            <p className="text">?????? ????????? ???????????? ????????????</p>
          </div>
        </div>
      </a>
    </Banner>
  );
}
