import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ReactPixel from "react-facebook-pixel";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useMedia } from "react-use-media";
import useHashToggle from "hooks/useHashToggle";
import { useCookies } from "react-cookie";
import { Button } from "@wematch/wematch-ui";

import MainHeader from "components/common/MainHeader";
import { IconSad, SoldOut } from "components/Icon";
import * as formSelectors from "store/form/selectors";
import * as formSelector from "store/form/selectors";
import * as commonSelector from "store/common/selectors";
import * as cleanSelector from "store/clean/selectors";
import { dataLayer } from "lib/dataLayerUtil";
import { events } from "lib/appsflyer";
import { formatDateKor } from "lib/dateUtil";
import * as colors from "styles/colors";
import dayjs from "dayjs";

const S = {
  Header: styled.header`
    display: block;
    height: 55px;
    padding: 0 24px;
    margin-top: 0;

    a {
      display: block;
      width: 87px;
      height: 16px;
      padding: 24px 0 10px;
    }

    span {
      display: block;
      width: 87px;
      height: 16px;
      font-size: 1px;
      background: url(https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/logo/wematch_c.png) 0 0 no-repeat;
      background-size: 100% auto;
      color: transparent;
    }
    @media screen and (min-width: 768px) {
      height: 72px;

      a {
        width: 108px;
        height: 20px;
        padding-top: 26px;
      }
    }
  `,
  Container: styled.div`
    position: relative;
    padding-bottom: 24px;
    height: calc(100vh - 55px);
  `,
  Contents: styled.div`
    margin-top: 56px;
    text-align: center;
    letter-spacing: -0.5px;
    padding: 24px;
    svg {
      display: block;
      margin: 0 auto;
      @media screen and (max-width: 320px) {
        width: 80px;
        height: 80px;
      }
    }

    @media screen and (min-width: 1200px) {
      margin: 172px 0 63px;
    }
    @media screen and (max-width: 320px) {
      margin-top: 46px;
    }
  `,
  TitleContainer: styled.div`
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    padding: 30px 70px 0;
    letter-spacing: -1px;
    em {
      font-weight: bold;
    }
  `,
  Title: styled.strong`
    display: inline-block;
    margin-top: 18px;
    font-size: 16px;
    line-height: 22px;
    @media screen and (max-width: 320px) {
      margin-top: 6px;
      font-size: 15px;
    }
  `,

  CleanTitle: styled.p`
    font-size: 16px;
    font-weight: 700;
    color: ${colors.gray33};
    margin: 35px 0;
  `,
  SubTitle: styled.p`
    font-size: 16px;
    font-weight: 400;
    color: ${colors.gray33};
  `,
  ButtonWrapper: styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 24px;
    box-sizing: border-box;
  `,
  Subtext: styled.p`
    font-size: 14px;
    color: #666;
    line-height: 22px;
    margin-bottom: 24px;
    text-align: center;
    @media screen and (max-width: 320px) {
      margin-top: 6px;
      font-size: 14px;
      line-height: 20px;
    }
  `,
  ChangeDate: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 117px;
    padding: 0 24px;

    @media screen and (min-width: 1200px) {
      width: 720px;
      margin: 0 auto;
    }
    @media screen and (max-width: 320px) {
      margin-top: 22px;
    }
  `,
  DateTitle: styled.strong`
    display: inline-block;
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    @media screen and (max-width: 320px) {
      margin-bottom: 10px;
    }
  `,
  DateSelect: styled.button`
    width: 100%;
    height: 56px;
    margin-top: 12px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 6px;
    color: #fff;
    background: #1672f7;
    @media screen and (min-width: 1200px) {
      width: 720px;
    }
    @media screen and (max-width: 320px) {
      height: 50px;
      font-size: 16px;
    }
  `,
  LinkAlarm: styled.a`
    display: inline-block;
    width: 100%;
    height: 36px;
    padding-top: 6px;
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
    letter-spacing: -0.5px;
    cursor: pointer;
  `,
  BottomContainer: styled.div`
    position: absolute;
    bottom: 0;
    left: 24px;
    width: calc(100% - 48px);
    @media screen and (min-width: 1200px) {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 740px;
    }
  `
};

export default function NoPartner() {
  const isDesktop = useMedia({
    minWidth: 1200
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const getSubmittedForm = useSelector(formSelectors.getSubmittedForm);
  const getMoveType = useSelector(formSelector.getType);
  const getMoveDate = useSelector(formSelector.getDate);
  const getFormData = useSelector(formSelector.getFormData);
  const getJuso = useSelector(commonSelector.getJuso);
  const cleanFormData = useSelector(cleanSelector.getCleanForm);
  const params = new URLSearchParams(location.search);
  const serviceType = params.get("service_type") === "clean" ? "clean" : "move";
  const [visibleCalendarModal, setVisibleCalendarModal] = useHashToggle("#calendar");
  const [cookies, setCookie] = useCookies(["report"]);
  const [isCookie, setIsCookie] = useState(false); //???????????? ??? ??????,????????? ????????? ????????? ?????????

  const getDong = useCallback((dongType: "start" | "end") => {
    if (getJuso.type[dongType] === "jibun") {
      return getJuso.start?.jibunAddr.replace(/ /g, "-");
    }
    return getJuso[dongType]?.roadAddr?.replace(/ /g, "-");
  }, []);

  useEffect(() => {
    try {
      if (serviceType === "move" && getSubmittedForm.data && !getSubmittedForm.loading && !isCookie) {
        dataLayer({
          event: "complete",
          category: "????????????",
          action: "????????????",
          label: `${getDong("start")}_${getDong("end")}`,
          CD6: `${getMoveType === "house" ? "??????" : "?????????"}`,
          CD12: "????????????"
        });
        ReactPixel.fbq("track", "Purchase");

        gtag("event", "conversion", { send_to: "AW-862163644/CmzdCIej6G0QvKWOmwM" });
      } else if (serviceType === "clean") {
        dataLayer({
          event: "clean_done",
          category: "??????_????????????",
          action: `${cleanFormData.type}`,
          label: `${dayjs(cleanFormData.date[0]).format("MM_DD")}`,
          CD16: `${cleanFormData.addressType === "road" ? cleanFormData.address?.roadAddrPart1.replace(/ /g, "") : cleanFormData.address?.jibunAddr.replace(/ /g, "")}`,
          CD17: `${cleanFormData.livingType.replace(/\/|\([^)]*\)/g, "")}`,
          CD18: `${cleanFormData.houseSpace}`,
          CD19: `${cleanFormData.selectOptionItem.join(",")}`
        });
      }

      events({
        action: "app_move_nopartner"
      });
    } catch {}
  }, []);

  return (
    <S.Container>
      {isDesktop ? (
        <MainHeader />
      ) : (
        <S.Header>
          <Link to="/">
            <span>?????????</span>
          </Link>
        </S.Header>
      )}
      <S.Contents>
        {serviceType === "move" ? (
          <>
            <SoldOut />
            {/*<S.Title>???????????? ????????? ????????? ?????? ??????????????????.</S.Title>*/}
            {/*<S.LinkAlarm id="dsl_a_alarm_noPartner" href="https://pf.kakao.com/_Ppsxexd/chat" target="_blank">*/}
            {/*?????????????????? ??? ?????? ????????????*/}
            {/*</S.LinkAlarm>*/}
            <S.TitleContainer>
              <p>
                <em>{formatDateKor(getFormData.moving_date)}</em>??? ????????? ?????? <br /> ????????? ????????? ????????? ?????? ????????????.
              </p>{" "}
              <br />
              <p>
                ?????? ?????? ?????? ??? ???????????? <br /> ?????? ?????? ???????????????. (?????? 2???)
              </p>
            </S.TitleContainer>
          </>
        ) : (
          <>
            <IconSad width={80} height={64} />
            <S.CleanTitle>?????? ????????? ????????? ?????? ?????????????????????.</S.CleanTitle>
            <S.SubTitle>
              ????????????(T. 1522-2483)??? ??????????????? <br />
              ????????? ????????? ????????????????????????.
            </S.SubTitle>
          </>
        )}
      </S.Contents>
      {/*{serviceType === 'move' && (*/}
      {/*  <S.ChangeDate>*/}
      {/*    <S.DateTitle>?????? ????????? ????????? ???????????????????</S.DateTitle>*/}
      {/*    <S.Subtext>*/}
      {/*      *?????? ????????? ????????? ????????? ??????????????????! <br /> ????????? ?????? ?????? ????????? ????????? ??? ????????????.*/}
      {/*    </S.Subtext>*/}
      {/*    <Input theme="default" border readOnly placeholder="???????????????" onClick={() => setVisibleCalendarModal(true)} value={getMoveDate} style={{ backgroundColor: 'transparent' }} rootStyle={{ width: '100%' }} icon={'down'} />*/}
      {/*    <CalendarModal visible={visibleCalendarModal} title="??????" serviceType={serviceType} onClose={toggleCalendarCancel} onConfirm={toggleCalendarConfirm} onSelect={onSelectDate} selected={getMoveDate} />*/}
      {/*    <S.DateSelect id="dsl_button_retry" onClick={handleSubmit}>*/}
      {/*      ????????? ????????? ?????? ?????? ??????*/}
      {/*    </S.DateSelect>*/}
      {/*  </S.ChangeDate>*/}
      {/*)}*/}
      <S.ButtonWrapper>
        <Button theme={"primary"} label={"????????? ????????????"} isRound={true} onClick={() => history.push("/")} />
      </S.ButtonWrapper>
      {/* <S.BottomContainer>
        <S.DateSelect onClick={() => history.push('/')}>????????? ????????????</S.DateSelect>
      </S.BottomContainer> */}
    </S.Container>
  );
}
