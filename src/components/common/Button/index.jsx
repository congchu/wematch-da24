import React from 'react'
import Styled from 'styled-components'

const S = {
    StyledButton: Styled.button``
}

const Button = ({ children }) => {
    return (
        <S.StyledButton>{children}</S.StyledButton>
    )
}

export default Button