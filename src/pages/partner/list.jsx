import React from 'react'
import Styled, {css} from 'styled-components'

import Button from '../../components/common/Button'
import TopGnb from './TopGnb'
import SetType from './setType'
import PartnerItem from './item'
import NoneList from './noneList'

import { KakaoIcon, ChatIcon } from '../../components/common/Icon'

const S = {
    Container: Styled.div``,
    WrapItem: Styled.div`
        
        @media screen and (min-width: 768px) {
            width:608px;
            margin:0 auto;
        }
    `,
	BtnKakao: Styled.a`
		display:inline-block;
		position: fixed;
        bottom: 72px;
        right: 24px;
        width: 62px;
        height: 62px;
        border-radius: 62px;
        border: 1px solid #f6df0d;
        background-color: #ffe500;
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
        z-index: 2;
        svg {
            margin-top:17px;
        }
        @media screen and (min-width: 768px) {
            right:10%;
        }
        @media screen and (max-width: 320px) {
            bottom:32px;
        }
    `,
    ChatText: Styled.a`
        display: inline-block;
        position: fixed;
        bottom: 156px;
        right: 24px;
        padding: 10px 18px 8px;
        border: 1px solid #1672f7;
        border-radius: 100px;
        font-size: 15px;
        background: #fff;
        color: #1672f7;
        letter-spacing: -0.5px;
        @media screen and (min-width: 768px) {
            right:10%;
        }
        @media screen and (max-width: 320px) {
            bottom:112px;
        }
    `
}

const PartnerList = () => {
    const companyList = [
        {id: 1, profileImg: '', disabled: true, level:'S', wordTitle:'내 집처럼 편안하게, 안전하게 프로페셔널하게 이사해드립니다!!', select:'895', review:'1041', career:'11' },
        {id: 2, profileImg: '', disabled: false, level:'A', wordTitle:'이사,전문가들만 모여있습니다.', select:'652', review:'871', career:'18' },
        {id: 3, profileImg: 'https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/marketdesigners/Contents-Image/business/leader/robin_b_2x.png', disabled: false, level:'B', wordTitle:'고객님의 짐을 행복하게 내 집 처럼 나릅니다. 믿고 맡겨주세요 믿고 맡겨주세요. 믿고 맡겨주세요.', select:'341', review:'194', career:'9' },
        {id: 4, profileImg: 'https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/marketdesigners/Contents-Image/business/leader/robin_b_2x.png', disabled: true, level:'N', select:'125', review:'114', career:'11' }
    ]
    // const companyList = []

    return (
        <S.Container>
            <TopGnb />
            <SetType />
            {companyList.length >= 1 ? (
                <S.WrapItem>
                    {companyList.map((list) => (
                        <PartnerItem key={list.id} profileImg={list.profileImg} disabled={list.disabled} level={list.level} wordTitle={list.wordTitle} select={list.select} review={list.review} career={list.career}/>
                    ))}
                    <S.ChatText>
                        도움이 필요하세요?
                    </S.ChatText>
                    <S.BtnKakao>
                        <KakaoIcon width="35" height="34" />
                    </S.BtnKakao>
                </S.WrapItem>
            ) : (
                <NoneList />
            )}
            
        </S.Container>
    )
}

export default PartnerList