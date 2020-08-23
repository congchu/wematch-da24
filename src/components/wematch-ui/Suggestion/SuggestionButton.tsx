import * as React from 'react'
import styled, { css } from 'styled-components'
import { white, gray88 } from 'styles/colors'
import { resetButton } from 'styles/mixins'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  onClick?: () => void;
  highlight?: boolean;
}

const S = {
  Button: styled.button<{highlight: boolean}>`
    ${resetButton};
    height: 56px;
    font-size: 16px;
    width: 100%;
    border-radius: 28px;
    line-height: 24px;
    padding: 14px 28px 18px;
    box-sizing: border-box;
    letter-spacing: -1px;
    text-align: center;
    color: ${gray88};
    font-weight: 500;
    cursor: pointer;
    :hover,
    :active {
      background-image: linear-gradient(to left, #2ccbcb, #1689f7);
      color: ${white};
    }
    ${props =>
    props.highlight && css`
      background-image: linear-gradient(to left, #2ccbcb, #1689f7);
      color: ${white};
    `
}
  `
}

export function SuggestionButton(props: Props) {
  const {
    onClick,
    children,
    highlight = false,
    ...restProps
  } = props

  return (
    <S.Button onClick={onClick} {...restProps} highlight={highlight}>{children}</S.Button>
  )
}
