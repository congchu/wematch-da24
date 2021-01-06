import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
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
import useHashToggle from 'hooks/useHashToggle';
import TermsModal from './TermsModal';
import NewModal from 'components/NewModalTemplate';
import getMobileOS from 'lib/getMobileOS';


interface Props {
    visible: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<Props> = (props) => {
    const mobileOS = getMobileOS();

    const dispatch = useDispatch();
    const {
        visible = false,
        onClose
    } = props;
    const getMoveType = useSelector(formSelector.getType)
    const getPhone = useSelector(formSelector.getPhone)
    const getName = useSelector(formSelector.getName)
    const { loginState } = useSelector(commonSelector.getLoginState);
    const { data: { is_verified }, isSendMessage, loading } = useSelector(commonSelector.getPhoneVerified)
    const { counter, handleCounterStart, handleCounterStop } = useTimer(180);
    const [code, setCode] = useState<string>('')
    const [visibleTerms, setVisibleTerms] = useHashToggle('#terms');
    const [visibleTimeout, setVisibleTimeout] = useHashToggle('#timeout');
    const [visibleCancel, setVisibleCancel] = useHashToggle('#verifyCancel');
    const [isTimeout, setIsTimeout] = useState(false);
    const verifyRef = useRef<HTMLInputElement | null>(null);
    const [isMobileKeyboard, setIsMobileKeyboard] = useState(false);

    const handleSubmit = () => {
        setIsTimeout(false);
        dispatch(commonActions.fetchVerifySendMessageAsync.request({
            phone: getPhone
        }))
    }

    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const originPhoneValue = event.target.value.replace(/-/gi, '')
        dispatch(formActions.setPhone(originPhoneValue))
    }
    const isNumRegex = /^[0-9]+$/g;
    const isAuth = useMemo(() => !(!!getName && getPhone.length >= 11 && isNumRegex.test(getPhone)) || is_verified, [getName, getPhone, is_verified, isNumRegex]);

    const handleVerify = () => {
        dispatch(commonActions.fetchVerifyCodeAsync.request({
            phone: getPhone,
            code
        }))
    }

    const displayCount = (count: number) => `${Math.floor(count / 60)}:${count % 60 < 10 ? `0${count % 60}` : count % 60}`

    const handleModalClose = () => {
        if (visibleCancel) {
            setVisibleCancel(!visibleCancel)
            onClose()
        }
    }

    const handleSignUp = () => {
        dispatch(commonActions.fetchSignUpAsync.request({
            tel: getPhone,
            name: getName,
            init_service: getMoveType === 'house' ? '가정이사' : '사무실'
        }))
    }

    useEffect(() => {
        const handleResize = () => {
            if (mobileOS === 'Android') {
                if (window.innerHeight < 500) {
                    setIsMobileKeyboard(true);
                } else {
                    setIsMobileKeyboard(false);
                }
            }
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize)
    }, [mobileOS])

    useEffect(() => {
        if (counter === 0) {
            setVisibleTimeout(true)
        }
    }, [counter])

    useEffect(() => {
        if (isSendMessage && !loading) {
            verifyRef?.current?.focus();
            handleCounterStart()
        }
    }, [isSendMessage, loading, handleCounterStart])

    useEffect(() => {
        if (is_verified) {
            handleCounterStop()
        }
    }, [is_verified, handleCounterStop])

    useEffect(() => {
        if (loginState) {
            onClose();
        }
    }, [loginState])


    return createPortal((
        <PopupTemplate visible={visible} onClose={() => setVisibleCancel(true)} pcHeight={640}>
            <LoginModalWrapper isScroll={true}>
                <div style={{ width: '100%' }}>
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
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Input theme="default" border placeholder="휴대폰 번호(-없이)" pattern="[0-9]*" inputMode="numeric"
                                value={getPhone} onChange={handlePhone} style={{ backgroundColor: is_verified ? '' : "transparent" }} rootStyle={{ flex: 1 }} maxLength={11}
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
                                    style={{ backgroundColor: !isSendMessage || is_verified ? '' : "transparent", borderColor: is_verified === false ? '#EC485C' : '' }} inputRef={verifyRef}
                                    disabled={!isSendMessage || is_verified}
                                />
                                <CounterWrapper>
                                    <span>{isSendMessage && displayCount(counter)}</span>
                                </CounterWrapper>
                            </div>
                            <Button theme="primary" disabled={!isSendMessage || is_verified || isTimeout} onClick={handleVerify} bold={true}
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
                {mobileOS === 'Android' && <MobileKeyboardSection isMobileKeyboard={isMobileKeyboard} />}
                <FooterWrappe isIOS={mobileOS === 'iOS'}>
                    <p>
                        <span onClick={() => setVisibleTerms(true)}>이용약관 및 개인정보처리방침 동의</span>, 견적상담을 위한 개인 정보 제3자 제공 및 마케팅 정보수신 동의 필요
                    </p>
                    <Button theme="primary" disabled={!is_verified} style={{ fontSize: '18px' }}
                        bold={true} onClick={handleSignUp}>
                        동의하고 진행하기
                    </Button>
                </FooterWrappe>
            </LoginModalWrapper>
            {/*인증번호 초과 모달*/}
            <NewModal visible={visibleTimeout} title={"인증번호 입력시간 초과"} content={"인증번호 입력가능시간이 초과 되었습니다. 인증번호를 다시 받아주세요!"} confirmText={"확인"} confirmClick={() => { setVisibleTimeout(!visibleTimeout); setIsTimeout(true) }} />
            {/*로그인/가입 취소 모달*/}
            <NewModal visible={visibleCancel} title={"번호인증 취소"} content={`번호인증을 취소하시면 견적상담신청 및 내신청내역을 확인할 수 없습니다.\n취소하시겠어요?`} confirmText={"인증 진행하기"} cancelText={"취소"} cancelClick={() => handleModalClose()} confirmClick={() => setVisibleCancel(!visibleCancel)} />
            <TermsModal visible={visibleTerms} onClose={() => setVisibleTerms(!visibleTerms)} />
        </PopupTemplate>
    ),
        document.body
    )
}

export default LoginModal

const LoginModalWrapper = styled.div<{ isScroll: boolean }>`
    width: 100%;
    height: auto;
    flex: 1;
    box-sizing: border-box;
    backgrorund-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width: 768px) {
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
`;

const MobileKeyboardSection = styled.div<{ isMobileKeyboard: boolean }>`
    height: ${({ isMobileKeyboard }) => isMobileKeyboard ? `${window.innerHeight}px` : '0'};
`


const TextWrppaer = styled.div`
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 23px;
    font-style: normal;
    font-weight: normal;
    color: ${colors.gray66};
  
    padding: 0 24px;
    strong {
      display: block;
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: -0.03em;
      margin-bottom: 8px;
      color: ${colors.gray33};
    }
    
    p {
      margin-bottom: 28px;
    }
  
    span {
      font-weight: 700;
    }
`;

const FormWrapper = styled.div`
    padding: 0 24px;
    input {
        color: ${colors.gray33};
    }
`

const FooterWrappe = styled.div<{ isIOS: boolean }>`
    p {
        color: ${colors.gray66};
        padding-bottom: 16px;
        padding: 0 16px 16px 16px;
        span {
            text-decoration: underline;
        }
    }

    ${({ isIOS }) => isIOS && css`
        position: fixed;
        bottom: 0;

        p {
            padding: 16px;
        }
    `}
    
    a {
        color: ${colors.gray66};
        text-decoration: underline;
        margin-left: 5px;
        line-height: 24px;
        margin-bottom: -2px;
    }

    @media screen and (min-width: 768px) {
        p {
            padding: 0 16px 16px 16px;
        }
        button {
            border-radius: 4px;
        }
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