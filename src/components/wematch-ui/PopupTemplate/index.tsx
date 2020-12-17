import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as colors from "../../../styles/colors";
import { Icon } from "../index";

interface Props {
  visible: boolean;
  onClose: () => void;
  pcHeight?: number;
}

const PopupTemplate: React.FC<Props> = (props) => {
  const { visible, children, onClose, pcHeight } = props;
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    }

    return () => document.body.removeAttribute('style')
  }, [visible])

  if (!visible) return null

  return (
    <PopupOverlay>
      <PopupWrapper pcHeight={pcHeight}>
        <PopupHeader>
          <div onClick={onClose}>
            <Icon.Close size={20} color={'#121212'} />
          </div>
        </PopupHeader>
        {children}
      </PopupWrapper>
    </PopupOverlay>
  )
}

export default PopupTemplate

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 200;
  background-color: white;
  
  @media screen and (min-width: 768px) {
    background-color: rgba(18, 18, 18, 0.6);;
  }
`;

const PopupWrapper = styled.div<{ pcHeight?: number }>`
  position: relative;
  height: inherit;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: white;
  padding-top: 56px;
  box-sizing: border-box;

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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  height: 56px;
  z-index: 210;
  svg {
    margin-right: 20px;
  }
`;