import React from 'react'
import Styled, {css} from 'styled-components'

import TopGnb from '../../../components/TopGnb'
import SetType from './setType'
import PartnerItem from './item'
import EmptyPage from '../../../components/EmptyPage'

import * as colors from '../../../styles/colors'

import { KakaoIcon } from '../../../components/Icon'

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
        border: 1px solid ${colors.pointBlue};
        border-radius: 100px;
        font-size: 15px;
        background: ${colors.white};
        color: ${colors.pointBlue};
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
            "id": 821427,
            "username": "a7114",
            "score": 9.91,
            "level":"S",
            "manager_name": "양일권",
            "title": "내가족 이사처럼 꼼꼼하고 기분좋게~^^",
            "description": "이젠 이사하면서 스트레스받지 마세요! 견적부터 마무리까지 깔끔하게 해드립니다~^^",
            "levelDescription":"고객평가 상위 10%",
            "keyword": {
                "time_normal": [
                    "시간"
                ],
                "price_normal": [
                    "견적 상담"
                ],
                "kind_positive": [
                    "친절해요",
                    "친절하고"
                ],
                "cleaning_normal": [
                    "주방"
                ],
                "cleaning_positive": [
                    "깔끔하게"
                ],
                "professional_positive": [
                    "인간적",
                    "친절하고 꼼꼼하게",
                    "꼼꼼하고",
                    "세심"
                ],
                "recommendation_positive": [
                    "정말 강력 추천",
                    "망설이지 마세요"
                ]
            },
            "pick_count": 839,
            "review_count": 43,
            "experience": 10,
            "image": null
        },
        {
            "id": 821426,
            "username": "a6565",
            "score": 9.93,
            "level":"B",
            "manager_name": "이형규",
            "title": null,
            "description": null,
            "levelDescription":"평균수준",
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
            <TopGnb Toptitle="업체 직접 선택" numberInfo="4" isCounted />
            <SetType />
            {data.length >= 1 ? (
                <S.WrapItem>
                    {data.map((list) => (
                        <PartnerItem key={list.id} profileImg={list.profileImg} disabled={list.disabled} level={list.level} levelDescription={list.levelDescription} title={list.title} pick_count={list.pick_count} review_count={list.review_count} experience={list.experience}/>
                    ))}
                    <S.ChatText>
                        도움이 필요하세요?
                    </S.ChatText>
                    <S.BtnKakao>
                        <KakaoIcon width="35" height="34" />
                    </S.BtnKakao>
                </S.WrapItem>
            ) : (
                <EmptyPage EmptyTitle="죄송합니다" EmptySubtitle="해당지역에 가능한 업체가 없습니다." />
            )}
        </S.Container>
    )
}


export default PartnerList