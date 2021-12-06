import * as React from "react";
import styled from "styled-components";
import { resetButton, resetInput } from "styles/mixins";
import { BaseProps } from "./types";

interface Props extends BaseProps, React.HTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const S = {
  Container: styled.button`
    ${resetButton}
    height: 100%;
    width: 100%;
    position: relative;
    border: 1px solid black;
  `,
  Input: styled.input`
    ${resetInput}
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  `
};

export function BaseFileUploader(props: Props) {
  const { accept, multiple, text, onChange, className } = props;

  return (
    <S.Container className={className}>
      {text}
      <S.Input type="file" accept={accept} multiple={multiple} onChange={onChange} />
    </S.Container>
  );
}
