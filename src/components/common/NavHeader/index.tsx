import * as React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import PrevIcon from "components/wematch-ui/Icon/generated/Previous";

import * as colors from "styles/colors";

interface Props {
  title?: string;
  onPreviousButtonClick?: () => void;
}

const S = {
  Header: styled.header`
    z-index: 10;
    background: ${colors.white};
    height: 56px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    strong {
      display: block;
      padding-top: 20px;
      font-size: 16px;
      text-align: center;
      color: ${colors.black};
    }
  `,
  PreviousButton: styled.button`
    position: absolute;
    top: 16px;
    left: 24px;
    cursor: pointer;
  `
};

export default function NavHeader({ title, onPreviousButtonClick }: Props) {
  const history = useHistory();

  const handlePreviousClick = () => {
    history.goBack();
  };

  return (
    <S.Header>
      <S.PreviousButton onClick={onPreviousButtonClick || handlePreviousClick}>
        <PrevIcon size={24} />
      </S.PreviousButton>
      {title && <strong>{title}</strong>}
    </S.Header>
  );
}
