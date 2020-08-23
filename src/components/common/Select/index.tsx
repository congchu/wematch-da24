import React, { useEffect, useState } from 'react'
import Styled, { css, keyframes } from 'styled-components'

import * as colors from 'styles/colors'

type SelectItemProp = {
    key: string;
    value: string;
}

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
    onSelect? (data: string): void;
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
    Container: Styled.div`
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
        padding:14px 24px 24px;
        background-color: ${colors.white};
        box-sizing:border-box;
        z-index:20;
        
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
            background-color: inherit;
        }
    `,
    Overlay: Styled.div<{visible: boolean}>`
        width: 100%;
        height: 100%;
        opacity: .88;
        background: ${colors.pointVividBlue};
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        background: linear-gradient(to bottom, ${colors.pointVividBlue} 0%, #2ccbcb 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=${colors.pointVividBlue}, endColorstr='#2ccbcb', GradientType=0);
        
        transition: all 0.25s ease-in-out;
        animation-duration: 0.25s;
        animation-timing-function: ease-out;
        animation-name: ${fadeIn};
        animation-fill-mode: forwards;
        ${({ visible }) => visible && css`
          animation-name: ${fadeOut};
        `};
        
        @media (min-width: 1200px) { 
            background: rgba(18,18,18,0.6);
            background: linear-gradient(to right, rgba(18,18,18,0.6) 0%, rgba(18,18,18,0.6) 100%);
            filter: none;
        }
    `,
    SelectBox: Styled.div<{visible: boolean}>`
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
        z-index: 20;
        
        animation-duration: 0.25s;
        animation-timing-function: ease-out;
        animation-name: ${slideUp};
        animation-fill-mode: forwards;
        ${({ visible }) => visible && css`
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
            border-bottom-right-radius:16px; 
            border-bottom-left-radius:16px;
        }
    `,
    Header: Styled.div`
        position: relative;
        width: 100%;
        height: 40px;
        border-top-right-radius: 16px;
        border-top-left-radius: 16px;
        background-color: ${colors.grayBg};
        text-align: right;
        strong {
            position: absolute;
            top: 10px;
            left: 20px;
            font-size: 15px;
            font-weight: 400;
            color: ${colors.gray33};
            line-height: 24px;
            letter-spacing: -1px;
        }
        button {
            height: 40px; 
            padding: 0 24px; 
            font-size: 15px; 
            font-weight: 400; 
            color: ${colors.pointBlue};
            line-height: 41px;
            letter-spacing: -1px;
            cursor: pointer;
        }
        
        @media (min-width: 1200px) {
            padding: 1px 0;
            strong {
                display: block;      
            }
        }
    `,
    List: Styled.ul`
        overflow-y: scroll;
        max-height: 280px;
        padding: 0 24px;
        
        @media (min-width: 1200px) {
            max-height: 337px;
        }
    `,
    Item: Styled.li`
        height: 60px;
        margin: 0;
        padding: 8px 0 10px;
        font-size: 15px;
        color: ${colors.gray33};
        line-height: 50px;
        cursor: pointer;
        border-top: 1px solid ${colors.lineDeco};
        background-color: transparent;
        text-align: center;
        box-sizing: border-box;
        user-select: none;
        :first-child {
            border-top:0 none
        }
        :last-child {
            border-bottom: 0 none;
        }
        :hover { 
            color: ${colors.pointVividBlue};
        }
    `,
}

const Select:React.FC<Props> = (props) => {
    const {
        visible,
        headerTitle,
        onClose,
        onOverlayClose,
        items,
        onSelect
    } = props

    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(visible);

    const handleOnSelect = (data: string) => {
        if (onSelect) {
            onSelect(data)
        }
    }

    const handleOnClose = (e: React.MouseEvent) => {
        if (onClose) {
            onClose(e)
        }
    }

    useEffect(() => {
        if (localVisible && !visible) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 250);
        }
        setLocalVisible(visible);
    }, [localVisible, visible]);

    if (!animate && !localVisible) return null;

    const keyList = items.map((item) => {
        return item.key
    })

    const values = items.map((item) => {
        return item.value
    })

    return (
        <S.Container>
            <S.Overlay visible={!visible} onClick={onOverlayClose} />
            <S.SelectBox visible={!visible}>
                <S.Header>
                    <strong>{headerTitle}</strong>
                    <button onClick={onClose}>닫기</button>
                </S.Header>
                <S.List>
                    {values.map((value, index) =>
                        <S.Item key={index} onClick={(e) => {
                            handleOnSelect(keyList[index])
                            handleOnClose(e)
                        }}>
                            {value}
                        </S.Item>
                    )}
                </S.List>
            </S.SelectBox>
        </S.Container>
    )
}

export default Select