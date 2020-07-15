import React, {useMemo, useEffect, useState, useCallback} from 'react'
import Styled  from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from "react-use-media";
import useInfiniteScroll from 'hooks/useInfiniteScroll'

import MainHeader from 'components/MainHeader'
import TopGnb from 'components/TopGnb'
import EmptyPage from 'components/EmptyPage'
import Loading from 'components/Loading'
import { KakaoIcon, ChatArrow } from 'components/Icon'

import SetType from './setType'
import PartnerItem from './item'

import * as colors from 'styles/colors'
import * as values from 'constants/values'

import * as partnerActions from 'store/partner/actions'
import * as partnerSelector from 'store/partner/selectors'

const S = {
    Container: Styled.div`
        height:100%;
    `,
    WrapItem: Styled.div`
        @media screen and (min-width:768px) {
            width:608px;
            margin:0 auto;
        }
        @media screen and (min-width:1200px) {
            width:720px;
        }
    `,
	BtnKakao: Styled.a`
		display:inline-block;
		position:fixed;
        bottom:24px;
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
            bottom:48px;
        }
        @media screen and (min-width:1200px) {
            bottom:72px;
        }
    `,
    ChatText: Styled.a`
        display:inline-block;
        position:fixed;
        bottom:110px;
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
            bottom:134px;
        }
        @media screen and (min-width:1200px) {
            bottom:158px;
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
    const isDesktop = useMedia({
        minWidth: 1200,
    })

    const history = useHistory()
    const dispatch = useDispatch()
    const getPartnerList = useSelector(partnerSelector.getPartnerList)
    const getPartnerPick = useSelector(partnerSelector.getPartnerPick)

    const [page, setPage] = useState<number>(2)
    const SIZE = 10

    const fetchMoreListItems = () => {
        if (getPartnerList.hasMore) {
            setPage(page + 1)
            dispatch(partnerActions.fetchPartnerMoreListAsync.request({
                page: page,
                size: SIZE
            }))
            setTimeout(() => {
                // @ts-ignore
                setIsFetching(false)
            }, 1500)
        }
    }

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    const handleLinkKakao = () => {
        window.open('https://api.happytalk.io/api/kakao/chat_open?yid=%40%EC%9C%84%EB%A7%A4%EC%B9%98&site_id=4000001315&category_id=111561&division_id=111564', '_blank')
    }

    useEffect(() => {
        dispatch(partnerActions.fetchPartnerListAsync.request({
            page: values.DEFAULT_PAGE,
            size: SIZE
        }))
    }, [dispatch])

    if (getPartnerList.loading) {
        return <Loading />
    }

    if (!getPartnerList.data) {
        return <EmptyPage title="죄송합니다" subTitle="해당지역에 가능한 업체가 없습니다."/>
    }

    const isActive = (id: number) => {
        if (getPartnerPick.data) {
            const filter = getPartnerPick.data.filter((pick) => {
                return pick.id === id
            })

            return filter.length > 0
        }
        return false
    }


    return (
        <S.Container>
            {isDesktop ? <MainHeader /> : <TopGnb title="업체 직접 선택" count={getPartnerPick.data.length} onPrevious={() => history.goBack()}/>}
            <SetType count={getPartnerPick.data.length}/>
            <S.WrapItem>
                {getPartnerList.data.map((list) => {
                    return (
                        <PartnerItem key={list.id} profile_img={list.profile_img}
                             level={list.level} title={list.title ? list.title : values.DEFAULT_TEXT}
                             pick_count={list.pick_count} review_count={list.review_count} experience={list.experience}
                             active={isActive(list.id)} is_full={list.is_full}
                             onClick={() => {
                                 if (!isActive(list.id))
                                     history.push(`/partner/detail/${list.username}`)
                             }}
                        />
                    )
                })}
                <S.ChatText onClick={handleLinkKakao}>
                    도움이 필요하세요?
                    <ChatArrow width={20} height={12} />
                </S.ChatText>
                <S.BtnKakao onClick={handleLinkKakao}>
                    <KakaoIcon width={35} height={34} />
                </S.BtnKakao>
            </S.WrapItem>
            {isFetching && <MoreLoading />}
        </S.Container>
    )
}


export default PartnerList
