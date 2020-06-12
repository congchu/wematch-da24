import React from 'react'
import Styled from 'styled-components'

import Button from '../../components/common/Button'
import { Previous } from '../../components/common/Icon'

const S = {
    Container: Styled.div``
}

const PartnerList = ({}) => {
    return (
        <S.Container>
            <h2>Partner List Page</h2>
            <Button>이동</Button>
            <Previous color="#333" />
        </S.Container>
    )
}

export default PartnerList