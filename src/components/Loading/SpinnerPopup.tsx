import React, { useEffect } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

type Props = {
  title: string;
  subtitle: string;
};
const SpinnerPopup = ({ title, subtitle }: Props) => {
  return (
    <Container>
      <Spinner color="main" size="medium" />
      <div className="color-main1 font-body weight-bold pt-16 flex relative">
        <div>{title}</div>
        <AnimatedDots />
      </div>

      <div className="fong-bold color-33 flex">
        <div>{subtitle}</div>
      </div>
      <div className="pb-40"/>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AnimatedDots = styled.div`
&:after {
  content: ' .';
  animation: dots 1.2s steps(5, end) infinite;
}

@keyframes dots {
  0%, 20% {
    color: white;
    text-shadow:
      .25em 0 0 white,
      .5em 0 0 white;
    }
  40% {
    color: #1672f7;
    text-shadow:
      .25em 0 0 white,
      .5em 0 0 white;}
  60% {
    text-shadow:
      .25em 0 0 #1672f7,
      .5em 0 0 white;
    }
  80%, 100% {
    text-shadow:
      .25em 0 0 #1672f7,
      .5em 0 0 #1672f7;
    }

`;

export default SpinnerPopup;
