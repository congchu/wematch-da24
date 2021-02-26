import React, {useEffect} from 'react'
import {createPortal} from "react-dom";
import styled from 'styled-components'
import * as colors from "../../../styles/colors";
import { Icon } from "../index";

interface Props {
  visible: boolean;
  onClose?: () => void;
  pcHeight?: number;
}

const PopupTemplate: React.FC<Props> = (props) => {
  const { visible, children, onClose, pcHeight } = props;
  const scrollPosition = window.pageYOffset;

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    }

    return () => {
      document.body.removeAttribute('style');
      window.scrollTo(0, scrollPosition);
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
    background-color: rgba(18, 18, 18, 0.6);;
  }
`;

const PopupWrapper = styled.div<{ pcHeight?: number }>`
  position: relative;
  height: 100%;
  overflow-y: hidden;
  background-color: white;
  
  box-sizing: border-box;
  padding-bottom: 20px;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    width: 360px;
    height: ${({ pcHeight }) => !pcHeight ? '480px' : `${pcHeight}px`};
    border-radius: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PopupHeader = styled.div`
  width:100%;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  z-index: 210;
  svg {
    margin-right: 20px;
  }
`;