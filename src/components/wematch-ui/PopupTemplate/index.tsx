import React, {useEffect} from 'react'
import {createPortal} from "react-dom";
import styled from 'styled-components'
import { Icon } from "../index";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const PopupTemplate: React.FC<Props> = (props) => {
  const { visible, children, onClose } = props;

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.removeAttribute('style');
    }
  }, [visible])

    if (!visible) return null

    return createPortal((
      <PopupOverlay>
          <PopupWrapper>
              <PopupHeader>
                  <div onClick={onClose}>
                      <Icon.Close size={20} color={'#121212'} />
                  </div>
              </PopupHeader>
              {children}
          </PopupWrapper>
      </PopupOverlay>
    ), document.body)
}

export default PopupTemplate

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background-color: white;
  @media screen and (min-width: 768px) {
    background-color: rgba(18, 18, 18, 0.6);
  }
`;

const PopupWrapper = styled.div`
  position: relative;
  height: 100%;
  overflow-y: hidden;
  background-color: #FAFAFA;
  
  box-sizing: border-box;
  height: -webkit-fill-available;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: none;
  }
  
  @media screen and (min-width: 768px) {
    width: 360px;
    height: 580px;
    border-radius: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PopupHeader = styled.div`
  position: fixed;
  width:100%;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  z-index: 210;
  svg {
    margin-right: 20px;
  }
`;