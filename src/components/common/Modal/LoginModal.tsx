import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import PopupTemplate from "components/wematch-ui/PopupTemplate";
import { createPortal } from "react-dom";
import * as colors from "styles/colors";
import * as userActions from "store/user/actions";
import * as formActions from "store/form/actions";
import * as formSelector from "store/form/selectors";
import * as userSelector from "store/user/selectors";
import Input from "../Input";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import useTimer from "hooks/useTimer";
import useHashToggle from "hooks/useHashToggle";
import TermsModal from "./TermsModal";
import NewModal from "components/NewModalTemplate";
import getMobileOS from "lib/getMobileOS";
import { EInitService } from "types/auth";
import { dataLayer } from "lib/dataLayerUtil";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<Props> = (props) => {
  const mobileOS = getMobileOS();

  const dispatch = useDispatch();
  const { visible = false, onClose, onSuccess } = props;
  const getMoveType = useSelector(formSelector.getType);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { token } = useSelector(userSelector.getUser);
  const { isVerified, isSendMessage, loading } = useSelector(userSelector.getPhoneVerified);
  const { counter, handleCounterStart, handleCounterStop } = useTimer(180);
  const [code, setCode] = useState<string>("");
  const [visibleTerms, setVisibleTerms] = useHashToggle("#terms");
  const [visibleTimeout, setVisibleTimeout] = useHashToggle("#timeout");
  const [visibleCancel, setVisibleCancel] = useHashToggle("#verifyCancel");
  const [isTimeout, setIsTimeout] = useState(false);
  const verifyRef = useRef<HTMLInputElement | null>(null);
  const [isMobileKeyboard, setIsMobileKeyboard] = useState(false);

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

  const handleModalClose = () => {
    if (visibleCancel) {
      setVisibleCancel(!visibleCancel);
      onClose();
    }
  };

  const handleSignUp = () => {
    dispatch(
      userActions.fetchSignUpAsync.request({
        tel: phone,
        name: name,
        init_service: getMoveType === "house" ? EInitService.MOVE_HOUSE : EInitService.MOVE_OFFICE,
        code
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
    handleModalClose();
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
    const handleResize = () => {
      if (mobileOS === "Android") {
        if (window.innerHeight < 500) {
          setIsMobileKeyboard(true);
        } else {
          setIsMobileKeyboard(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOS]);

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
    if (isVerified) {
      handleCounterStop();
    }
  }, [isVerified, handleCounterStop]);

  useEffect(() => {
    if (token && visible) {
      onSuccess();
    }
  }, [token, visible]);

  return createPortal(
    <PopupTemplate visible={visible} onClose={() => setVisibleCancel(true)}>
      <LoginModalWrapper id={"dsl_login_popup"}>
        <div style={{ width: "100%" }}>
          <TextWrppaer>
            <strong>????????????</strong>
            <p>
              ???????????? <span>??????????????????/??????????????? ??????</span>??? ??????
              <br />
              <span>????????????</span>??? ????????????. (?????? 1?????? ??????)
            </p>
          </TextWrppaer>
          <FormWrapper>
            <Input
              theme="default"
              border
              placeholder="??????"
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              value={name}
              style={{ backgroundColor: isVerified ? "" : "transparent" }}
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
              <Button theme="primary" disabled={!isSendMessage || isVerified || isTimeout} onClick={handleVerify} bold={true} style={{ width: "90px", marginLeft: "7px", borderRadius: "4px" }}>
                ??????
              </Button>
            </div>
            <div>
              {isVerified === false && !loading && code.length > 0 && <ErrorMessage>??????????????? ?????? ??????????????????.</ErrorMessage>}
              {isVerified === true && !loading && code.length > 0 && <SuccessMessage>????????? ?????????????????????.</SuccessMessage>}
            </div>
          </FormWrapper>
        </div>
        {mobileOS === "Android" && <MobileKeyboardSection isMobileKeyboard={isMobileKeyboard} />}
        <FooterWrappe isIOS={mobileOS === "iOS"}>
          <p>
            <span onClick={() => setVisibleTerms(true)}>???????????? ??? ???????????????????????? ??????</span>, ??????????????? ?????? ?????? ?????? ???3??? ?????? ??? ????????? ???????????? ?????? ??????
          </p>
          <Button theme="primary" disabled={!isVerified} style={{ fontSize: "18px" }} bold={true} onClick={handleSignUp}>
            ???????????? ????????????
          </Button>
        </FooterWrappe>
      </LoginModalWrapper>
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
    </PopupTemplate>,
    document.body
  );
};

export default LoginModal;

const LoginModalWrapper = styled.div`
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px) {
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
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
`;

const FooterWrappe = styled.div<{ isIOS: boolean }>`
  p {
    color: ${colors.gray66};
    padding-bottom: 16px;
    padding: 0 16px 16px 16px;
    span {
      text-decoration: underline;
    }
  }

  ${({ isIOS }) =>
    isIOS &&
    css`
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
