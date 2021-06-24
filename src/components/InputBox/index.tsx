import React from 'react'
import styled from 'styled-components'
import { Icon } from 'components/wematch-ui'
import * as colors from 'styles/colors'

const InputWrapper = styled.div<{ error: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  width: 100%;
  min-height: 56px;
  /* height: 56px; */
  border: ${({ error }) => (error ? '1px solid #EC485C' : '1px solid #d7dbe2')};
  border-radius: 6px;

  span {
    .palaceholder {
      font-size: 16px;
      letter-spacing: -1px;
      color: ${colors.gray88};
    }

    .value {
      font-size: 16px;
      letter-spacing: -1px;
      color: ${colors.gray33};
    }
  }
`

const Text = styled.span<{ type: 'placeholder' | 'value' }>`
  font-size: 16px;
  letter-spacing: -1px;
  color: ${({ type }) => (type === 'value' ? colors.gray33 : colors.gray88)};
`

interface IProps {
  icon?: string
  placeHolder?: string
  value?: string
  onClick: () => void
  style?: React.CSSProperties
  error?: boolean
}

const InputBox: React.FC<IProps> = ({ icon, placeHolder, value, onClick, style, error = false }) => {
  return (
    <InputWrapper onClick={onClick} style={style} error={error}>
      <div style={{ flex: 1, wordBreak: 'keep-all' }}>{!value ? <Text type={'placeholder'}>{placeHolder}</Text> : <Text type={'value'}>{value}</Text>}</div>
      <div style={{ width: '22px', height: '22px', marginLeft: '8px' }}>
        {icon === 'search' && <Icon.Search size={22} />}
        {icon === 'down' && <Icon.Down size={22} />}
      </div>
    </InputWrapper>
  )
}

export default InputBox
