import React, {useEffect} from 'react'
import styled from 'styled-components'

import * as colors from 'styles/colors'

const ToastOverlay = styled.div`
  position: fixed;
  background: rgba(18, 18, 18, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
`;

const ToastPopupWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const ToastContent = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  
  @media screen and (min-width: 1200px) {
    position: relative;
    z-index: 100; 
    top: 50%;
    left: 50%;
    width: 360px;
    transform:translate(-50%, -50%);
  }
  
`;

const Header = styled.div`
  height: 48px;
  background-color: ${colors.grayBg};
  display: flex;
  justify-content: flex-end;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  button {
    font-size: 15px;
    color: ${colors.pointBlue};
    line-height: 22px;
    letter-spacing: -0.01px;
    margin-right: 10px;
    cursor: pointer;
    
    @media screen and (min-width: 720px) {
      margin-right: 51px;
    }
    
    @media screen and (min-width: 1200px) {
      margin-right: 8.5px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  background-color: #FFF;
  //min-height: 218px;
  padding: 24px;
  box-sizing: border-box;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  align-items: center;
  
  @media screen and (min-width: 1200px) {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
`;

const Text = styled.div`
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
  color: ${colors.gray33};
  margin-top: 6px;
  white-space: pre-wrap;
  
  span {
    margin-top: 15px;
    font-size: 16px;
    color: ${colors.gray66};
    line-height: 23px;
    white-space: pre-wrap;
  }
  @media screen and (min-width: 720px) {
    text-align: center;
  }
  
  @media screen and (min-width: 1200px) {
    text-align: left;
  }
`;

const SubText = styled.p`
  width: 100%;
  font-size: 17px;
  color: ${colors.gray33};
  line-height: 22px;
  letter-spacing: -0.03px;
  text-align: left;
  
  @media screen and (min-width: 720px) {
    text-align: center;
  }
  
  @media screen and (min-width: 1200px) {
    text-align: left;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: ${colors.pointBlue};
  border-radius: 6px;
  box-shadow: 0px 4px 10px rgba(22, 114, 247, 0.25);
  font-size: 18px;
  color: #FFF;
  font-weight: bold;
  line-height: 27px;
  letter-spacing: -0.03rem;
  margin-top: 30px;
  
  @media screen and (min-width: 1200px) {
    margin-top: 60px;
  }
`;

const CancelButton = styled.button`
  font-size: 15px;
  color: ${colors.gray88};
  margin-top: 24px;
  margin-bottom: 6px;
`;

interface Props {
    visible: boolean;
    subContent?: string;
    confirmText?: string;
    confirmClick?: () => void;
    cancelText?: string;
    cancelClick?: () => void;
    showHeaderCancelButton: boolean
}
const ToastPopup:React.FC<Props> = (props) => {
    const { visible, children, subContent, confirmText, cancelText, confirmClick, showHeaderCancelButton, cancelClick } = props

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        }

        return () => document.body.removeAttribute('style')
    }, [visible])

    if (!visible) {
        return null
    }
    return (
        <ToastOverlay>
            <ToastPopupWrapper>
                <ToastContent>
                    <Header>
                        {showHeaderCancelButton &&
                            <button onClick={cancelClick}>닫기</button>
                        }
                    </Header>
                    <Content>
                        <Text>{children}</Text>
                        {subContent && (
                            <SubText>{subContent}</SubText>
                        )}
                        {confirmText && (
                            <ConfirmButton
                                onClick={() => {
                                    if(confirmClick) {
                                        confirmClick()
                                    }}
                                }>
                                {confirmText}</ConfirmButton>
                        )}
                        {cancelText && (
                            <CancelButton>아니오</CancelButton>
                        )}
                    </Content>
                </ToastContent>
            </ToastPopupWrapper>
        </ToastOverlay>
    )
};

export default ToastPopup