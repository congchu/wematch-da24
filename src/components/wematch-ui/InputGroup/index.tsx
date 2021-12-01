import * as React from "react";
import styled from "styled-components";

interface Props {
  label?: string;
  marginTop?: number;
  state?: "success" | "error";
  guide?: string;
  children: React.ReactNode;
}

const S = {
  Container: styled.div<{ marginTop: number }>`
    position: relative;
    margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)}px;
  `,
  Label: styled.label`
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -1px;
    color: #333;
    margin-bottom: 8px;
  `,
  GuideMessage: styled.p<{ state?: "success" | "error" }>`
    position: absolute;
    height: 20px;
    bottom: -28px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -1px;
    color: ${({ state }) => (state === "error" && "#ec485c") || (state === "success" && "#1672f7") || "#888"};
  `
};

export function InputGroup(props: Props) {
  const { label = "", marginTop = 0, state, guide, children } = props;
  return (
    <S.Container marginTop={marginTop}>
      {label && <S.Label>{label}</S.Label>}
      {children}
      {guide && <S.GuideMessage state={state}>{guide}</S.GuideMessage>}
    </S.Container>
  );
}
