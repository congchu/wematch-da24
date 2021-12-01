import * as React from "react";
import styled, { keyframes } from "styled-components";
import { white, gray33, gray88 } from "styles/colors";
import { Icon } from "components/wematch-ui";
import { resetButton } from "styles/mixins";

interface Props extends React.HTMLAttributes<HTMLElement> {
  onClose?: () => void;
  title: string;
  guide?: string;
}

const slideUp = keyframes`
  from {
    transform: translateY(200%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const S = {
  Container: styled.div``,
  Overlay: styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
  `,
  Panel: styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: ${white};
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    z-index: 200;
    padding: 24px 24px 16px;
    box-sizing: border-box;
    animation-name: ${slideUp};
    animation-duration: 0.2s;
    animation-timing-function: ease;
  `,
  Title: styled.p`
    letter-spacing: -1px;
    font-size: 18px;
    text-align: center;
    color: ${gray33};
    font-weight: bold;
    white-space: pre-line;
    line-height: 27px;
    margin: 0 0 24px;
  `,
  Guide: styled.p`
    color: ${gray88};
    font-size: 16px;
    text-align: center;
    white-space: pre-line;
    margin-bottom: 24px;
  `,
  CloseButton: styled.button`
    ${resetButton};
    position: absolute;
    right: 16px;
    top: 16px;
    width: 16px;
    height: 16px;
  `
};

export function Suggestion(props: Props) {
  const { onClose, title, guide, children, ...restProps } = props;

  return (
    <S.Container {...restProps}>
      <S.Overlay onClick={onClose} />
      <S.Panel>
        <S.CloseButton onClick={onClose}>
          <Icon.Close size={16} />
        </S.CloseButton>
        {title && <S.Title>{title}</S.Title>}
        {guide && <S.Guide>{guide}</S.Guide>}
        {children}
      </S.Panel>
    </S.Container>
  );
}
