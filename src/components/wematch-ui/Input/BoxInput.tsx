import * as React from 'react'
import styled from 'styled-components'
import { pointBlue, error } from 'styles/colors'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<any>; // eslint-disable-line
  name?: string;
  state?: 'error';
}

const S = {
  Container: styled.div`
    position: relative;
  `,
  Input: styled.input<{state?: 'error'}>`
    box-sizing: border-box;
    height: 56px;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -1px;
    color: #333;
    width: 100%;
    border: solid 1px ${({ state }) =>
    state === 'error' && `${error}` ||
      '#a3aab3'
};
    background-color: white;
    padding: 13px 16px 16px;
    &:placeholder {
      color: #888;
    }
    &:focus {
      box-shadow: 0 4px 10px 4px ${props => props.state === 'error' ? 'rgba(236, 72, 92, 0.1)' : 'rgba(45, 128, 247, 0.24)'};
      border: solid 1px ${({ state }) =>
    state === 'error'  && `${error}` || `${pointBlue}`
};
      background-color: white;
    }
    `
}

export function BoxInput(props: Props) {
  const {
    type = 'text',
    children,
    name,
    inputRef,
    state,
    ...restProps
  } = props
  return (
    <S.Container>
      <S.Input type={type} {...restProps}
        name={name} ref={inputRef} state={state} />
      {children}
    </S.Container>
  )
}
