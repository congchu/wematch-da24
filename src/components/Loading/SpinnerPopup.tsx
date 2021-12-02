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
      <Spinner color="main" size="48px" />
      <div className="color-main1 font-body weight-bold pt-16 ">{title}</div>
      <div className="fong-bold color-33">{subtitle}</div>
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

export default SpinnerPopup;
