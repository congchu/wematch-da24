import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

import GlobalStyled from "styles/global";
import SpinnerPopup from "./SpinnerPopup";

export default {
  title: "Loading|Spinner",
  component: Spinner,
  parameters: {
    docs: {
      inlineStories: false
    }
  }
};

export const spinner = () => {
  return (
    <>
      <GlobalStyled />
      <Container className="flex">
        <div className="container">
          <Spinner color="main" />
        </div>
        <div className="container">
          <Spinner color="white" />
        </div>
      </Container>
    </>
  );
};

export const spinnerPopup = () => {
  return (
    <>
      <GlobalStyled />
      <SpinnerPopup title="내 조건에 맞는 이사업체 찾는 중..." subtitle="(최대 1분 소요)"/>
    </>
  );
};
const Container = styled.div`
  display: flex;
  .container {
    padding: 30px;
  }
  .container:nth-child(1) {
  }
  .container:nth-child(2) {
    background-color: #1672f7;
  }
`;
spinner.story = {
  name: "Default"
};
