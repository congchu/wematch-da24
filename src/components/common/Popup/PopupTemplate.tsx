import React from 'react'
import { createPortal }  from 'react-dom'
import Styled, { css } from 'styled-components'

import Button from 'components/common/Button'

import * as colors from 'styles/colors'

interface Props {
    /** 모달 visible */
    visible: boolean;
    /** border 박스 형태 */
    border?: boolean;
    /** 오버레이 클릭 시 이벤트 정의 */
    onOverlayClose?: () => void;
    /* 하단 confirm/cancel 버튼 노출 */
    footerButton?: boolean;
    /* 하단 확인 버튼 텍스트 */
    onConfirmButtonText?: string;
    /* 하단 확인 버튼 이벤트 */
    onConfirmClick?: () => void;
    /* 하단 취소 버튼 텍스트 */
    onCancelButtonText?: string;
    /* 하단 취소 버튼 이벤트 */
    onCancelClick?: () => void;
    /* 팝업 푸터 왼쪽 버튼 커스텀 스타일*/
    leftCustomButtonStyle?: React.CSSProperties;
    /* 팝업 푸터 오른쪽 버튼 커스텀 스타일*/
    rightCustomButtonStyle?: React.CSSProperties;

}

const S = {
    Container: Styled.div`
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        letter-spacing: -1px;
    `,
    Overlay: Styled.div`
        display: block;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .8;
        transition: all 5s ease-in-out;
    `,
    Panel: Styled.div<{ border: boolean}>`
        position: fixed;
        top: 30%;
        left: 50%;
        width: 312px;
        ${props => props.border && css`
            border-radius: 8px;
        `};
        transform: translateX(-50%);
        background-color: ${colors.white};
        box-sizing: border-box;
        transition: all .5s ease-in-out;
    `,
    CloseButton: Styled.button`
        position: absolute;
        top: -30px;
        right: 0;
        cursor: pointer;
    `,
    Group: Styled.div`
        display: flex;
        margin: 8px 0;
    `,
    ButtonGroup: Styled.div`
        display: flex;
        margin-top: 40px;
    `
}

const PopupTemplate:React.FC<Props> = (props) => {
    const {
        visible,
        border = false,
        onOverlayClose,
        footerButton,
        onCancelButtonText,
        onCancelClick,
        onConfirmButtonText,
        onConfirmClick,
        children,
        leftCustomButtonStyle,
        rightCustomButtonStyle
    } = props

    const customButtonStyles = {
        left: {
            fontSize: '16px',
            fontWeight: 600,
            borderBottomLeftRadius: border ? '8px' : '0px',
            color: `${colors.gray88}`,
            boxShadow: `inset 0 1px 0 ${colors.lineDefault}`,
        },
        right: {
            fontSize: '16px',
            fontWeight: 600,
            borderBottomRightRadius: border ? '8px' : '0px'
        }
    }

    return (
        <>
            {visible && createPortal((
                <S.Container>
                    <S.Overlay onClick={onOverlayClose} />
                    <S.Panel border={border}>
                        {children}
                        {footerButton && (
                            <S.ButtonGroup>
                                <Button theme="default" onClick={onCancelClick} style={leftCustomButtonStyle ? leftCustomButtonStyle : customButtonStyles.left}>
                                    {onCancelButtonText}
                                </Button>
                                <Button theme="primary" onClick={onConfirmClick} style={rightCustomButtonStyle ? rightCustomButtonStyle : customButtonStyles.right}>
                                    {onConfirmButtonText}
                                </Button>
                            </S.ButtonGroup>
                        )}
                    </S.Panel>
                </S.Container>
            ), document.body)}
        </>
    )
}

export default PopupTemplate
