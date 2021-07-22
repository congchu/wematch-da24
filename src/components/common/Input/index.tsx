import React from 'react'
import Styled, { css } from 'styled-components'
import { Icon } from 'components/wematch-ui'

import * as colors from 'styles/colors'

interface StyleProps extends React.HTMLAttributes<HTMLDivElement> {}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 테마 설정 */
  theme: ThemeProps
  /** border 여부 */
  border?: boolean
  /** Search 아이콘 출력 여부 */
  icon?: IconProps
  /** Disabled 여부 */
  disabled?: boolean
  /** 최상단 스타일 custom */
  rootStyle?: React.CSSProperties
  inputRef?: React.RefObject<HTMLInputElement>
}

type ThemeProps = 'default' | 'primary'
type BorderProp = boolean
type IconProps = 'search' | 'down' | 'space'

const S = {
  Container: Styled.div`
        position: relative;
        display: block;
        
        svg {
          position: absolute;
          right: 15px;
          bottom: 26px;
        }

        span {
          position: absolute;
          right: 20px;
          bottom: 26px;
          font-size: 16px;
          color: colors.gray33;
        }
    `,
  StyledInput: Styled.input<{ theme: ThemeProps; border: BorderProp }>`
        width: 100%;
        height: 56px;
        margin-bottom: 8px;
        padding: 0 16px 0 16px;
        line-height: 56px;
        font-size: 15px;
        overflow: hidden;
        letter-spacing: -1px;
        cursor: pointer;
        box-sizing: border-box;
        
        ${({ border }) =>
          border &&
          css`
            border-radius: 8px;
          `};
        
        ${({ theme }) =>
          theme === 'default' &&
          css`
            background-color: ${colors.grayBg};
            color: ${colors.gray33};
            box-sizing: border-box;
            border: 1px solid ${colors.lineDefault};
            &::placeholder {
              color: ${colors.gray88};
            }
            &:focus {
              border: solid 1px ${colors.pointBlue};
            }
          `};
        
        ${({ theme }) =>
          theme === 'primary' &&
          css`
            border: solid 1px ${colors.pointBlue};
            &:focus {
              border: solid 1px ${colors.pointBlue};
              border-radius: 4px;
              color: ${colors.gray33};
              box-shadow: 0 4px 10px 4px rgba(0, 104, 255, 0.1);
              background-color: ${colors.white};
            }
          `};
            

        &:disabled {
            background-color: ${colors.grayBg};
            cursor: not-allowed;
            color: ${colors.gray88};
        }
    `
}

const Input: React.FC<InputProps> = (props) => {
  const { theme = 'default', border = false, icon, disabled, rootStyle, inputRef, ...restProps } = props

  return (
    <S.Container style={rootStyle}>
      <S.StyledInput theme={theme} border={border} disabled={disabled} {...restProps} ref={inputRef} />
      {icon === 'search' && <Icon.Search size={22} />}
      {icon === 'down' && <Icon.Down size={22} />}
      {icon === 'space' && <span>평</span>}
    </S.Container>
  )
}

export default Input
