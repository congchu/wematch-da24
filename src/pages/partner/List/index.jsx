import React, {useCallback, useEffect, useState} from 'react'
import Styled, { css } from 'styled-components'

import TopGnb from 'components/TopGnb'
import EmptyPage from 'components/EmptyPage'
import Loading from 'components/Loading'
import { KakaoIcon } from 'components/Icon'

import SetType from './setType'
import PartnerItem from './item'

import * as colors from 'styles/colors'

import { fetchList } from 'api/partner';

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
    const [partnerList, setPartnerList] = useState([])
    const [loading, setLoading] = useState(true)
    let perPage = 10

    const fetchPartnerList = useCallback(async (count) => {
        try {
            setLoading(true)
            const data = await fetchList(count)
            setPartnerList(data)
        } catch (e) {
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchMorePartnerList = useCallback(async (count) => {
        try {
            setLoading(true)
            const data = await fetchList(count)
            setPartnerList([...partnerList, ...data])
        } catch (e) {
        } finally {
            setLoading(false)
        }
    }, [fetchPartnerList])

    const infiniteScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        let clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight === scrollHeight) {
            perPage += 10
            fetchMorePartnerList(perPage)
        }
    }

    useEffect(() => {
        fetchPartnerList(perPage)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll' , infiniteScroll, true)
    }, [])

    return (
        <S.Container>
            <TopGnb Toptitle="업체 직접 선택" numberInfo="4" isCounted />
            <SetType />
            {partnerList.length >= 1 ? (
                <S.WrapItem>
                    {partnerList.map((list) => (
                        <PartnerItem key={list.id} profileImg={list.profileImg} disabled={list.disabled} level={list.level} title={list.title} pick_count={list.pick_count} review_count={list.review_count} experience={list.experience}/>
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