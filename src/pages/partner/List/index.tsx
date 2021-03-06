import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use-media";
import { isEmpty } from "lodash";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import MainHeader from "components/common/MainHeader";
import TopGnb from "components/TopGnb";
import EmptyPage from "components/EmptyPage";
import { KakaoIcon, ChatArrow } from "components/Icon";

import SetType from "components/SetType";
import PartnerItem from "./item";

import * as colors from "styles/colors";
import * as values from "constants/values";

import * as partnerActions from "store/partner/actions";
import * as partnerSelector from "store/partner/selectors";
import * as formSelector from "store/form/selectors";
import * as commonSelector from "store/common/selectors";
import { dataLayer } from "lib/dataLayerUtil";
import { IPartnerList } from "types/partner";
import NewModal from "components/NewModalTemplate";

const S = {
  Container: styled.div`
    height: 100%;
  `,
  WrapItem: styled.div`
    margin-top: 105px;
    @media screen and (min-width: 768px) {
      width: 608px;
      margin: 0 auto;
      margin-top: 130px;
    }
    @media screen and (min-width: 1200px) {
      width: 720px;
      margin-top: 130px;
    }
  `,
  PartnerItemContainer: styled.div<{ hasMore: boolean }>`
    a {
      ${(props) =>
        !props.hasMore &&
        css`
          &:nth-last-child(1) {
            padding-bottom: 160px;
          }
        `}
    }
    @media screen and (min-width: 380px) {
    }
  `,
  BtnKakao: styled.a`
    display: inline-block;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 62px;
    height: 62px;
    border-radius: 62px;
    border: 1px solid #f6df0d;
    background-color: #ffe500;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 2;
    svg {
      margin-top: 17px;
    }
    @media screen and (min-width: 768px) {
      right: 10%;
      bottom: 48px;
    }
    @media screen and (min-width: 1200px) {
      bottom: 72px;
    }
  `,
  ChatText: styled.a`
    display: inline-block;
    position: fixed;
    bottom: 110px;
    right: 24px;
    padding: 10px 18px 8px;
    border: 1px solid ${colors.pointBlue};
    border-radius: 100px;
    font-size: 15px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
    background: ${colors.white};
    color: ${colors.pointBlue};
    letter-spacing: -0.5px;
    svg {
      position: absolute;
      bottom: -11px;
      right: 19px;
    }
    @media screen and (min-width: 768px) {
      right: 10%;
      bottom: 134px;
    }
    @media screen and (min-width: 1200px) {
      bottom: 158px;
    }
  `,
  More: styled.div`
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: ${colors.pointBlue};
    padding: 15px;
  `
};

{
  /* ????????? ????????? ??????*/
}
function MoreLoading() {
  return <S.More>?????????..</S.More>;
}

const PartnerList = () => {
  const isDesktop = useMedia({
    minWidth: 1200
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const getPartnerList = useSelector(partnerSelector.getPartnerList);
  const getPartnerPick = useSelector(partnerSelector.getPartnerPick);
  const getFormData = useSelector(formSelector.getFormData);
  const getMoveIdxData = useSelector(commonSelector.getMoveIdxData);

  const [page, setPage] = useState<number>(2);
  const [visible, setVisible] = useState(false);

  const fetchMoreListItems = () => {
    if (getMoveIdxData.idx && getPartnerList.hasMore) {
      setPage(page + 1);
      dispatch(
        partnerActions.fetchPartnerMoreListAsync.request({
          page: page,
          size: values.DEFAULT_PARTNER_LIST_SIZE,
          idx: getMoveIdxData.idx
        })
      );
      setTimeout(() => {
        // @ts-ignore
        setIsFetching(false);
      }, 3000);
    }
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  const handleLinkKakao = () => {
    window.open("https://api.happytalk.io/api/kakao/chat_open?yid=%40%EC%9C%84%EB%A7%A4%EC%B9%98&site_id=4000001315&category_id=111561&division_id=111564", "_blank");
  };

  useEffect(() => {
    if (getFormData?.moving_date.length === 0) {
      setVisible(true);
    }
    if (!getMoveIdxData.idx) {
      setVisible(true);
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (getMoveIdxData.idx && getPartnerList.data.length === 0 && !getMoveIdxData.loading) {
      dispatch(
        partnerActions.fetchPartnerListAsync.request({
          page: values.DEFAULT_PAGE,
          size: values.DEFAULT_PARTNER_LIST_SIZE,
          idx: getMoveIdxData.idx
        })
      );
    }
  }, [dispatch]);

  const renderList = () => {
    if (getPartnerList.loading) {
      let arr = new Array(10).fill(undefined).map((val, idx) => idx);
      return (
        <S.PartnerItemContainer hasMore={getPartnerList.hasMore}>
          {arr.map((index: number) => {
            return <PartnerItem key={index} />;
          })}
        </S.PartnerItemContainer>
      );
    }

    if (isEmpty(getPartnerList.data)) {
      return <EmptyPage title="???????????????" subTitle="??????????????? ????????? ????????? ????????????." />;
    }

    return (
      <>
        <S.PartnerItemContainer hasMore={getPartnerList.hasMore}>
          {getPartnerList.data.map((list: IPartnerList, index: number) => {
            return (
              <PartnerItem
                list={list}
                onClick={() => {
                  history.push(`/partner/detail/${list.adminid}`);
                  dataLayer({ event: "partner_select", label: `${getPartnerList.data.length}_${index + 1}`, CD7: `${list.level}??????`, CD8: `${list.title}` });
                }}
              />
            );
          })}
        </S.PartnerItemContainer>
        <S.ChatText onClick={handleLinkKakao} id="dsl_booking_list_katalk2">
          {getPartnerList.data[0].status === "unavailable" ? "??????????????? ???????????????????" : "????????? ????????????????"}
          <ChatArrow width={20} height={12} />
        </S.ChatText>
        <S.BtnKakao onClick={handleLinkKakao} id="dsl_booking_list_katalk">
          <KakaoIcon width={35} height={34} />
        </S.BtnKakao>
      </>
    );
  };

  return (
    <S.Container>
      {isDesktop ? <MainHeader /> : <TopGnb title="?????? ?????? ??????" count={getPartnerPick.data.length} onPrevious={() => history.goBack()} showTruck={true} />}
      <SetType count={getPartnerPick.data.length} formData={getFormData} />
      <>
        <S.WrapItem id="dsl_booking_list_partner">{renderList()}</S.WrapItem>
        {isFetching && getPartnerList.hasMore && <MoreLoading />}
      </>
      <NewModal visible={visible} title={"?????? ??????"} content={"?????? ???????????? ????????? ?????????????????????. ?????? ????????? ?????????."} confirmClick={() => history.push("/")} confirmText={"????????? ??????"} />
    </S.Container>
  );
};

export default PartnerList;
