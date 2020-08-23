import * as React from 'react'
import styled from 'styled-components'
import { lineDeco } from 'styles/colors'

interface Props {
  max?: number;
  value?: number;
}

const S = {
  Container: styled.div`
    background-color: ${lineDeco};
  `,
  Body: styled.div<{width: number}>`
    width: ${({ width }) => width}%;
    transition: 0.3s;
    height: 8px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-image: linear-gradient(89deg, #2ccbcb, #1689f7);
  `
}

export function Progress(props: Props) {
  const {
    max,
    value,
    ...restProps
  } = props

  let width = 0
  if (max && value) {
    width = value / max * 100
  }

  return (
    <S.Container {...restProps}>
      <S.Body width={width} />
    </S.Container>
  )
}
