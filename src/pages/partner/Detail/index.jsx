import React, { useEffect } from 'react'
import Styled from 'styled-components'

import TopGnb from '../../../components/TopGnb'
import SetType from '../List/setType'
import UserImage from './userImage'
import PartnerInfo from './partnerInfo'
import LevelData from './levelData'
import Review from './review'
import Button from './button'

const S = {
    Container: Styled.div``
}

const PartnerDetail = ({}) => {
    return (
        <S.Container>
            <TopGnb title="업체 직접 선택" count={0}/>
            <SetType />
            <UserImage />
            <PartnerInfo />
            <LevelData />
            <Review />
            <Review />
            <Review />
            <Button />
        </S.Container>
    )
}

export default PartnerDetail