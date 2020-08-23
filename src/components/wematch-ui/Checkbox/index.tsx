import * as React from 'react'
import styled from 'styled-components'
import CheckCircleOn from '../Icon/generated/CheckCircleOn'
import CheckCircleOff from '../Icon/generated/CheckCircleOff'
import RadioOn from '../Icon/generated/RadioOn'
import RadioOff from '../Icon/generated/RadioOff'
import { pointBlue, gray33 } from 'styles/colors'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  shape?: 'radio' | 'checkbox';
  className?: string;
  checked?: boolean;
}

const S = {
  Container: styled.label`
    vertical-align: middle;
    display: inline-flex;
    align-items: center;
    .icon {
      flex-shrink: 0;
    }
  `,
  LabelText: styled.span<{checked: boolean}>`
    display: inline-block;
    font-size: 16px;
    word-break: keep-all;
    font-weight: ${props => props.checked ? 'bold' : 'normal'};
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -1px;
    line-height: 21px;
    padding-top: 3px;
    color: ${props => props.checked ? pointBlue : gray33};
    margin-left: 8px;
    user-select: none;
  `,
  HiddenCheckbox: styled.input`
    display: none;
  `
}

export function Checkbox(props: Props) {
  const {
    checked = false,
    className,
    shape = 'checkbox',
    label,
    ...restProps
  } = props

  const IconOn = (shape === 'radio') ? RadioOn : CheckCircleOn
  const IconOff = (shape === 'radio') ? RadioOff : CheckCircleOff

  return (
    <S.Container className={className}>
      {checked ? (<IconOn size={24} className="icon" />) : (<IconOff size={24} className="icon" />)}
      {label && <S.LabelText checked={checked}>{label}</S.LabelText>}
      <S.HiddenCheckbox type="checkbox" {...restProps} />
    </S.Container>
  )
}
