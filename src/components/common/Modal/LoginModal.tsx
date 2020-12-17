import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import PopupTemplate from 'components/wematch-ui/PopupTemplate'
import { createPortal } from "react-dom";
import * as colors from 'styles/colors';
import * as commonActions from 'store/common/actions'
import * as formActions from 'store/form/actions';
import * as formSelector from 'store/form/selectors';
import * as commonSelector from 'store/common/selectors'
import Input from "../Input";
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import useTimer from 'hooks/useTimer';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const {
        visible = false,
        onClose
    } = props;
    const getPhone = useSelector(formSelector.getPhone)
    const getName = useSelector(formSelector.getName)
    const { data: { is_verified }, isSendMessage, loading } = useSelector(commonSelector.getPhoneVerified)
    const { counter, handleCounterStart, handleCounterStop } = useTimer(180);
    const [isFocus, setIsFocus] = useState(false)
    const [code, setCode] = useState<string>('')

    const handleSubmit = () => {
        dispatch(commonActions.fetchVerifySendMessageAsync.request({
            phone: getPhone
        }))
    }

    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const originPhoneValue = event.target.value.replace(/-/gi, '')
        dispatch(formActions.setPhone(originPhoneValue))
    }

    const isAuth = useMemo(() => !(!!getName && getPhone.length >= 11) || is_verified, [getName, getPhone, is_verified]);

    const handleVerify = () => {
        dispatch(commonActions.fetchVerifyCodeAsync.request({
            phone: getPhone,
            code
        }))

        // if (onDataLayerAuth) {
        //     onDataLayerAuth()
        // }
    }

    const displayCount = (count: number) => `${Math.floor(count / 60)}:${count % 60 < 10 ? `0${count % 60}` : count % 60}`

    useEffect(() => {
        if (isSendMessage) {
            handleCounterStart()
        }
    }, [isSendMessage, handleCounterStart])

    useEffect(() => {
        if (is_verified) {
            handleCounterStop()
        }
    }, [is_verified, handleCounterStop])


    return createPortal((
        <PopupTemplate visible={visible} onClose={onClose} pcHeight={640}>
            <LoginModalWrapper isScroll={isFocus}>
                <div>
                    <TextWrppaer>
                        <strong>앗! 위매치 처음 이용하시나요?</strong>
                        <p>
                            업체와의 <span>견적상담신청/내신청내역 확인</span>을 위해<br />
                            <span>번호인증</span>이 필요해요. (최초 1회만 인증)
                        </p>
                    </TextWrppaer>
                    <FormWrapper>
                        <Input theme="default" border placeholder="이름" maxLength={20}
                            onChange={(e) => dispatch(formActions.setName(e.target.value))} value={getName}
                            style={{ backgroundColor: is_verified ? '' : "transparent" }}
                            onFocus={() => { setIsFocus(true) }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Input theme="default" border placeholder="휴대폰 번호(-없이)" pattern="[0-9]*" inputMode="numeric"
                                value={getPhone} onChange={handlePhone} style={{ backgroundColor: is_verified ? '' : "transparent" }} rootStyle={{ flex: 1 }} onFocus={() => { setIsFocus(true) }}
                                disabled={is_verified}
                            />
                            <Button theme="primary" disabled={isAuth} style={{ width: "90px", marginLeft: '7px', borderRadius: '4px' }}
                                onClick={handleSubmit} bold={true}>
                                {!isSendMessage && !is_verified ? '인증요청' : '재전송'}
                            </Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <Input theme="default" border placeholder="인증번호" maxLength={4}
                                    value={code} pattern="[0-9]*" inputMode="numeric"
                                    onChange={(e) => { setCode(e.target.value) }}
                                    style={{ backgroundColor: !isSendMessage || is_verified ? '' : "transparent", borderColor: is_verified === false ? '#EC485C' : '' }}
                                    disabled={!isSendMessage || is_verified}
                                />
                                <CounterWrapper>
                                    <span>{isSendMessage && displayCount(counter)}</span>
                                </CounterWrapper>
                            </div>
                            <Button theme="primary" disabled={!isSendMessage || is_verified} onClick={handleVerify} bold={true}
                                style={{ width: "90px", marginLeft: '7px', borderRadius: '4px' }} >
                                확인
                            </Button>
                        </div>
                        <div>
                            {is_verified === false && !loading && code.length > 0 && <ErrorMessage>인증번호를 잘못 입력했습니다.</ErrorMessage>}
                            {is_verified === true && !loading && code.length > 0 && <SuccessMessage>인증이 완료되었습니다.</SuccessMessage>}
                        </div>
                    </FormWrapper>
                </div>
                <FooterWrappe>
                    <p>
                        이용약관 및 개인정보처리방침 동의, 견적상담을 위한 개인 정보 제3자 제공 및 마케팅 정보수신 동의 필요
                    </p>
                    <Button theme="primary" disabled={!is_verified} style={{ borderRadius: '8px', fontSize: '18px' }}
                        bold={true} onClick={onClose}>
                        동의하고 진행하기
                    </Button>
                </FooterWrappe>
            </LoginModalWrapper>
        </PopupTemplate>
    ),
        document.body
    )
}

export default LoginModal

const LoginModalWrapper = styled.div<{ isScroll: boolean }>`
    position: absolute;
    width: 100%;
    height: ${({ isScroll }) => isScroll ? `100vh` : 'calc(100vh - 56px)'};
    box-sizing: border-box;
    backgrorund-color: white;
    padding: 24px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width: 768px) {
        height: 584px;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
    }
`;

const TextWrppaer = styled.div`
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 23px;
    font-style: normal;
    font-weight: normal;
    color: ${colors.gray66};
  
    strong {
      display: block;
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: -0.03em;
      margin-bottom: 8px;
    }
    
    p {
      margin-bottom: 28px;
    }
  
    span {
      font-weight: 700;
    }
`;

const FormWrapper = styled.div`
`

const FooterWrappe = styled.div`
    p {
        color: ${colors.gray66};
        padding-bottom: 16px;
    }
`

const ErrorMessage = styled.span`
    color: #fa3c3c;
`

const SuccessMessage = styled.span`
    color: #1672F7;
`

const CounterWrapper = styled.div`
    position: absolute;
    right: 16px;
    top: 18px;
    span {
        display: block;
        font-size: 16px;
        line-height: 24px;
        color: ${colors.gray33};
    }
`