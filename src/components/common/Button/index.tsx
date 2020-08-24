import React from 'react'
import Styled, { css } from 'styled-components'

import * as colors from 'styles/colors'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    /** 테마 정의 */
    theme: 'default' | 'primary',
    /** 비활성화 여부 */
    disabled?: boolean;
}

const S = {
    StyledButton: Styled.button`
        display: block;
        width: 100%;
        height: 56px;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        letter-spacing: -1px;
        line-height: 58px;
        cursor: pointer;
        
        ${({ theme }) => theme === 'default' && css`
          background-color: ${colors.white};
          color: ${colors.black};
        `}
        
        ${({ theme }) => theme === 'primary' && css`
          background-color: ${colors.pointBlue};
          color: ${colors.white};
        `}
        
        &:disabled {
            background-color: ${colors.lineDefault};
            cursor: not-allowed;
        }
    `
}

const Button: React.FC<Props> = (props) => {
    const {
        theme = 'default',
        disabled = false,
        children,
        ...restProps
    } = props

    return (
        <S.StyledButton theme={theme} disabled={disabled} {...restProps}>
            {children}
        </S.StyledButton>
    )
}

export default Button