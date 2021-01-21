import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import * as colors from 'styles/colors'

const skeletonAnimation = keyframes`
  0% {
    background-position: 100% 100%;
  }
  50% {
    background-position: 50% 100%;
  }
`

const Container = styled.span<{animated: boolean}>`
  background-color: ${colors.lineDefault};
  display: inline-block;

  ${(props) => props.animated && css`
    background-image: linear-gradient(90deg, ${colors.lineDefault} 0%, ${colors.lineDeco} 40%, ${colors.lineDefault} 80%, ${colors.skeletonBg} 100%);
    background-size: 400% 100%;
    animation: ${skeletonAnimation} 1.3s linear infinite;
  `}
`

interface Props extends React.HTMLAttributes<HTMLElement> {
  animated?: boolean;
}

export default function Skeleton(props: Props) {
  const {
    animated = false,
    ...restProps
  } = props

  return (<Container {...restProps} animated={animated}/>)
}
