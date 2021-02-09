import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ScrollLock from 'react-scrolllock'
import styled, { keyframes, css } from 'styled-components'

import { Icon } from 'components/wematch-ui'
import Button from 'components/common/Button'

import * as colors from 'styles/colors'

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
    /* Panel Height 설정 - PC */
    panelHeight?: number
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
`

const slideUp = keyframes`
  from {
    transform: translateY(200%);
  }
  to {
    transform: translateY(0px);
  }
`

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200%);
  }
`

const S = {
    Container: styled.div`
        height: 100%;
    `,
    Overlay: styled.div<{visible: boolean}>`
            
        @media screen and (min-width: 768px) {
            transition: all 0.25s ease-in-out;
            animation-duration: 0.25s;
            animation-timing-function: ease-out;
            animation-name: ${fadeIn};
            animation-fill-mode: forwards;
            ${({ visible }) => visible && css`
              animation-name: ${fadeOut};
            `};
        }
        @media screen and (min-width: 1200px) {
            position: fixed;
            z-index: 100; 
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(18, 18, 18, 0.6);
        }
    `,
    Panel: styled.div<{visible: boolean, panelHeight: number}>`
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
        
        @media screen and (min-width: 768px) {
            animation-duration: 0.25s;
            animation-timing-function: ease-out;
            animation-name: ${slideUp};
            animation-fill-mode: forwards;
            ${({ visible }) => visible && css`
              animation-name: ${slideDown};
            `};
        }
        @media screen and (min-width: 1200px) {
            top: 50%;
            left: 50%;
            width: 360px;
            //height: 500px;
            height: ${(props) => props.panelHeight + 'px'};
            margin-top: -238px;
            margin-left: -180px;
        }
    `,
    Header: styled.header`
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 300;
        width: 100%;
        min-height: 48px;
        padding: 0 16px;
        box-sizing: border-box;
        box-shadow: 0 7px 10px 0 rgba(104, 105, 106, 0.1);
        background: #1fa4e5;
        background: linear-gradient(88deg, #1fa4e5 0%, #1689f7 100%);

        strong {
            font-size: 15px;
            color: ${colors.white};
        }
    `,
    Body: styled.div`
        height: 100%;
    `,
    Footer: styled.div`
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      cursor: pointer;
    `,
    Warning: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 24px 14px;
        border-top: 1px solid ${colors.lineDeco};
        background-color: #f8f9fb;
        font-size: 13px;
        line-height: 15px;
        color: ${colors.gray66}; 
        letter-spacing: -1px;
        
        span {
            position: relative; 
            margin-left: 3px; 
            padding-left: 8px;
            &:before{
                content: '';
                position: absolute;
                top: 50%; 
                left: 0; 
                width: 3px;
                height: 3px;
                margin-top: -2px;
                background-color: ${colors.pointSky};
                border-radius:3px
            }
        }
    `
}

const bottomButtonStyles = {
    color: `${colors.pointLime}`,
    backgroundColor: 'rgba(22, 114, 247, 0.9)',
    fontSize: '18px',
    fontWeight: 400,
    letterSpacing: '-1px',
}

const Modal: React.FC<Props> = (props) => {
    const {
        visible,
        title,
        onOverlayClose,
        children,
        onConfirm,
        onClose,
        warning,
        footer = true,
        panelHeight = 500,
        ...restProps
    } = props

    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(visible);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        }

        return () => document.body.removeAttribute('style')
    }, [visible])

    useEffect(() => {
        if (localVisible && !visible) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 250);
        }
        setLocalVisible(visible);
    }, [localVisible, visible]);

    if (!animate && !localVisible) return null;

    return createPortal((
        <ScrollLock>
            <S.Container {...restProps}>
                <S.Overlay onClick={onOverlayClose} visible={!visible} />
                <S.Panel visible={!visible} panelHeight={panelHeight}>
                    <S.Header>
                        <strong>{title}</strong>
                        <button onClick={onClose}>
                            <Icon.Close size={15} color={colors.white} />
                        </button>
                    </S.Header>
                    <S.Body>
                        {children}
                    </S.Body>
                    {footer && (
                        <S.Footer>
                            {warning && (
                                <S.Warning>
                                    <p>손없는날/금/토요일은 가격이 비쌀 수 있어요!</p>
                                    <span>손없는날</span>
                                </S.Warning>
                            )}
                            <Button theme="primary" onClick={onConfirm} style={bottomButtonStyles}>
                                확인
                            </Button>
                        </S.Footer>
                    )}
                </S.Panel>
            </S.Container>
        </ScrollLock>
    ), document.body)
}

export default Modal
