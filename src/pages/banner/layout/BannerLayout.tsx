import React from "react";
import { useMedia } from "react-use-media";
import { useRouter } from "hooks/useRouter";
import styled from "styled-components/macro";

import Button from "components/common/Button";
import MainHeader from "components/common/MainHeader";

import * as colors from "styles/colors";
import { Previous } from "components/wematch-ui/Icon";

const S = {
  Container: styled.div`
    margin-top: 56px;

    @media screen and (min-width: 768px) {
      margin-top: 0;
    }
  `,
  Header: styled.header`
    position: fixed;
    top: 0;
    left: 0;
    height: 56px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.white};

    .icon {
      position: absolute;
      left: 24px;
      top: 19px;
      width: 24px;
      height: 24px;
    }

    h1 {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.03em;
      ${colors.gray33}
    }
  `,
  Bottom: styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    @media screen and (min-width: 768px) {
      width: 720px;
      margin: 0 auto;
      left: 0;
      right: 0;
    }
  `
};

interface Props {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
  tags?: {
    back?: string;
    home?: string;
  };
}

export default function BannerLayout({ title, onBack, children, tags, ...restProps }: Props) {
  const router = useRouter();
  const isDesktop = useMedia({
    minWidth: 1200
  });

  return (
    <S.Container {...restProps}>
      {isDesktop ? (
        <MainHeader isFixed={true} border={true} />
      ) : (
        <S.Header>
          <div id={tags?.back} className="icon" onClick={onBack}>
            <Previous size={16} color={colors.black} />
          </div>
          <h1>{title}</h1>
        </S.Header>
      )}
      {children}
      <S.Bottom>
        <Button id={tags?.home} theme="primary" bold onClick={() => router.push("/")}>
          위매치 이용하러 가기
        </Button>
      </S.Bottom>
    </S.Container>
  );
}
