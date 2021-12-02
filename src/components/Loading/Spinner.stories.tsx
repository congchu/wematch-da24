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
