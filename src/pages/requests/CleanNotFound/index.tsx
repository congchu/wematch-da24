import React from "react";
import MainHeader from "components/common/MainHeader";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMedia } from "react-use-media";

const S = {
  Header: styled.header`
    display: block;
    height: 55px;
    padding: 0 24px;
    margin-top: 0;

    a {
      display: block;
      width: 87px;
      height: 16px;
      padding: 24px 0 10px;
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
  Container: styled.div``,
  Contents: styled.div`
    margin-top: 120px;
    text-align: center;

    svg {
      display: block;
      margin: 0 auto;
    }

    @media screen and (min-width: 1200px) {
      margin-bottom: 150px;
    }
    @media screen and (max-width: 320px) {
      margin-top: 100px;
    }
  `,
  Title: styled.strong`
    display: inline-block;
    margin-top: 20px;
    font-size: 16px;
    line-height: 22px;
  `,
  Subtext: styled.p`
    margin-top: 10px;
    font-size: 15px;
    color: #666;
    line-height: 22px;
  `,
  LinkHome: styled(Link)`
    display: block;
    height: 36px;
    padding: 10px 0;
    font-weight: 700;
    background: #ffe500;
    text-align: center;
    border-radius: 6px;
    margin-top: 40px;
    margin-right: 24px;
    margin-left: 24px;
    font-size: 18px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    svg {
      margin-top: -2px;
      margin-right: 10px;
      vertical-align: middle;
    }

    span {
      line-height: 35px;
    }

    @media screen and (min-width: 1200px) {
      display: block;
      position: relative;
      width: 720px;
      margin: 0 auto;
    }
  `
};

const CleanNotFound = () => {
  const isDesktop = useMedia({
    minWidth: 1200
  });

  return (
    <S.Container>
      {isDesktop ? (
        <MainHeader />
      ) : (
        <S.Header>
          <Link to="/">
            <span>위매치</span>
          </Link>
        </S.Header>
      )}
      <S.Contents>
        <S.Title>선택 지역은 서비스 준비 중입니다.</S.Title>
        <S.Subtext>
          빠른 시일 내 이용 가능하도록
          <br />
          최선을 다하겠습니다.
        </S.Subtext>
      </S.Contents>
      <S.LinkHome to="/">
        <span>홈으로 가기</span>
      </S.LinkHome>
    </S.Container>
  );
};

export default CleanNotFound;
