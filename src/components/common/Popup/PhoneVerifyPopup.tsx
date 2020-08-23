import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Styled from 'styled-components'

import { Close } from 'components/wematch-ui/Icon'
import Button from 'components/common/Button'
import Input from 'components/common/Input'
import PopupTemplate from 'components/common/Popup/PopupTemplate'

import * as colors from 'styles/colors'
import * as commonActions from 'store/common/actions'
import * as commonSelector from 'store/common/selectors'

interface Props {
    visible: boolean,
    /** 닫기 버튼 이벤트 정의 */
    onClose?: () => void;
    /** 오버레이 클릭 버튼 이벤트 정의 */
    onOverlayClose?: () => void;
    /** 핸드폰 번호 */
    phone: string
}

const S = {
    Container: Styled.div`
        padding: 30px 24px 10px;
        strong {
            display: block;
            font-weight: 600;
            font-size: 22px;
            line-height: 26px;
            color: ${colors.gray33};
        }
        
        p {
            font-size: 15px;
            line-height: 22px;
        }
        
        em {
            color: ${colors.pointBlue};  
        }
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
    ErrorMessage: Styled.p`
        color: #fa3c3c;
    `
}

const PhoneVerifyPopup:React.FC<Props> = (props) => {
    const {
        visible,
        onClose,
        onOverlayClose,
        phone
    } = props
    const dispatch = useDispatch()

    const [code, setCode] = useState<string>('')
    const getPhoneVerified = useSelector(commonSelector.getPhoneVerified)

    useEffect(() => {
        if (visible) {
            dispatch(commonActions.fetchVerifySendMessageAsync.request({
                phone
            }))
        }

        return () => {
        }
    }, [visible])

    const handleSubmit = () => {
        dispatch(commonActions.fetchVerifyCodeAsync.request({
            phone,
            code
        }))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    };

    return (
        <PopupTemplate visible={visible} onOverlayClose={onOverlayClose}>
            <S.Container>
                <S.CloseButton onClick={onClose}>
                    <Close size={24} color={colors.white} />
                </S.CloseButton>
                <strong>전화번호인증</strong>
                <p>
                    고객님이 입력하신 <em className="point">{phone}</em>(으)로 <br />
                    인증번호를 발송하였습니다.
                </p>
                <S.Group>
                    <Input theme="default" maxLength={4} value={code} onChange={(e) => {
                        setCode(e.target.value)
                    }} onKeyPress={handleKeyPress} />
                    <Button theme="primary" style={{ width: "80px", fontSize: "15px" }} onClick={handleSubmit}>인증하기</Button>
                </S.Group>
                {getPhoneVerified.data.is_verified === false && !getPhoneVerified.loading ? (
                    <S.ErrorMessage>잘못된 인증번호 입니다</S.ErrorMessage>
                ) : (
                    <p>인증번호를 입력해 주세요</p>
                )}
            </S.Container>
        </PopupTemplate>
    )
}

export default PhoneVerifyPopup