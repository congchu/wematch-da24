import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import * as colors from "styles/colors";
import * as userActions from "store/user/actions";
import * as formSelector from "store/form/selectors";
import * as userSelector from "store/user/selectors";
import * as cleanSelector from "store/clean/selectors";
import { useDispatch, useSelector } from "react-redux";
import useTimer from "hooks/useTimer";
import useHashToggle from "hooks/useHashToggle";
import NewModal from "components/NewModalTemplate";
import getMobileOS from "lib/getMobileOS";
import { EInitService } from "types/auth";
import { dataLayer } from "lib/dataLayerUtil";
import Input from "components/common/Input";
import Button from "components/common/Button";
import TermsModal from "components/common/Modal/TermsModal";
import MainHeader from "components/common/MainHeader";
import TopGnb from "components/TopGnb";
import { Spinner } from "@wematch/wematch-ui";
import { useMedia } from "react-use-media";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { get } from "lodash";
import { ESignInCase } from "store/user/types";

function LoginPage() {
  const mobileOS = getMobileOS();
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const getMoveType = useSelector(formSelector.getType);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { error, prevPage } = useSelector(userSelector.getUser);
  const cleanType = useSelector(cleanSelector.getCleanType);
  const { isVerified, isSendMessage, loading } = useSelector(userSelector.getPhoneVerified);
  const { counter, handleCounterStart, handleCounterStop } = useTimer(180);
  const [code, setCode] = useState<string>("");
  const [visibleTerms, setVisibleTerms] = useHashToggle("#terms");
  const [visibleTimeout, setVisibleTimeout] = useHashToggle("#timeout");
  const [visibleCancel, setVisibleCancel] = useHashToggle("#verifyCancel");
  const [isTimeout, setIsTimeout] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const verifyRef = useRef<HTMLInputElement | null>(null);
  const history = useHistory();
  const isDesktop = useMedia({
    minWidth: 1200
  });

  const handleSubmit = () => {
    setIsTimeout(false);
    dispatch(
      userActions.fetchVerifySendMessageAsync.request({
        phone
      })
    );
  };

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const originPhoneValue = event.target.value.replace(/-/gi, "");
    setPhone(originPhoneValue);
  };
  const isNumRegex = /^[0-9]+$/g;
  const isAuth = useMemo(() => !(!!name && phone.length >= 11 && isNumRegex.test(phone)) || !!isVerified, [name, phone, isVerified, isNumRegex]);

  const handleVerify = () => {
    dispatch(
      userActions.fetchVerifyCodeAsync.request({
        phone,
        code
      })
    );
  };

  const displayCount = (count: number) => `${Math.floor(count / 60)}:${count % 60 < 10 ? `0${count % 60}` : count % 60}`;

  const handleLoginClose = () => {
    if (visibleCancel) {
      dispatch(userActions.phoneVerifyCancel());
      history.go(-2);
    }
  };

  const handleSignUp = () => {
    setSubmitted(true);
    const agentId = get(cookies, "0dj38gepoekf98234aplyadmin");
    let init_service = EInitService.MOVE_OFFICE;

    if (prevPage === ESignInCase.FORM) {
      init_service = getMoveType === "house" ? EInitService.MOVE_HOUSE : EInitService.MOVE_OFFICE;
    } else if (prevPage === ESignInCase.CLEAN) {
      init_service = cleanType === "????????????" ? EInitService.CLEAN_HOUSE : EInitService.CLEAN_MOVE;
    }

    dispatch(
      userActions.fetchSignUpAsync.request({
        tel: phone,
        name: name,
        init_service,
        code,
        user_agent: navigator.userAgent,
        agreed_marketing: new Date().toISOString(),
        agent: agentId ? agentId.split("=")[1] : null
      })
    );
  };

  const handleLoginCancel = () => {
    dataLayer({
      event: "login",
      category: "???????????????_??????",
      action: "???????????????",
      label: "??????"
    });
    handleLoginClose();
  };

  const handleLoginConfirm = () => {
    dataLayer({
      event: "login",
      category: "???????????????_??????",
      action: "????????????",
      label: "??????????????????"
    });
    setVisibleCancel(!visibleCancel);
  };

  useEffect(() => {
    dispatch(userActions.phoneVerifyCancel());
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setVisibleTimeout(true);
    }
  }, [counter]);

  useEffect(() => {
    if (isSendMessage) {
      verifyRef?.current?.focus();
      handleCounterStart();
    }
  }, [isSendMessage, handleCounterStart]);

  useEffect(() => {
    if (isVerified !== null && code.length === 0) {
      dispatch(userActions.phoneVerifyReset());
    }
  }, [dispatch, code, isVerified]);

  return (
    <Container>
      {isDesktop ? <MainHeader isFixed={true} /> : <TopGnb title="????????????" count={0} onPrevious={() => setVisibleCancel(true)} showTruck={false} />}
      <LoginWrapper id={"dsl_login_popup"}>
        <div style={{ width: "100%" }}>
          <TextWrppaer>
            <p>
              ???????????? <span>??????????????????/??????????????? ??????</span>??? ??????
              <span> ????????????</span>??? ????????????. (?????? 1?????? ??????)
            </p>
          </TextWrppaer>
          <FormWrapper>
            <Input
              theme="default"
              border
              placeholder="??????"
              maxLength={8}
              onChange={(e) => setName(e.target.value)}
              value={name}
              inputRef={nameInputRef}
              style={{ backgroundColor: isVerified ? "" : "transparent" }}
              disabled={!!isVerified}
              onBlur={(e) => {
                if (e.target.value.length >= 2) {
                  dataLayer({
                    event: "login",
                    category: "?????????_??????",
                    action: "??????",
                    label: "?????????"
                  });
                }
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Input
                theme="default"
                border
                placeholder="????????? ??????(-??????)"
                pattern="[0-9]*"
                inputMode="numeric"
                value={phone}
                onChange={handlePhone}
                style={{ backgroundColor: isVerified ? "" : "transparent" }}
                rootStyle={{ flex: 1 }}
                maxLength={11}
                disabled={!!isVerified}
                onBlur={(e) => {
                  if (e.target.value.length >= 2) {
                    dataLayer({
                      event: "login",
                      category: "?????????_??????",
                      action: "???????????????",
                      label: "???????????????"
                    });
                  }
                }}
              />
              <Button theme="primary" disabled={isAuth} style={{ width: "90px", marginLeft: "7px", borderRadius: "4px" }} onClick={handleSubmit} bold={true}>
                {!isSendMessage && !isVerified ? "????????????" : "?????????"}
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Input
                  theme="default"
                  border
                  placeholder="????????????"
                  maxLength={6}
                  value={code}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  style={{ backgroundColor: !isSendMessage || isVerified ? "" : "transparent", borderColor: isVerified === false ? "#EC485C" : "" }}
                  inputRef={verifyRef}
                  disabled={!isSendMessage || !!isVerified}
                  onBlur={(e) => {
                    if (e.target.value.length >= 2) {
                      dataLayer({
                        event: "login",
                        category: "?????????_??????",
                        action: "????????????",
                        label: "??????????????????"
                      });
                    }
                  }}
                />
                <CounterWrapper>
                  <span>{isSendMessage && displayCount(counter)}</span>
                </CounterWrapper>
              </div>
              <Button theme="primary" disabled={!isSendMessage || isVerified || isTimeout || code.length < 6} onClick={handleVerify} bold={true} style={{ width: "90px", marginLeft: "7px", borderRadius: "4px" }}>
                ??????
              </Button>
            </div>
            <div>
              {isVerified === false && !loading && code.length > 0 && <ErrorMessage>??????????????? ?????? ??????????????????.</ErrorMessage>}
              {isVerified === true && !loading && code.length > 0 && <SuccessMessage>????????? ?????????????????????.</SuccessMessage>}
            </div>
          </FormWrapper>
        </div>
        {/* {mobileOS === 'Android' && <MobileKeyboardSection isMobileKeyboard={isMobileKeyboard} />} */}
        <FooterWrappe isIOS={mobileOS === "iOS"}>
          <p>
            <span onClick={() => setVisibleTerms(true)}>???????????? ??? ???????????????????????? ??????</span>, ??????????????? ?????? ?????? ?????? ???3??? ?????? ??? ????????? ???????????? ?????? ??????
          </p>
          <Button theme="primary" disabled={!isVerified || !name} style={{ fontSize: "18px", borderRadius: "6px" }} bold={true} onClick={handleSignUp}>
            {!submitted ? "???????????? ????????????" : <Spinner color="white" size="small" />}
          </Button>
          {isDesktop && (
            <Button theme="default" border={true} style={{ border: "1px solid #D7DBE2", marginTop: 10 }} onClick={() => setVisibleCancel(true)}>
              ??????
            </Button>
          )}
        </FooterWrappe>
      </LoginWrapper>
      {/*???????????? ?????? ??????*/}
      <NewModal
        visible={visibleTimeout}
        title={"???????????? ???????????? ??????"}
        content={"???????????? ????????????????????? ?????? ???????????????. ??????????????? ?????? ???????????????!"}
        confirmText={"??????"}
        confirmClick={() => {
          setVisibleTimeout(!visibleTimeout);
          setIsTimeout(true);
        }}
      />
      {/*?????????/?????? ?????? ??????*/}
      <NewModal
        visible={visibleCancel}
        title={"???????????? ??????"}
        content={`??????????????? ??????????????? ?????????????????? ??? ?????????????????? ????????? ??? ????????????.\n??????????????????????`}
        confirmText={"?????? ????????????"}
        cancelText={"??????"}
        cancelClick={handleLoginCancel}
        confirmClick={handleLoginConfirm}
        tags={{ cancel: "dsl_logincancel_cancel", success: "dsl_logincancel_continue" }}
      />
      <TermsModal visible={visibleTerms} onClose={() => setVisibleTerms(!visibleTerms)} />
      <NewModal visible={error} title={"???????????????"} content={`?????? ??? ????????? ?????????????????????. ????????? ????????? ??? ??????????????? ??????????????????. \n???????????? 1522-2483`} confirmText={"??????"} confirmClick={() => dispatch(userActions.errorModalOff())} />
    </Container>
  );
}

export default LoginPage;

const Container = styled.div`
  position: relative;
  min-width: 360px;
  height: 100vh;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  /* overflow-y: auto; */
  background-color: white;
  box-sizing: border-box;
  @media screen and (min-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const LoginWrapper = styled.div`
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  padding-top: 18px;
  margin-top: 56px;

  @media screen and (min-width: 768px) {
    width: 312px;
    justify-content: flex-start;
    align-items: center;
    padding-top: 100px;
  }
`;

const MobileKeyboardSection = styled.div<{ isMobileKeyboard: boolean }>`
  height: ${({ isMobileKeyboard }) => (isMobileKeyboard ? `${window.innerHeight}px` : "0")};
`;

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
    letter-spacing: 0.03px;
    margin-bottom: 28px;
  }

  span {
    font-weight: 700;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const FormWrapper = styled.div`
  padding: 0 24px;
  input {
    color: ${colors.gray33};
  }

  @media screen and (min-width: 768px) {
    padding: 0;
    margin-bottom: 100px;
  }
`;

const FooterWrappe = styled.div<{ isIOS?: boolean }>`
  padding: 24px;
  p {
    color: ${colors.gray66};
    padding-bottom: 8px;
    span {
      text-decoration: underline;
    }
  }

  a {
    color: ${colors.gray66};
    text-decoration: underline;
    margin-left: 5px;
    line-height: 24px;
    margin-bottom: -2px;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
    padding-bottom: 16px;
    p {
      padding-bottom: 16px;
    }
    button {
      border-radius: 4px;
    }
  }
`;

const ErrorMessage = styled.span`
  color: #fa3c3c;
`;

const SuccessMessage = styled.span`
  color: #1672f7;
`;

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
`;
