import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import queryString from "query-string";
import { RouteComponentProps } from "react-router";
import useScrollDirection from "hooks/useScrollDirection";

import MainHeader from "components/common/MainHeader";
import MoveForm from "pages/home/components/MoveForm";
import MainBanner from "pages/home/components/MainBanner";
import Review from "pages/home/components/Review";
import PartnerBanner from "pages/home/components/PartnerBanner";
import MainFooter from "components/common/MainFooter";
import BottomNav from "components/common/BottomNav";

import * as colors from "styles/colors";

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
  `
};

const Home: React.FC<RouteComponentProps> = ({ location }) => {
  const [cookies, setCookie] = useCookies(["0dj38gepoekf98234aplyadmin"]);
  const HomeRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useScrollDirection();

  useEffect(() => {
    const mda = queryString.parse(location.search).mda || "";
    setCookie("0dj38gepoekf98234aplyadmin", `agentid=${mda}`);
  }, []);

  return (
    <S.Container ref={HomeRef}>
      <S.Group ref={HomeRef}>
        <MainHeader isFixed={isFixed} />
        <MainBanner />
      </S.Group>
      <S.Wrapper>
        <MoveForm headerRef={HomeRef} isFixed={isFixed} setIsFixed={setIsFixed} />
        <Review />
        <PartnerBanner />
      </S.Wrapper>
      <MainFooter />
      <BottomNav />
    </S.Container>
  );
};

export default Home;
