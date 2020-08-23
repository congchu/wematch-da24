import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
`

export function Collapse(props: React.HTMLAttributes<Element>) {
  const {
    children,
    ...restProps
  } = props

  return (
    <Container {...restProps}>{ children }</Container>
  )
}
