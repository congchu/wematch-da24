import React, {useCallback, useEffect, useState} from 'react'
import Styled, { css } from 'styled-components'

import TopGnb from 'components/TopGnb'
import EmptyPage from 'components/EmptyPage'
import Loading from 'components/Loading'
import { KakaoIcon, ChatArrow } from 'components/Icon'

import SetType from './setType'
import PartnerItem from './item'

import * as colors from 'styles/colors'

import { fetchList } from 'api/partner';
import useInfiniteScroll from 'lib/useInfiniteScroll';

const S = {
    Container: Styled.div`
        height:100%;
    `,
    WrapItem: Styled.div`
        @media screen and (min-width:768px) {
            width:608px;
            margin:0 auto;
        }
    `,
	BtnKakao: Styled.a`
		display:inline-block;
		position:fixed;
        bottom:72px;
        right:24px;
        width:62px;
        height:62px;
        border-radius:62px;
        border:1px solid #f6df0d;
        background-color:#ffe500;
        box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.1);
        text-align:center;
        z-index:2;
        svg {
            margin-top:17px;
        }
        @media screen and (min-width:768px) {
            right:10%;
        }
        @media screen and (max-width:320px) {
            bottom:32px;
        }
    `,
    ChatText: Styled.a`
        display:inline-block;
        position:fixed;
        bottom:156px;
        right:24px;
        padding:10px 18px 8px;
        border:1px solid ${colors.pointBlue};
        border-radius:100px;
        font-size:15px;
        box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.2);
        background:${colors.white};
        color:${colors.pointBlue};
        letter-spacing:-0.5px;
        svg{
            position:absolute;
            bottom:-11px;
            right:19px;
        }
        @media screen and (min-width:768px) {
            right:10%;
        }
        @media screen and (max-width:320px) {
            bottom:112px;
        }
    `,
    More: Styled.div`
        display:flex;
        justify-content:center;
        font-size:16px;
        color:${colors.pointBlue};
        padding:15px;
    `
}

function MoreLoading() {
    return (
        <S.More>
            로딩중..
        </S.More>
    )
}

const PartnerList = () => {
    const [partnerList, setPartnerList] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(2)
    const SIZE = 10

    const fetchMoreListItems = () => {
        setPage(page + 1)
        fetchList(page, SIZE)
            .then((res) => {
                setTimeout(() => {
                    setPartnerList(prevState => ([...prevState, ...res]))
                    setIsFetching(false);
                }, 2000)
            })
    }
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    useEffect(() => {
        const DEFAULT_PAGE = 1
        setLoading(true)
        fetchList(DEFAULT_PAGE, SIZE)
            .then((res) => {
                setIsFetching(false);
                setPartnerList(res)
            }).finally(() => {
                setLoading(false)
            })
    }, [setIsFetching])

    if (loading) {
        return <Loading />
    }

    return (
        <S.Container>
            <TopGnb title="업체 직접 선택" count={2} />
            <SetType />
            {partnerList.length > 0 ? (
                <>
                    <S.WrapItem>
                        {partnerList.map((list) => (
                            <PartnerItem key={list.id} profileImg={list.profileImg} disabled={list.disabled} level={list.level} levelDescription={list.levelDescription} title={list.title} pick_count={list.pick_count} review_count={list.review_count} experience={list.experience} active={list.active}/>
                        ))}
                        <S.ChatText>
                            도움이 필요하세요?
                            <ChatArrow width="20" height="12" />
                        </S.ChatText>
                        <S.BtnKakao>
                            <KakaoIcon width="35" height="34" />
                        </S.BtnKakao>
                    </S.WrapItem>
                </>
            ) : (
                <EmptyPage title="죄송합니다" subtitle="해당지역에 가능한 업체가 없습니다." />
            )}
            {isFetching && <MoreLoading />}
        </S.Container>
    )
}


export default PartnerList