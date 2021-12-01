import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use-media";
import styled from "styled-components";
import ReactPixel from "react-facebook-pixel";
import { useCookies } from "react-cookie";

import MainHeader from "components/common/MainHeader";
import AreaIcon from "components/Icon/generated/AreaIcon";
import Kakao from "components/Icon/generated/Kakao_fit";

import * as commonSelector from "store/common/selectors";
import * as cleanSelector from "store/clean/selectors";
import * as formActions from "store/form/actions";
import * as formSelectors from "store/form/selectors";
import { FormState } from "store/form/reducers";

import { MOVE_URL } from "constants/env";
import { dataLayer } from "lib/dataLayerUtil";
import { events } from "lib/appsflyer";
import { Link, useHistory, useLocation } from "react-router-dom";
import { IconSad } from "../../../components/Icon";
import { Button } from "@wematch/wematch-ui";
import * as colors from "../../../styles/colors";
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
  Container: styled.div``,
  Contents: styled.div`
    margin-top: 120px;
    text-align: center;
    padding: 24px;

    svg {
      display: block;
      margin: 0 auto;
    }

    @media screen and (min-width: 1200px) {
      margin-bottom: 150px;
    }
    @media screen and (max-width: 320px) {
      margin-top: 100px;
    }
  `,
  Title: styled.strong`
    display: inline-block;
    margin-top: 20px;
    font-size: 16px;
    line-height: 22px;
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
    margin-top: 10px;
    font-size: 15px;
    color: #666;
    line-height: 22px;
  `,
  LinkAlarm: styled.a`
    display: block;
    height: 36px;
    padding: 10px 0;
    font-weight: 700;
    background: #ffe500;
    text-align: center;
    border-radius: 6px;
    margin-top: 40px;
    margin-right: 24px;
    margin-left: 24px;
    font-size: 18px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    svg {
      margin-top: -2px;
      margin-right: 10px;
      vertical-align: middle;
    }

    span {
      line-height: 35px;
    }

    @media screen and (min-width: 1200px) {
      display: block;
      position: relative;
      width: 720px;
      margin: 0 auto;
    }
  `
};

export default function NoService() {
  const isDesktop = useMedia({
    minWidth: 1200
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [cookies, setCookie] = useCookies(["report"]);
  const [isCookie, setIsCookie] = useState(false); //새로고침 시 픽셀,데이터 레이어 재요청 방지용
  const getSubmittedForm = useSelector(formSelectors.getSubmittedForm);
  const getMoveType = useSelector(formSelectors.getType);
  const getMoveDate = useSelector(formSelectors.getDate);
  const getAddress = useSelector(formSelectors.getAddress);
  const getFloor = useSelector(formSelectors.getFloor);
  const getName = useSelector(formSelectors.getName);
  const getPhone = useSelector(formSelectors.getPhone);
  const getIsMoveStore = useSelector(formSelectors.getIsMoveStore);
  const getContents = useSelector(formSelectors.getContents);
  const getFormData = useSelector(formSelectors.getFormData);
  const getAgree = useSelector(formSelectors.getAgree);
  const getJuso = useSelector(commonSelector.getJuso);
  const cleanFormData = useSelector(cleanSelector.getCleanForm);

  const params = new URLSearchParams(location.search);
  const serviceType = params.get("service_type") === "clean" ? "clean" : "move";

  const formState: FormState = {
    type: getMoveType,
    date: getMoveDate,
    address: getAddress,
    agree: getAgree,
    floor: getFloor,
    formData: getFormData,
    isMoveStore: getIsMoveStore,
    name: getName,
    phone: getPhone,
    submittedForm: getSubmittedForm,
    contents: getContents
  };

  const getDong = useCallback((dongType: "start" | "end") => {
    if (getJuso.type[dongType] === "jibun") {
      return getJuso.start?.jibunAddr.replace(/ /g, "-");
    }
    return getJuso[dongType]?.roadAddr?.replace(/ /g, "-");
  }, []);

  useEffect(() => {
    if (serviceType === "move" && getSubmittedForm.data && !getSubmittedForm.loading && !isCookie) {
      dataLayer({
        event: "complete",
        category: "업체없음",
        action: "업체없음",
        label: `${getDong("start")}_${getDong("end")}`,
        CD6: `${getMoveType === "house" ? "가정" : "사무실"}`,
        CD12: "바로매칭"
      });

      ReactPixel.fbq("track", "Purchase");
      gtag("event", "conversion", { send_to: "AW-862163644/CmzdCIej6G0QvKWOmwM" });
    } else if (serviceType === "clean") {
      dataLayer({
        event: "clean_done",
        category: "청소_마감고객",
        action: `${cleanFormData.type}`,
        label: `${dayjs(cleanFormData.date[0]).format("MM_DD")}`,
        CD16: `${cleanFormData.addressType === "road" ? cleanFormData.address?.roadAddrPart1.replace(/ /g, "") : cleanFormData.address?.jibunAddr.replace(/ /g, "")}`,
        CD17: `${cleanFormData.livingType.replace(/\/|\([^)]*\)/g, "")}`,
        CD18: `${cleanFormData.houseSpace}`,
        CD19: `${cleanFormData.selectOptionItem.join(",")}`
      });
    }

    events({
      action: "app_move_noservice"
    });
  }, []);

  useEffect(() => {
    if (cookies.report && !getSubmittedForm?.data && !getSubmittedForm?.loading) {
      setIsCookie(true);
      dispatch(formActions.submitFormAsync.success(cookies.report));
    }
    // if (!cookies.report && !getSubmittedForm.report && !getSubmittedForm?.loading) {
    //     history.push('/myrequest')
    // }
  }, [getSubmittedForm]);

  useEffect(() => {
    if (getSubmittedForm.data?.result === "no service" && !getSubmittedForm.loading) {
      const now = new Date();
      const time = now.getTime() + 3600 * 1000;
      now.setTime(time);
      setCookie("report", formState, {
        path: "/",
        expires: now
      });
    }
  }, [getSubmittedForm?.data?.result, getSubmittedForm.loading]);

  return (
    <S.Container>
      {/* {isDesktop ? <MainHeader/> : <NavHeader title="" onPreviousButtonClick={goHome}/>} */}
      {isDesktop ? (
        <MainHeader />
      ) : (
        <S.Header>
          <Link to="/">
            <span>위매치</span>
          </Link>
        </S.Header>
      )}
      <S.Contents>
        {serviceType === "move" ? (
          <>
            <AreaIcon />
            <S.Title>해당 지역은 서비스 준비 중입니다.</S.Title>
            <S.Subtext>
              빠른 시일 내 이용 가능하도록
              <br />
              최선을 다하겠습니다.
            </S.Subtext>
          </>
        ) : (
          <>
            <IconSad width={80} height={64} />
            <S.CleanTitle>선택지역은 서비스 준비중입니다.</S.CleanTitle>
            <S.SubTitle>
              빠른 시일 내 이용 가능하도록
              <br /> 최선을 다하겠습니다.
            </S.SubTitle>
            <S.ButtonWrapper>
              <Button theme={"primary"} label={"홈으로 돌아가기"} isRound={true} onClick={() => history.push("/")} />
            </S.ButtonWrapper>
          </>
        )}
      </S.Contents>
      {serviceType === "move" && (
        <S.LinkAlarm id="dsl_a_alarm_noService" href="https://pf.kakao.com/_Ppsxexd/chat" target="_blank">
          <Kakao />
          <span>가능업체 알림 신청</span>
        </S.LinkAlarm>
      )}
    </S.Container>
  );
}
