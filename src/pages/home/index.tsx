import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import queryString from "query-string";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";
import useScrollDirection from "hooks/useScrollDirection";

import MainHeader from "components/common/MainHeader";
import MainFooter from "components/common/MainFooter";
import BottomNav from "components/common/BottomNav";
import ResponsiveSkeleton from "components/common/Skeleton/responsiveSkeleton";

import MainVisual from "pages/home/components/MainVisual";
import Review from "pages/home/components/Review";
import MoveForm from "pages/home/components/MoveForm";
import PartnerBanner from "pages/home/components/PartnerBanner";
import * as colors from "styles/colors";

import * as formSelectors from "store/form/selectors";

import { LOCAL_ENV } from "constants/env";

const S = {
  Container: styled.div``,
  Group: styled.div``,
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    margin-top: -75px;
    z-index: 1;
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    background: ${colors.white};
    //box-shadow: 0px -4px 30px rgba(0, 0, 0, 0.2);

    @media (min-width: 1200px) {
      max-width: 768px;
      left: 50%;
      transform: translate(-50%, 0);
      margin-top: -36px;

      box-shadow: none;
    }
  `,
  CallBtn: styled.a<{ isShow: boolean }>`
    display: ${(props) => (props.isShow ? "inline-block" : "none")};
    position: fixed;
    bottom: 60px;
    right: 24px;
    width: 74px;
    height: 74px;
    border-radius: 62px;
    background-color: #1672f7;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 2;
    img {
      margin-top: 10px;
    }
    @media screen and (min-width: 768px) {
      display: none;
    }

    p {
      color: #ffffff;
      font-weight: bold;
      font-size: 12px;
      line-height: 22px;
    }
  `,
};

const Home: React.FC<RouteComponentProps> = ({ location }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "0dj38gepoekf98234aplyadmin",
  ]);
  const HomeRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useScrollDirection();
  const [loading, setLoading] = useState(false);
  // const [callDisabled, setCallDisabled] = useState(false)

  const getSubmittedForm = useSelector(formSelectors.getSubmittedForm);

  useEffect(() => {
    const mda = queryString.parse(location.search).mda || "";
    const options = LOCAL_ENV === "dev" ? {} : { domain: ".wematch.com" };
    if (mda) {
      setCookie("0dj38gepoekf98234aplyadmin", `agentid=${mda}`, options);
    }

    // if (9 <= Number(dayjs().format('H')) && 18 >= Number(dayjs().format('H'))) {
    //     setCallDisabled(true);
    // }
  }, []);

  // useEffect(() => {
  //     if (cookies.report && getSubmittedForm.report) {
  //         removeCookie('report')
  //     }
  // }, [getSubmittedForm.loading])

  // memory leak 경고 메시지 해결을 위해 한번 감싸는 용도
  // useEffect(() => {
  //     setLoading(getSubmittedForm.loading)
  //     return () => setLoading(false)
  // }, [getSubmittedForm.loading])

  // if (loading) {
  //     return <ResponsiveSkeleton />
  // }

  return (
    <>
      <S.Container ref={HomeRef}>
        <S.Group ref={HomeRef}>
          <MainHeader isFixed={isFixed} />
          <MainVisual />
        </S.Group>
        <S.Wrapper>
          <MoveForm
            headerRef={HomeRef}
            isFixed={isFixed}
            setIsFixed={setIsFixed}
          />
          <Review />
          <PartnerBanner />
        </S.Wrapper>
        <MainFooter />
        <BottomNav />
        <S.CallBtn href="tel:1522-2483" isShow={false}>
          <img src={require("assets/images/call.svg")} />
          <p>전화신청</p>
        </S.CallBtn>
      </S.Container>
    </>
  );
};

export default Home;
