import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css, keyframes } from "styled-components";
import ScrollLock, { TouchScrollable } from "react-scrolllock";

import * as colors from "styles/colors";
import { Icon } from "../../wematch-ui";

type SelectItemProp = {
  key: string;
  value: string;
};

interface Props {
  /** 모달 visible */
  visible: boolean;
  /** 상단 헤더 타이틀 */
  headerTitle?: string;
  /** close 버튼 이벤트 정의 */
  onClose?: (e: React.MouseEvent) => void;
  /** overlay 클릭 이벤트 정의 */
  onOverlayClose?: (e: React.MouseEvent) => void;
  /** 셀렉트 박스 내용 정의 */
  items: SelectItemProp[];
  /** 리스트 내용 선택 이벤트 */
  onSelect?(data: string): void;
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
  Container: styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 14px 24px 24px;
    background-color: ${colors.white};
    box-sizing: border-box;
    z-index: 200;

    @media (min-width: 1200px) {
      // top: 50%;
      // left: 50%;
      // width: 360px;
      // height: 380px;
      // max-height: none;
      // margin-top: -189px;
      // margin-left: -180px;
      // border-bottom-right-radius: 16px;
      // border-bottom-left-radius: 16px;
      // background-color: inherit;
    }
  `,
  Overlay: styled.div<{ visible: boolean }>`
    width: 100%;
    height: 100%;
    opacity: 0.88;
    background-color: rgba(18, 18, 18, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;

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

    @media (min-width: 1200px) {
      background: rgba(18, 18, 18, 0.6);
      background: linear-gradient(to right, rgba(18, 18, 18, 0.6) 0%, rgba(18, 18, 18, 0.6) 100%);
      filter: none;
    }
  `,
  SelectBox: styled.div<{ visible: boolean }>`
    overflow-y: visible;
    max-height: 320px;
    padding: 0;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;

    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${colors.white};
    box-sizing: border-box;
    z-index: 200;

    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
    ${({ visible }) =>
      visible &&
      css`
        animation-name: ${slideDown};
      `};

    @media (min-width: 1200px) {
      top: 50%;
      left: 50%;
      width: 360px;
      height: 380px;
      max-height: none;
      margin-top: -189px;
      margin-left: -180px;
      border-bottom-right-radius: 16px;
      border-bottom-left-radius: 16px;
    }
  `,
  Header: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 56px;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    background-color: white;
    text-align: right;
    border-bottom: 0.5px solid #d7dbe2;
    strong {
      padding-left: 24px;
      font-size: 18px;
      font-weight: bold;
      color: ${colors.gray33};
      line-height: 24px;
      letter-spacing: -1px;
    }
    button {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 24px;
      cursor: pointer;
    }

    @media (min-width: 1200px) {
      strong {
        display: block;
      }
    }
  `,
  ListWrapper: styled.div`
    background-color: #fafafa;
  `,
  List: styled.ul`
    overflow-y: scroll;
    max-height: 265px;
    padding: 0 24px;
    @media (min-width: 1200px) {
      max-height: 310px;
    }
  `,
  Item: styled.li`
    height: 60px;
    margin: 0;
    padding: 16px 0 16px;
    font-size: 15px;
    color: ${colors.gray33};
    line-height: 28px;
    cursor: pointer;
    border-top: 1px solid ${colors.lineDeco};
    background-color: transparent;
    box-sizing: border-box;
    text-align: center;
    user-select: none;
    :first-child {
      border-top: 0 none;
    }
    :last-child {
      border-bottom: 0 none;
    }
    :hover {
      color: ${colors.pointVividBlue};
    }
  `
};

const Select: React.FC<Props> = (props) => {
  const { visible, headerTitle, onClose, onOverlayClose, items, onSelect } = props;

  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);
  // const [lockScroll, setLockScroll] = useState(true)

  const handleOnSelect = (data: string) => {
    if (onSelect) {
      onSelect(data);
    }
  };

  const handleOnClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose(e);
    }
  };

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;

  const keyList = items.map((item) => {
    return item.key;
  });

  const values = items.map((item) => {
    return item.value;
  });

  return createPortal(
    <ScrollLock>
      <S.Container>
        <S.Overlay visible={!visible} onClick={onOverlayClose} />
        <S.SelectBox visible={!visible}>
          <S.Header>
            <strong>{headerTitle}</strong>
            <button onClick={onClose}>
              <Icon.Close size={20} color={"#121212"} />
            </button>
          </S.Header>
          <S.ListWrapper>
            <TouchScrollable>
              <S.List>
                {values.map((value, index) => (
                  <S.Item
                    key={index}
                    onClick={(e) => {
                      handleOnSelect(keyList[index]);
                      handleOnClose(e);
                    }}>
                    {value}
                  </S.Item>
                ))}
              </S.List>
            </TouchScrollable>
          </S.ListWrapper>
        </S.SelectBox>
      </S.Container>
    </ScrollLock>,
    document.body
  );
};

export default Select;
