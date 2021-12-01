import React, { useEffect } from "react";
import styled from "styled-components";

import * as colors from "styles/colors";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /** 모달 visible */
  visible: boolean;
  /** 타이틀 */
  title?: string;
  /** 내용 */
  subTitle?: string;
  /** confirm 버튼 TEXT*/
  confirmBtnText?: string;
  /** 확인 버튼 이벤트 정의 */
  onConfirm?: () => void;
  /** 오버레이 클릭 시 이벤트 정의 */
  onOverlayClose?: () => void;
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(18, 18, 18, 0.6);
`;

const Panel = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 312px;
  background-color: ${colors.white};
  z-index: 10;
  border-radius: 8px;
`;

const Content = styled.div`
  width: inherit;
  padding: 40px 30px;
  box-sizing: border-box;
`;
const Footer = styled.div`
  width: inherit;
  height: 56px;
  background-color: #1672f7;
  color: ${colors.white};
  text-align: center;
  font-size: 16px;
  letter-spacing: -1px;
  line-height: 3.6;
`;
const Title = styled.p`
  font-size: 24px;
  color: ${colors.gray33};
  text-align: center;
  white-space: pre-line;
`;

const SubTitle = styled.p`
  font-size: 15px;
  color: ${colors.gray66};
  text-align: center;
  margin-top: 15px;
  white-space: pre-line;
  line-height: 1.5;
`;
const AlertModal: React.FC<Props> = (props: Props) => {
  const { visible, title, onConfirm, subTitle, confirmBtnText } = props;

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }

    return () => document.body.removeAttribute("style");
  });

  if (!visible) return null;

  return (
    <Wrapper>
      <Panel>
        <Content>
          <Title>{title}</Title>
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </Content>
        <Footer onClick={onConfirm}>{confirmBtnText ? confirmBtnText : "확인"}</Footer>
      </Panel>
    </Wrapper>
  );
};

export default AlertModal;
