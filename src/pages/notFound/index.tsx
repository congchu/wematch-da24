import React from "react";
import { useMedia } from "react-use-media";
import styled from "styled-components";

import NotFoundIcon from "components/Icon/generated/NotFound";

import * as colors from "styles/colors";
import { MOVE_URL } from "constants/env";

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

export default function NotFound() {
  const isTablet = useMedia({
    minWidth: 760
  });

  return (
    <>
      <S.Logo>
        <a href={MOVE_URL}>
          <span>위매치</span>
        </a>
      </S.Logo>
      <S.Container>
        <NotFoundIcon className="icon" />
        <S.Title>
          {isTablet ? (
            "요청하신 페이지를 찾을 수 없습니다"
          ) : (
            <>
              <span>요청하신 페이지를</span> <br />
              <span>찾을 수 없습니다</span>
            </>
          )}
        </S.Title>
        <S.Link href={`${MOVE_URL}`}>포장이사를 찾으셨나요?</S.Link>
        <S.Link href={`${MOVE_URL}/default_clean.asp`}>입주청소가 필요하세요?</S.Link>
        <S.Button id="dsl_button_empty" onClick={() => (window.location.href = `${MOVE_URL}`)}>
          홈으로
        </S.Button>
      </S.Container>
    </>
  );
}
