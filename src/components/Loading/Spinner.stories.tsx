import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

import GlobalStyled from "styles/global";

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
    <Container>
      <GlobalStyled />
      <Spinner />
    </Container>
  );
};

const Container = styled.div`
  widht: 100%;
  height: 100vh;
  padding: 20px;
  background-color: #1672f7;
`;
spinner.story = {
  name: "Default"
};
