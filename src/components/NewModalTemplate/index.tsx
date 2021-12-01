import React, { useEffect } from "react";
import styled from "styled-components";

import * as colors from "styles/colors";

const ToastOverlay = styled.div`
  position: fixed;
  background: rgba(18, 18, 18, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 210;
`;

const ToastPopupWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const ToastContent = styled.div`
  position: relative;
  z-index: 100;
  top: 50%;
  left: 50%;
  width: 312px;
  transform: translate(-50%, -50%);
`;

const Content = styled.div`
  display: flex;
  width: 312px;
  /*min-height: 210px;*/
  background-color: #fff;
  padding: 24px;
  box-sizing: border-box;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Text = styled.div`
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
  color: ${colors.gray33};
  margin-bottom: 9px;
  white-space: pre-wrap;
`;

const SubText = styled.p`
  width: 100%;
  font-size: 16px;
  color: ${colors.gray66};
  letter-spacing: -0.03px;
  text-align: left;
  margin-bottom: 34px;
  line-height: 24px;
  white-space: pre-wrap;
`;

const Button = styled.button<{ buttonType?: "confirm" | "cancel" }>`
  height: 52px;
  background-color: ${(props) => (props.buttonType === "confirm" ? colors.pointBlue : colors.white)};
  border: 1px solid ${(props) => (props.buttonType === "confirm" ? colors.pointBlue : colors.lineDefault)};
  border-radius: 6px;
  font-size: 18px;
  color: ${(props) => (props.buttonType === "confirm" ? colors.white : colors.gray66)};
  font-weight: bold;
  line-height: 27px;
  letter-spacing: -0.03rem;

  &:nth-child(2) {
    margin-left: 8px;
  }
`;
const ConfirmButton = styled.button`
  width: 100%;
  height: 52px;
  background-color: ${colors.pointBlue};
  border-radius: 6px;
  box-shadow: 0px 4px 10px rgba(22, 114, 247, 0.25);
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  line-height: 27px;
  letter-spacing: -0.03rem;
`;

const CancelButton = styled.button`
  font-size: 15px;
  color: ${colors.gray88};
  margin-top: 24px;
  margin-bottom: 6px;
`;

const Footer = styled.article<{ modalType: "confirm" | "alert" }>`
  display: flex;
  width: 100%;

  button {
    width: ${(props) => (props.modalType === "alert" ? "50%" : "100%")};
  }
`;
interface Props {
  visible: boolean;
  title: string;
  content: string;
  confirmClick?: () => void;
  confirmText?: string;
  cancelText?: string;
  cancelClick?: () => void;
  tags?: {
    cancel?: string;
    success?: string;
  };
}
const NewModal: React.FC<Props> = (props) => {
  const { visible, title, content, confirmText, cancelText, confirmClick, cancelClick, tags } = props;

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }

    return () => document.body.removeAttribute("style");
  }, [visible]);

  if (!visible) {
    return null;
  }
  return (
    <ToastOverlay>
      <ToastPopupWrapper>
        <ToastContent>
          <Content>
            <Text>{title}</Text>
            <SubText>{content}</SubText>
            <Footer modalType={"confirm"}>
              {cancelText && (
                <Button
                  buttonType={"cancel"}
                  onClick={() => {
                    if (cancelClick) {
                      cancelClick();
                    }
                  }}
                  id={tags?.cancel}>
                  {cancelText}
                </Button>
              )}
              {confirmText && (
                <Button
                  buttonType={"confirm"}
                  onClick={() => {
                    if (confirmClick) {
                      confirmClick();
                    }
                  }}
                  id={tags?.success}>
                  {confirmText}
                </Button>
              )}
            </Footer>
          </Content>
        </ToastContent>
      </ToastPopupWrapper>
    </ToastOverlay>
  );
};

export default NewModal;
