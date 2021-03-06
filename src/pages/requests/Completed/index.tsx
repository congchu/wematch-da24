import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import ReactPixel from "react-facebook-pixel";
import { useMedia } from "react-use-media";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useRouter } from "hooks/useRouter";

import MainHeader from "components/common/MainHeader";
import Collapse from "components/base/Collapse";
import { Down, Up } from "components/wematch-ui/Icon";
import { Check } from "components/Icon";
import ProcessBar from "./processBar";
import NewModal from "components/NewModalTemplate";
import * as commonSelector from "store/common/selectors";
import * as commonActions from "store/common/actions";
import * as partnerActions from "store/partner/actions";
import * as cleanActions from "store/clean/actions";
import * as cleanSelector from "store/clean/selectors";
import * as moveActions from "store/form/actions";
import * as moveSelector from "store/form/selectors";
import * as colors from "styles/colors";
import { CLEAN_URL } from "constants/env";
import { dataLayer } from "lib/dataLayerUtil";
import { whatDay } from "lib/dateUtil";
import dayjs from "dayjs";
import NewLevelN from "components/Icon/generated/NewLevelN";
import NewLevelOther from "components/Icon/generated/NewLevelOther";
import NewLevelS from "components/Icon/generated/NewLevelS";
import { SpinnerPopup } from "@wematch/wematch-ui";
import { Level } from "types/partner";
import { getUser } from "store/user/selectors";
import { phoneSplit } from "components/wematch-ui/utils/form";
import * as formSelector from "../../../store/form/selectors";
import { getCookie } from "../../../lib/cookie";
import * as userActions from "../../../store/user/actions";
import * as formActions from "../../../store/form/actions";
import { maskingName, maskingPhone } from "lib/stringUtil";

const S = {
  Container: styled.div`
    background-color: #fafafa;
    padding-bottom: 56px;
    @media screen and (min-width: 1200px) {
      padding-bottom: 106px;
    }
  `,
  TopContainer: styled.div`
    background-color: ${colors.white};
    border-bottom: 1px solid #ebeef2;
  `,
  TopContents: styled.div`
    padding: 50px 0 8px;
    margin: 0 24px;
    @media screen and (max-width: 320px) {
      padding: 40px 0 0;
    }
    @media screen and (min-width: 768px) {
      width: 720px;
      margin: 15px auto 0;
    }
  `,
  ContentsWrap: styled.div`
    position: relative;
    padding: 0 24px 42px;
    @media screen and (min-width: 768px) {
      width: 720px;
      margin: 0 auto;
      padding: 0 0 42px;
    }
    .toggle {
      cursor: pointer;
    }
  `,
  Icon: styled.div`
    position: relative;
    width: 56px;
    height: 56px;
    margin: 0 auto;
    border-radius: 50%;
    background-color: #1672f7;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -9px;
      margin-left: -13px;
    }
  `,
  TopTitle: styled.div`
    margin: 15px auto 0;
    font-size: 20px;
    text-align: center;
    /* border-bottom: 1px solid #ebeef2; */

    div {
      background: #f7f8fa;
      border-radius: 6px;
      font-size: 14px;
      padding: 24px;
      margin-top: 16px;
      p {
        padding-bottom: 16px;

        span {
          font-weight: bold;
        }
      }
    }
    span {
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
    }

    em {
      font-weight: 700;
    }

    @media screen and (min-width: 768px) {
      width: 720px;
      margin: 15px auto 0;
    }

    @media screen and (min-width: 1200px) {
      font-size: 24px;
    }
  `,
  TopBox: styled.div`
    text-align: center;
    border-radius: 6px;
    color: ${colors.gray33};
    background-color: ${colors.grayBg};
    padding: 24px 22px;
    margin-top: 17px;
    font-size: 14px;
    letter-spacing: -1px;
  `,
  TitleWrap: styled.div`
    overflow: hidden;
    padding-top: 24px;
    border-bottom: 1px solid #ebeef2;

    svg {
      float: right;
    }

    @media screen and (min-width: 768px) {
      padding-top: 52px;
    }
  `,
  BoxTitle: styled.strong`
    display: block;
    float: left;
    padding-bottom: 10px;
    font-size: 22px;
    font-weight: 700;
    line-height: 24px;

    em {
      color: #1672f7;
    }
  `,
  LevelInfo: styled.div`
    float: right;
    padding-top: 4px;
    font-size: 14px;
    cursor: pointer;
    color: ${colors.gray66};

    svg {
      float: left;
      margin-right: 5px;
    }
  `,
  LevelInfoBox: styled.div<{ visible: boolean }>`
    display: ${(props) => (props.visible ? "block" : "none")};
    position: absolute;
    top: 64px;
    right: 24px;
    width: 193px;
    height: 56px;
    padding: 10px;
    border-radius: 4px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    box-sizing: border-box;
    line-height: 18px;

    svg {
      position: absolute;
      top: -8px;
      right: 20px;
    }

    @media screen and (min-width: 768px) {
      top: 84px;
      right: 0;
    }
  `,
  CompanyList: styled.ul`
    margin-bottom: 66px;
  `,
  Card: styled.li`
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.06);
    background-color: ${colors.white};
    padding: 16px;
    margin: 16px 0;
    box-sizing: border-box;
  `,
  ListBox: styled.div`
    overflow: hidden;

    svg {
      float: left;
      @media screen and (max-width: 320px) {
        width: 48px;
        height: 48px;
      }
    }
  `,
  CompanyTitle: styled.p`
    overflow: hidden;
    float: left;
    width: 76%;
    margin-left: 10px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
      display: inline-block;
      margin-top: 4px;
      font-size: 14px;
      font-weight: 400;
      @media screen and (max-width: 320px) {
        margin-top: 4px;
        font-size: 12px;
      }
    }

    @media screen and (max-width: 320px) {
      margin: 5px 0 0 10px;
      font-size: 15px;
    }
  `,
  HorizontalBar: styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.lineDefault};
    margin: 16px 0;
  `,
  LinkCompany: styled.a`
    display: block;
    font-size: 14px;
    text-align: center;
    color: ${colors.pointBlue};
    @media screen and (max-width: 320px) {
      margin-top: 12px;
      font-size: 13px;
    }
  `,
  MoveInfo: styled.ul`
    padding: 21px 0 6px;

    li {
      overflow: hidden;
      margin-bottom: 15px;
    }
  `,
  MoveText: styled.p`
    float: left;
    width: 27%;
    padding-top: 3px;
    font-size: 16px;
    color: ${colors.gray88};
  `,
  MoveSubtext: styled.p`
    float: left;
    width: 73%;
    font-size: 16px;
    color: #333;
    line-height: 22px;
  `,
  MoveOption: styled.ul`
    padding-top: 24px;

    li {
      overflow: hidden;
      margin-bottom: 20px;
    }

    li:first-child {
      padding-bottom: 16px;
      border-bottom: 1px solid #ebeef2;
    }
  `,
  ServiceList: styled.div`
    overflow: hidden;
    clear: both;
  `,
  ServiceLink: styled.a`
    float: left;
    width: 25%;

    svg {
      display: block;
      margin: 17px auto 0;
    }
  `,
  ServiceText: styled.p`
    margin-top: 20px;
    font-size: 15px;
    text-align: center;
  `,
  Button: styled.button`
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    height: 56px;
    font-size: 18px;
    background: #1672f7;
    color: #fff;
    @media screen and (min-width: 1200px) {
      left: 0;
      right: 0;
      width: 720px;
      margin: 0 auto;
    }
  `,
  Box: styled.a`
    position: relative;
    display: flex;
    align-items: center;
    height: 104px;
    border: 1px solid ${colors.lineDefault};
    box-sizing: border-box;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: -1px;
    margin: 0 24px 30px;
    padding: 36px 24px;
    overflow: hidden;

    .left {
      float: left;
      margin-right: 24px;
    }

    .right {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }

    .title {
      font-weight: bold;
      color: ${colors.pointBlue};
    }

    .desc {
      color: ${colors.gray33};
    }
    @media screen and (min-width: 768px) {
      width: 720px;
      margin: 0 auto 30px;
    }
    @media screen and (min-width: 1200px) {
      width: 720px;
      margin: 0 auto 30px;
    }
  `,
  IFrame: styled.iframe`
    display: none;
  `
};

type ServiceType = "move" | "clean";

export default function Completed() {
  const moveForm = useSelector(moveSelector.getFormData);
  const cleanForm = useSelector(cleanSelector.getCleanForm);
  const getDbdbDeep = useSelector(formSelector.getDbdbDeep);
  const { start: moveStartAddr, end: moveEndAddr, type: moveAddrType } = useSelector(commonSelector.getJuso);
  const { moving_type } = useSelector(moveSelector.getFormData);
  const { type: cleanType } = useSelector(cleanSelector.getCleanForm);
  const { data, loading } = useSelector(commonSelector.getCompletedData);
  const { data: cleanData, loading: cleanLoading } = useSelector(cleanSelector.getCleanMatchData);
  const { data: moveData, loading: moveLoading } = useSelector(moveSelector.getSubmittedForm);
  const { user } = useSelector(getUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isDesktop = useMedia({
    minWidth: 1200
  });
  const [expand, setExpand] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const {
    query: { msg }
  } = useRouter();
  const params = new URLSearchParams(location.search);
  const inquiry_idx = params.get("inquiry_idx");
  const serviceType = params.get("service_type") === "clean" ? "clean" : "move";
  const lncd = getCookie("lncd");

  const togglePopup = () => {
    setShowPopup(!showPopup);
    history.push("/myrequest");
  };

  // ?????? ?????? ??? ????????? ??????
  useEffect(() => {
    return () => {
      dispatch(formActions.setDbdbdepp(false));
    };
  }, []);

  useEffect(() => {
    if (loading || cleanLoading || moveLoading) {
      setFirstLoading(false);
    }
  }, [loading, cleanLoading, moveLoading]);

  useEffect(() => {
    const isPartnerList = moveData?.match_list?.length || cleanData?.match_list?.length || data?.partners?.length;

    if ((moveData && moveData?.result !== "success") || (cleanData && cleanData?.result !== "success")) {
      return;
    }

    if (inquiry_idx && !isPartnerList) {
      dispatch(commonActions.fetchCompletedMoveIdx.request({ inquiry_idx }));
      return;
    }

    if (serviceType === "clean" && cleanType && !isPartnerList) {
      dispatch(cleanActions.fetchCleanAutoMatch.request());
      return;
    }

    if (serviceType === "move" && moving_type && !isPartnerList) {
      ReactPixel.fbq("track", "Purchase");
      dispatch(moveActions.fetchMoveData());
      return;
    }

    if (isPartnerList) {
      setFirstLoading(false);
    } else {
      history.replace("/notFound");
    }
  }, [dispatch, history, cleanType, moving_type, data, cleanData, moveData, inquiry_idx, serviceType]);

  const handleCleanConfirm = useCallback(() => {
    if (data !== null) {
      const pl = new Promise((resolve) => {
        dataLayer({
          event: "msg_complete",
          category: msg ? "?????????????????????_????????????" : "????????????_????????????",
          action: "??????????????????",
          label: "????????????",
          CD6: `${data.type === "????????????" ? "??????" : "?????????"}`
        });
        resolve(null);
      });
      pl.then(() => (window.location.href = `/clean`));
    }

    history.push("/clean");
  }, [msg, data, history]);

  const handleCleanCancel = useCallback(() => {
    if (data !== null) {
      const pl = new Promise((resolve) => {
        dataLayer({
          event: "msg_complete",
          category: msg ? "?????????????????????_????????????" : "????????????_????????????",
          action: "??????????????????",

          label: "?????????",
          CD6: `${data.type === "????????????" ? "??????" : "?????????"}`
        });
        resolve(null);
      });
      pl.then(() => togglePopup());
    }

    history.push("/");
  }, [msg, data]);

  const handleOnLoad = useCallback(() => {
    // ????????? ???????????? ???????????? ??????.
  }, [getDbdbDeep]);

  const compileLevelText = (level: Level) => {
    switch (level) {
      case "S":
        return "?????? ????????? ????????? ????????? ??????";
      case "NEW":
        return "???????????? ?????? ????????? ??????";
      default:
        return "?????? ??? ?????? ?????? ????????? ??????";
    }
  };

  const handleSubmit = () => {
    if (serviceType === "move") {
      setShowPopup(!showPopup);
    } else if (serviceType === "clean") {
      history.push("/myrequest");
    }
  };

  const companyListData = useMemo(() => {
    if (inquiry_idx && data) {
      return data?.partners;
    }

    if (serviceType === "move" && moveData) {
      return moveData?.match_list;
    } else if (serviceType === "clean" && cleanData) {
      return cleanData?.match_list;
    }
  }, [inquiry_idx, serviceType, data, cleanData, moveData]);

  const renderMoveUserInfo = ({ contact, movingDate, movingType, startAddr, endAddr, memo }: { contact: string; movingDate: string; movingType: string; startAddr: string; endAddr: string; memo: string }) => (
    <S.MoveInfo>
      <li>
        <S.MoveText>?????????</S.MoveText>
        <S.MoveSubtext>{contact}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>????????????</S.MoveText>
        <S.MoveSubtext>{movingDate}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>?????? ??????</S.MoveText>
        <S.MoveSubtext>{movingType}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>?????????</S.MoveText>
        <S.MoveSubtext>{startAddr}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>?????????</S.MoveText>
        <S.MoveSubtext>{endAddr}</S.MoveSubtext>
      </li>
      {memo !== "" ? (
        <li>
          <S.MoveText>????????????</S.MoveText>
          <S.MoveSubtext>{memo}</S.MoveSubtext>
        </li>
      ) : (
        <></>
      )}
    </S.MoveInfo>
  );

  const renderCleanUserInfo = ({ contact, cleaningDate, cleanAddr, memo }: { contact: string; cleaningDate: string; cleanAddr?: string; memo: string }) => (
    <S.MoveInfo>
      <li>
        <S.MoveText>?????????</S.MoveText>
        <S.MoveSubtext>{contact}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>????????????</S.MoveText>
        <S.MoveSubtext>{cleaningDate}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>?????????</S.MoveText>
        <S.MoveSubtext>{cleanAddr}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>????????????</S.MoveText>
        <S.MoveSubtext>{memo}</S.MoveSubtext>
      </li>
    </S.MoveInfo>
  );

  const renderUserInfo = () => {
    let userInfo;
    if (inquiry_idx && data !== null) {
      if (data.type.includes("??????")) {
        userInfo = {
          contact: `(${data?.name}) ${data?.phone_number}`,
          movingDate: `(${whatDay(data?.moving_date)}) ${dayjs(data?.moving_date).format("YYYY.MM.DD")}`,
          movingType: `${data?.type}`,
          startAddr: `${data?.start_address}???`,
          endAddr: `${data?.end_address}???`,
          memo: `${data?.memo}`
        };

        return renderMoveUserInfo({ ...userInfo });
      } else {
        userInfo = {
          contact: `(${data?.name}) ${data?.phone_number}`,
          cleaningDate: `(${whatDay(data?.moving_date)}) ${dayjs(data?.moving_date).format("YYYY.MM.DD")}`,
          cleanAddr: `${data?.start_address}???`,
          memo: `${data?.memo}`
        };

        return renderCleanUserInfo({ ...userInfo });
      }
    }

    if (serviceType === "move" && moving_type) {
      userInfo = {
        contact: `(${moveForm.name}) ${moveForm.phone1}-${moveForm.phone2}-${moveForm.phone3}`,
        movingDate: `(${whatDay(moveForm.moving_date)}) ${moveForm.moving_date}`,
        movingType: `${moveForm.moving_type}`,
        startAddr: moveAddrType.start === "road" ? `${moveStartAddr?.roadAddr}` : `${moveStartAddr?.jibunAddr}`,
        endAddr: moveAddrType.end === "road" ? `${moveEndAddr?.roadAddr}` : `${moveEndAddr?.jibunAddr}`,
        memo: `${moveForm.memo}`
      };

      return renderMoveUserInfo({ ...userInfo });
    } else if (serviceType === "clean" && cleanType && user !== null) {
      const { phone1, phone2, phone3 } = phoneSplit(user.tel);
      userInfo = {
        contact: `(${user?.name}) ${phone1}-${phone2}-${phone3}`,
        cleaningDate: cleanForm.date[0],
        cleanAddr: cleanForm.addressType === "road" ? cleanForm.address?.roadAddr : cleanForm.address?.jibunAddr,
        memo: cleanForm.cleanMemo
      };

      return renderCleanUserInfo({ ...userInfo });
    }
  };

  if (loading || firstLoading || cleanLoading || moveLoading) {
    return <SpinnerPopup title={`??? ????????? ?????? ${serviceType === "clean" ? "??????" : "??????"}?????? ?????? ???`} subtitle="(?????? 1??? ??????)" />;
  }
  return (
    <S.Container>
      {isDesktop && <MainHeader />}
      <S.TopContainer>
        <S.TopContents>
          <S.Icon>
            <Check fill={"#fff"} />
          </S.Icon>
          <S.TopTitle style={{ paddingBottom: serviceType !== "clean" ? 0 : "24px" }}>
            <em>{serviceType !== "clean" && !cleanType ? `????????????` : `????????????`}</em> ???????????? <br />
            <div>
              {serviceType !== "clean" && !cleanType ? (
                <>
                  <p>
                    3??? ?????? ?????? ????????? ?????? 24?????? ???<br />
                    <span>???????????? ?????? ??? ?????????</span>?????? ????????????????????????.
                  </p>
                  <span>
                    ???????????? 2?????? ?????? ????????? ????????? ???????????? <br />
                    ?????????/????????? ?????? ??????????????? ?????? ??????????????????!
                  </span>
                </>
              ) : (
                <span>
                  ???????????? 2?????? ?????? ????????? ????????? ????????????
                  <br />
                  ?????????/????????? ?????? ??????????????? ?????? ??????????????????!
                </span>
              )}
            </div>
          </S.TopTitle>
          {serviceType !== "clean" && !cleanType && <ProcessBar />}
        </S.TopContents>
      </S.TopContainer>
      <S.ContentsWrap>
        <S.TitleWrap>
          <S.BoxTitle>?????? ?????? ??????</S.BoxTitle>
        </S.TitleWrap>
        <S.CompanyList>
          {companyListData?.map((list, index, arr) => (
            <S.Card key={index}>
              <S.ListBox>
                {list.level === "NEW" && <NewLevelN />}
                {list.level === "S" && <NewLevelS />}
                {list.level !== "NEW" && list.level !== "S" && <NewLevelOther />}
                <S.CompanyTitle>
                  {list.adminname} <br />
                  <span>{compileLevelText(list.level)}</span>
                </S.CompanyTitle>
              </S.ListBox>
              <S.HorizontalBar />
              <S.LinkCompany
                onClick={() => {
                  let type = "?????????";
                  if (data) {
                    type = data.type === "????????????" ? "??????" : "?????????";
                  } else if (moveForm && moveForm.moving_type) {
                    type = moveForm.moving_type;
                  }
                  dataLayer({
                    event: msg !== "true" ? "complete" : "msg_complete",
                    category: msg !== "true" ? "????????????" : "?????????????????????_????????????",
                    action: "????????????_??????",
                    label: `${arr.length}_${index + 1}`,
                    CD6: type
                  });
                  /* ????????? ???????????? ???????????? ????????? */
                  dispatch(partnerActions.detailReset());
                  history.push(`/requests/completed/${list.adminid}`);
                }}>
                {`?????? ?????? ????????? ?????? (?????? ${list.feedback_cnt}???)`}
              </S.LinkCompany>
            </S.Card>
          ))}
        </S.CompanyList>
        <S.TitleWrap onClick={() => setExpand(!expand)} className="toggle">
          <S.BoxTitle>??? ?????? ??????</S.BoxTitle>
          {expand ? <Up style={{ marginTop: 6 }} /> : <Down style={{ marginTop: 6 }} />}
        </S.TitleWrap>
        <Collapse expand={expand}>{renderUserInfo()}</Collapse>
      </S.ContentsWrap>
      {serviceType !== "clean" && !cleanType && (
        <S.Box href={"/clean"}>
          <img className="left" src={require("assets/images/components/Completed/home.svg")} alt="?????????,????????????,???????????????,???????????????,????????????????????????,????????????,??????????????????,????????????,????????????,????????????,???????????????,????????????,??????????????????,???????????????????????????,????????????" />
          <div>
            <h3 className="title">
              {data?.end_address
                .split(" ")
                .slice(0, -1)
                .pop()}
            </h3>
            <p className="desc">????????? ???????????? ?????? ??????</p>
          </div>
          <img className="right" src={require("assets/images/components/Completed/right.svg")} alt="?????????,????????????,???????????????,???????????????,????????????????????????,????????????,??????????????????,????????????,????????????,????????????,???????????????,????????????,??????????????????,???????????????????????????,????????????" />
        </S.Box>
      )}
      <S.Button onClick={() => handleSubmit()}>?????? ?????? ????????????</S.Button>
      {serviceType === "move" && <NewModal visible={showPopup} title={"???????????? ??????"} content={"??????????????? ????????????????"} confirmText={"?????? ??????"} cancelText={"?????????"} confirmClick={handleCleanConfirm} cancelClick={handleCleanCancel} />}
      {getDbdbDeep && (
        <S.IFrame
          src={`https://dbdbdeep.com/site19/gate/da24/join.php?lncd=${lncd}&name=${encodeURIComponent(maskingName(moveForm.name))}&tel=${encodeURIComponent(moveForm.phone1 + "-" + maskingPhone(moveForm.phone2) + "-" + maskingPhone(moveForm.phone3))}&dt=${encodeURIComponent(
            moveForm.moving_date
          )}`}
          onLoad={handleOnLoad}
        />
      )}
    </S.Container>
  );
}
