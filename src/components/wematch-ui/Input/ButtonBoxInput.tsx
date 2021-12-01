import * as React from "react";
import styled, { css } from "styled-components";
import { lineDefault, grayBg, pointBlue, error } from "styles/colors";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  onClick?: () => void;
  buttonText: string;
  state?: "error";
  disabled?: boolean;
  buttonState?: "disabled" | "enabled" | "error";
  inputRef?: React.Ref<any>; // eslint-disable-line
}

const S = {
  Container: styled.div`
    position: relative;
  `,
  Button: styled.button<{ buttonState: string }>`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    position: absolute;
    width: 77px;
    padding: 17px 0 17px 0;
    line-height: 20px;
    top: 1px;
    right: 1px;
    color: white;
    ${(props) =>
      (props.buttonState === "disabled" &&
        css`
          background-color: ${lineDefault};
          cursor: default;
        `) ||
      (props.buttonState === "enabled" &&
        css`
          background-color: ${pointBlue};
        `) ||
      (props.buttonState === "error" &&
        css`
          background-color: ${error};
        `)}
  `,
  Input: styled.input<{ state?: "error" }>`
    box-sizing: border-box;
    height: 56px;
    font-size: 18px;
    letter-spacing: -1px;
    color: #333;
    width: 100%;
    border: solid 1px ${({ state }) => (state === "error" && `${error}`) || "#a3aab3"};
    background-color: white;
    padding: 13px 90px 16px 16px;
    &:placeholder {
      color: #888;
    }
    &:focus {
      border: solid 1px ${({ state }) => (state === "error" && `${error}`) || `${pointBlue}`};
      box-shadow: 0 4px 10px 4px ${(props) => (props.state === "error" ? "rgba(236, 72, 92, 0.1)" : "rgba(45, 128, 247, 0.24)")};
      background-color: white;
    }
    &:disabled {
      background-color: ${grayBg};
    }
  `
};

export function ButtonBoxInput(props: Props) {
  const { type = "text", onClick, buttonText, buttonState = "disabled", disabled = false, state, ...restProps } = props;

  return (
    <S.Container>
      <S.Input type={type} {...restProps} state={state} disabled={disabled} />
      <S.Button onClick={onClick} buttonState={buttonState} type="button" disabled={buttonState !== "enabled"}>
        {buttonText}
      </S.Button>
    </S.Container>
  );
}
