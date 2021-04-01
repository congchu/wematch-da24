import React, { useCallback } from "react";
import Styled, { css } from "styled-components";

import * as colors from "styles/colors";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  /** 테마 정의 */
  theme: "default" | "primary";
  /** 비활성화 여부 */
  disabled?: boolean;
  border?: boolean;
  bold?: boolean;
  loading?: boolean;
}

const S = {
  StyledButton: Styled.button<{ border: boolean; bold: boolean }>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 56px;
        font-size: 16px;
        line-height: 23px;
        letter-spacing: -0.03em;
        font-weight: ${(props) => (props.bold ? "bold" : "400")};
        text-align: center;
        cursor: pointer;
        
        ${({ theme }) =>
          theme === "default" &&
          css`
            background-color: ${colors.white};
            color: ${colors.black};
          `}
        
        ${({ theme }) =>
          theme === "primary" &&
          css`
            background-color: ${colors.pointBlue};
            color: ${colors.white};
          `}
        
        ${({ border }) =>
          border &&
          css`
            border-radius: 8px;
          `}
        
        &:disabled {
            background-color: ${colors.lineDefault};
            cursor: not-allowed;
        }
    `,
  Icon: Styled.div<{ theme: "default" | "primary" }>`
    width: 28px;
    height: 28px;
    margin-right: 8px;
    animation: rotate 1s linear infinite;
    background-image: url(${({ theme }) =>
      require(theme === "default"
        ? `assets/images/loading-b.svg`
        : `assets/images/loading-w.svg`)});
  
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
  `,
};

const Button: React.FC<Props> = (props) => {
  const {
    theme = "default",
    disabled = false,
    border = false,
    bold = false,
    children,
    loading = false,
    onClick,
    ...restProps
  } = props;

  return (
    <S.StyledButton
      theme={theme}
      disabled={disabled}
      border={border}
      bold={bold}
      onClick={
        !loading
          ? onClick
          : (e) => {
              e.preventDefault();
            }
      }
      {...restProps}
    >
      {loading && <S.Icon theme={theme} />}
      {children}
    </S.StyledButton>
  );
};

export default Button;
