import React, { useEffect, useState } from "react";
import Styled, { keyframes, css } from "styled-components";

import { Close } from "components/Icon";

import * as colors from "styles/colors";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /** 모달 visible */
  visible: boolean;
  /** 타이틀 */
  title: string;
  /** 확인 버튼 이벤트 정의 */
  onConfirm?: () => void;
  /** 닫기 버튼 이벤트 정의 */
  onClose?: () => void;
  /** 오버레이 클릭 시 이벤트 정의 */
  onOverlayClose?: () => void;
  /* 경고 메시지 display 여부 */
  warning?: boolean;
  /* 푸터 visible */
  footer?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200%);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200%);
  }
`;

const S = {
  Container: Styled.div`
        height: 100%;
    `,
  Overlay: Styled.div<{ visible: boolean }>`
        transition: all 0.25s ease-in-out;
        animation-duration: 0.25s;
        animation-timing-function: ease-out;
        animation-name: ${fadeIn};
        animation-fill-mode: forwards;
        ${({ visible }) =>
          visible &&
          css`
            animation-name: ${fadeOut};
          `};
        
        @media screen and (min-width: 1200px) {
            position: fixed;
            z-index: 100; 
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(18, 18, 18, 0.6);
            //background-color: #000000;
            //opacity: 0.5;
        }
    `,
  Panel: Styled.div<{ visible: boolean }>`
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: ${colors.white};
        z-index: 200;
        box-sizing: border-box;
        animation-duration: 0.25s;
        animation-timing-function: ease-out;
        animation-name: ${slideUp};
        animation-fill-mode: forwards;
        ${({ visible }) =>
          visible &&
          css`
            animation-name: ${slideDown};
          `};
        @media screen and (min-width: 1200px) {
            top: 50%;
            left: 50%;
            width: 360px;
            height: 701px;
            margin-top: -340px;
            margin-left: -180px;
        }
    `,
  HeaderContainer: Styled.div`
        :after{
            content:'';
            display:block;
            width:100%;
            height:8px;
            background-color:${colors.grayBg};
            box-shadow:inset 0 1px 0 ${colors.lineDeco};
        }
    `,
  BtnPrevious: Styled.a`
        position:absolute;
        top:0;
        left:0;
        padding:12px 16px;
        @media screen and (min-width: 768px) {
            top:14px;
            left:8px;
        }
    `,
  HeadTitle: Styled.strong`
        display:block;
        padding:15px 0;
        font-weight:400;
        font-size:16px;
        line-height:18px;
        letter-spacing:-1px;
        color:${colors.black};
        text-align:center;
    `,
  BtnList: Styled.a`
        position:absolute;
        top:0;
        left:auto;
        right:15px;
        padding:12px 16px;
        @media screen and (min-width: 768px) {
            right:9px;
        }
    `,
  Body: Styled.div`
        height: 100%;
        overflow: hidden;
    `
};

const ModalTemplate: React.FC<Props> = (props) => {
  const { visible, title, onOverlayClose, children, onConfirm, onClose, ...restProps } = props;

  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }

    return () => document.body.removeAttribute("style");
  });
  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;

  return (
    <S.Container {...restProps}>
      <S.Overlay onClick={onOverlayClose} visible={!visible} />
      <S.Panel visible={!visible}>
        <S.HeaderContainer>
          <S.HeadTitle>{title}</S.HeadTitle>
          <S.BtnList onClick={onClose}>
            <Close height={24} width={24} />
          </S.BtnList>
        </S.HeaderContainer>
        <S.Body>{children}</S.Body>
      </S.Panel>
    </S.Container>
  );
};

export default ModalTemplate;
