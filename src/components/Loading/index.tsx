import React from 'react'
import Styled from 'styled-components'

const S = {
    Container: Styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
    `
}

const Loading = () => {
    return (
        <S.Container>
            로딩중
        </S.Container>
    )
}

export default Loading;