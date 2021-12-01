import * as React from "react";
import styled from "styled-components";
import { pointBlue, gray33, lineDefault } from "styles/colors";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  checked?: boolean;
  gridSize?: "large" | "small";
}

const S = {
  Container: styled.label<{ checked: boolean; gridSize: "large" | "small" }>`
    max-width: 156px;
    max-width: ${(props) => (props.gridSize === "small" ? "105px" : "156px")};
    width: ${(props) => (props.gridSize === "small" ? "33.4%" : "50%")};
    height: 72px;
    box-sizing: border-box;
    display: inline-block;
    margin-top: -1px;
    margin-left: -1px;
    vertical-align: top;
    border: 1px solid ${({ checked }) => (checked ? pointBlue : lineDefault)};
    position: relative;
    box-shadow: ${({ checked }) => (checked ? "0 4px 10px 4px rgba(45, 128, 247, 0.24)" : "none")};
    &:after {
      position: absolute;
      display: ${(props) => (props.checked ? "block" : "none")};
      top: -1px;
      right: -1px;
      width: 1px;
      height: 72px;
      content: "";
      z-index: 10;
      background-color: ${pointBlue};
    }
    &:before {
      position: absolute;
      display: ${(props) => (props.checked ? "block" : "none")};
      bottom: -1px;
      left: -1px;
      max-width: 156px;
      border-right: 1px solid ${pointBlue};
      width: 100%;
      height: 1px;
      content: "";
      z-index: 10;
      background-color: ${pointBlue};
    }
  `,
  LabelText: styled.p<{ checked: boolean; gridSize: "large" | "small" }>`
    display: flex;
    word-break: keep-all;
    justify-content: center;
    font-size: ${(props) => (props.gridSize === "small" ? "14px" : "16px")};
    font-weight: ${(props) => (props.checked ? "bold" : "normal")};
    letter-spacing: -1px;
    line-height: 18px;
    padding: 16px 0;
    color: ${(props) => (props.checked ? pointBlue : gray33)};
    text-align: center;
    user-select: none;
    height: 100%;
    align-items: center;
    box-sizing: border-box;
  `,
  HiddenCheckbox: styled.input`
    display: none;
  `
};

export function GridCheckbox(props: Props) {
  const { checked = false, className, label, gridSize = "large", ...restProps } = props;

  return (
    <S.Container className={className} checked={checked} gridSize={gridSize}>
      {label && (
        <S.LabelText checked={checked} gridSize={gridSize}>
          {label}
        </S.LabelText>
      )}
      <S.HiddenCheckbox type="checkbox" {...restProps} />
    </S.Container>
  );
}
