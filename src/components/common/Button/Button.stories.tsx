import React from "react";
import Button from "./index";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import GlobalStyled from "styles/global";

export default {
  title: "ReviewItem|Button",
  component: Button,
  decorators: [withKnobs]
};

export const button = () => {
  const theme = select("theme", ["default", "primary"], "primary");
  const disabled = boolean("disabled", false);
  const buttonText = text("text", "견적 신청하기");

  return (
    <>
      <GlobalStyled />
      <Button theme={theme} disabled={disabled} onClick={action("onClick")}>
        {buttonText}
      </Button>
    </>
  );
};

button.story = {
  name: "Default"
};

export const primaryButton = () => {
  return (
    <>
      <GlobalStyled />
      <Button theme="primary" onClick={action("onClick")}>
        버튼
      </Button>
    </>
  );
};

export const disabledButton = () => {
  return (
    <>
      <GlobalStyled />
      <Button theme="primary" disabled={true} onClick={action("onClick")}>
        비활성화 버튼
      </Button>
    </>
  );
};
