import React from 'react'
import Styled, {css} from 'styled-components'

import TopGnb from '../../../components/TopGnb'
import SetType from './setType'
import PartnerItem from './item'
import EmptyPage from '../../../components/EmptyPage'

import * as colors from '../../../styles/colors'

import { KakaoIcon, ChatIcon } from '../../../components/Icon'

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
        background: ${colors.white};
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
    const data = [
        {
            "id": 821425,
            "username": "a4466",
            "score": 9.97,
            "manager_name": "김두한",
            "title": null,
            "description": null,
            "keyword": {
                "kind_positive": [
                    "친절하고",
                    "친절하고 좋으신",
                    "친절하셨어요"
                ],
                "professional_positive": [
                    "꼼꼼한",
                    "친절하고 꼼꼼하게",
                    "저렴하고 꼼꼼하게"
                ],
                "recommendation_positive": [
                    "강력 추천",
                    "완전 추천"
                ]
            },
            "pick_count": 221,
            "review_count": 27,
            "experience": 10,
            "image": null
        },
        {
            "id": 821426,
            "username": "a6565",
            "score": 9.93,
            "manager_name": "이형규",
            "title": null,
            "description": null,
            "keyword": {
                "time_normal": [
                    "시간"
                ],
                "price_normal": [
                    "가성비",
                    "견적",
                    "당일 이사"
                ],
                "kind_positive": [
                    "친절합니다",
                    "친절",
                    "친절하고",
                    "친절하게",
                    "친절하고 편안하게",
                    "친절해요"
                ],
                "cleaning_normal": [
                    "청소",
                    "주방",
                    "정리 마무리"
                ],
                "cleaning_positive": [
                    "깔끔하게"
                ],
                "professional_positive": [
                    "꼼꼼히",
                    "세세한",
                    "믿고 맡겨",
                    "단합",
                    "믿고 맡길",
                    "꼼꼼",
                    "성심껏",
                    "친절하시고 꼼꼼하게",
                    "전문성"
                ],
                "recommendation_positive": [
                    "적극 추천",
                    "강력 추천",
                    "무조건 추천",
                    "추천",
                    "추천 함"
                ]
            },
            "pick_count": 573,
            "review_count": 67,
            "experience": 10,
            "image": null
        }
    ]

    return (
        <S.Container>
            <TopGnb />
            <SetType />
            {data.length >= 1 ? (
                <S.WrapItem>
                    {data.map((list) => (
                        <PartnerItem key={list.id} profileImg={data.profileImg} disabled={data.disabled} level={data.level} wordTitle={list.wordTitle} select={list.select} review={list.review} career={list.career}/>
                    ))}
                    <S.ChatText>
                        도움이 필요하세요?
                    </S.ChatText>
                    <S.BtnKakao>
                        <KakaoIcon width="35" height="34" />
                    </S.BtnKakao>
                </S.WrapItem>
            ) : (
                <EmptyPage />
            )}
        </S.Container>
    )
}

export default PartnerList