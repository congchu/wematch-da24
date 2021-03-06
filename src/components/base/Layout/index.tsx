import React from "react";
import styled from "styled-components";

import { useMedia } from "react-use-media";

import MainHeader from "components/common/MainHeader";
import NavHeader from "components/common/NavHeader";

const S = {
  Container: styled.div`
    display: block;
  `,
  HeaderContainer: styled.div`
    display: block;
  `,
  Wrap: styled.div`
    margin: 66px auto 0;
    @media screen and (min-width: 768px) {
      position: relative;
      width: 608px;
      //margin: 0 auto;
      margin: 66px auto 0;
      padding-bottom: 60px;
    }
    @media screen and (min-width: 1200px) {
      position: relative;
      width: 720px;
      margin: 72px auto 0;
      padding-left: 272px;
      padding-top: 80px;
      padding-bottom: 80px;
    }
  `,
  Title: styled.div`
    display: none;
    position: absolute;
    z-index: 1;
    top: 74px;
    left: 50%;
    width: 240px;
    margin-left: -496px;
    h3 {
      font-size: 32px;
      font-weight: 600;
      letter-spacing: -1px;
      line-height: 48px;
    }
    span {
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: -1px;
    }
    @media screen and (min-width: 1200px) {
      display: block;
    }
  `,
  Contents: styled.div``
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subTitle?: string | React.ReactNode;
}

const Layout = ({ children, title, subTitle }: Props) => {
  const isDesktop = useMedia({
    minWidth: 1200
  });

  return (
    <S.Container>
      <S.HeaderContainer>{isDesktop ? <MainHeader isFixed border /> : <NavHeader title={title} />}</S.HeaderContainer>
      <S.Wrap>
        <S.Title>
          <h3>{title}</h3>
          <br />
          {subTitle ? <span>{subTitle}</span> : <></>}
        </S.Title>
        <S.Contents>{children}</S.Contents>
      </S.Wrap>
    </S.Container>
  );
};

export default Layout;
