import React, { useEffect } from "react";
import { useMedia } from "react-use-media";
import styled from "styled-components";

import { ErrorIcon } from "components/Icon";

import * as colors from "styles/colors";
import { MAIN_URL } from "constants/env";
import { dataLayer } from "lib/dataLayerUtil";

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

    @media screen and (min-width: 768px) {
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
    margin-top: 0;

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
    @media screen and (min-width: 768px) {
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
  Text: styled.p`
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.03em;
    margin-top: 20px;
    text-align: center;
  `,
  Button: styled.button`
    width: 100%;
    height: 56px;
    margin: 40px 0 4px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 6px;
    color: ${colors.white};
    background: ${colors.pointBlue};
    box-shadow: 0 4px 10px rgba(22, 114, 247, 0.25);
    @media screen and (min-width: 768px) {
      margin-top: 60px;
    }
  `
};

export default function ErrorService() {
  const isTablet = useMedia({
    minWidth: 760
  });

  useEffect(() => {
    dataLayer({
      event: "pageview"
    });
  }, []);

  return (
    <>
      <S.Logo>
        <a href={MAIN_URL}>
          <span>위매치</span>
        </a>
      </S.Logo>
      <S.Container>
        <ErrorIcon className="icon" />
        <S.Title>
          {isTablet ? (
            "서비스 처리과정에서 에러가 발생하였습니다"
          ) : (
            <>
              <span>서비스 처리과정에서</span> <br />
              <span>에러가 발생하였습니다</span>
            </>
          )}
        </S.Title>
        <S.Text>
          <span>서비스 이용에 불편을 드려 죄송합니다.</span> <br />
          <span>잠시 후 다시 확인해주세요.</span>
        </S.Text>
        <S.Button id="dsl_button_home" onClick={() => (window.location.href = `${MAIN_URL}`)}>
          홈으로
        </S.Button>
      </S.Container>
    </>
  );
}
