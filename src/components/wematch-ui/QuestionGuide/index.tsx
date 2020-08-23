import * as React from 'react'
import styled, { css } from 'styled-components'
import { gray33, gray88, pointBlue } from 'styles/colors'

interface Props extends React.HTMLAttributes<HTMLElement> {
  text: string;
  description?: string;
  optional?: boolean;
}

const S = {
  Container: styled.div`
    padding: 40px 0 56px;
    box-sizing: border-box;
    position: relative;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -1px;
  `,
  H2: styled.h2<{optional: boolean}>`
    white-space: pre-line;
    word-break: keep-all;
    font-size: 22px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 32px;
    letter-spacing: -1px;
    color: ${gray33};
    margin: 0;
    ${props =>
    props.optional && css`
        &:after {
          content: '(선택)';
          font-size: 15px;
          font-weight: 500;
          color: ${gray88};
          margin-left: 2px;
        }
      `
}
  `,
  Span: styled.span`
  position: absolute;
  bottom: 20px;
  color: ${pointBlue};
  font-size: 14px;
  font-weight: normal;
  white-space: pre-line;
  word-break: keep-all;
`
}

export function QuestionGuide(props: Props) {
  const {
    text,
    optional = false,
    description,
    ...restProps
  } = props
  return (
    <S.Container {...restProps}>
      <S.H2 optional={optional}>
        {text}
      </S.H2>
      {description && <S.Span>{description}</S.Span>}
    </S.Container>

  )
}
