import React, { useState } from "react";
import Select from "./index";
import Styled from "styled-components";
import { withKnobs } from "@storybook/addon-knobs";

import GlobalStyled from "styles/global";
import Button from "components/common/Button";

export default {
  title: "ReviewItem|Select",
  component: Select,
  decorators: [withKnobs],
  parameters: {
    docs: {
      inlineStories: false
    }
  }
};

const Container = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    
    @media (min-width: 1200px) {
        button {
          width: 350px;
        }    
    }
`;

function SelectSample() {
  const [visible, setVisible] = useState<boolean>(false);
  const toggle = () => setVisible(!visible);

  const items = [
    { key: "지하", value: "지하층" },
    { key: "1", value: "1층" },
    { key: "2", value: "2층" },
    { key: "3", value: "3층" },
    { key: "4", value: "4층" },
    { key: "5", value: "5층" },
    { key: "6", value: "6층" },
    { key: "7", value: "7층" },
    { key: "8", value: "8층" },
    { key: "9", value: "9층" },
    { key: "10", value: "10층" },
    { key: "11", value: "11층" },
    { key: "12", value: "12층" },
    { key: "13", value: "13층" },
    { key: "14", value: "14층" },
    { key: "15", value: "15층" }
  ];

  return (
    <Container>
      <Button theme="primary" onClick={toggle}>
        층수 선택
      </Button>
      <Select visible={visible} headerTitle="층수 선택" onClose={toggle} onOverlayClose={toggle} items={items} onSelect={(selected) => alert(selected)} />
    </Container>
  );
}

export const button = () => {
  return (
    <>
      <GlobalStyled />
      <SelectSample />
    </>
  );
};

button.story = {
  name: "Default"
};
