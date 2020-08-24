import React from 'react'
import styled from 'styled-components'
import { lineDefault, gray33, pointBlue } from 'styles/colors'

interface Props {
  value: string;
  selected?: boolean;
  excepted: boolean;
  onClick: (v: string) => void;
  gridType: 'large' | 'small';
}

type StyleProps = Pick<Props, 'selected' | 'excepted' | 'gridType'>

const S = {
  Li: styled.li<StyleProps>`
    vertical-align: top;
    border: 1px solid ${props => (props.selected ? pointBlue : lineDefault)};
    max-width: ${props => (props.gridType === 'small' ? '105px' : '156px')};
    width: ${props => (props.gridType === 'small' ? '33.4%' : '50%')};
    height: 72px;
    box-sizing: border-box;
    display: inline-block;
    margin-top: -1px;
    margin-left: -1px;
    padding: 1px 0 0 1px;
    color: ${props => {
    if (props.excepted) return lineDefault
    if (props.selected) return pointBlue
    return gray33
  }};
    box-shadow: ${props => (props.selected ? '0 4px 10px 4px rgba(45, 128, 247, 0.24)' : 'none')};
    position: relative;

    &:after {
      position: absolute;
      display: ${props => (props.selected ? 'block' : 'none')};
      top: -1px;
      right: -1px;
      width: 1px;
      height: 72px;
      content: '';
      z-index: 10;
      background-color: ${pointBlue};
    }
    &:before {
      position: absolute;
      display: ${props => (props.selected ? 'block' : 'none')};
      bottom: -1px;
      left: -1px;
      max-width: ${props => (props.gridType === 'small' ? '104px' : '156px')};
      border-right: 1px solid ${pointBlue};
      width: 100%;
      height: 1px;
      content: '';
      z-index: 10;
      background-color: ${pointBlue};
    }

    input {
      display: none;
    }
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      padding: 28px 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -1px;
      user-select: none;
      word-break: keep-all;
      &:hover {
        cursor: ${props => (props.excepted ? 'default' : 'pointer')};
      }
    }
  `
}

export default function GridSelectItem(props: Props) {
  const {
    value,
    selected = false,
    onClick,
    excepted,
    gridType
  } = props

  const handleClick = () => {
    if (!excepted) {
      onClick(value)
    }
  }

  return (
    <S.Li selected={selected} excepted={excepted} onClick={handleClick}
      gridType={gridType}>
      <label>
        {value.split('\n').map((v, index) => {
          return <span key={index}>{v}<br/></span>
        })}
      </label>
    </S.Li>
  )
}
