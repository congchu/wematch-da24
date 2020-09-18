import React, {useEffect} from 'react'
import styled from 'styled-components'
import * as colors from "../../../styles/colors";
import {Icon} from "../index";

interface Props {
    visible: boolean;
    onClose: () => void;
}

const PopupTemplate:React.FC<Props> = (props) => {
    const { visible, children, onClose } = props;
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        }

        return () => document.body.removeAttribute('style')
    })

    if (!visible) return null

    return (
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
    )
}

export default  PopupTemplate

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  
  background-color: white;
  
  @media screen and (min-width: 768px) {
    background-color: rgba(18, 18, 18, 0.6);;
  }
`;

const PopupWrapper = styled.div`
  position: relative;
  height: 100%;
  overflow-y: auto;
  
  @media screen and (min-width: 768px) {
    width: 360px;
    height: 480px;
    border-radius: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  height: 56px;
  
  svg {
    margin-right: 20px;
  }
`;