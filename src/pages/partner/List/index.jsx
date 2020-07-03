import React, {useCallback, useEffect, useState} from 'react'
import Styled  from 'styled-components'
import { useHistory } from 'react-router-dom'

import TopGnb from 'components/TopGnb'
import EmptyPage from 'components/EmptyPage'
import Loading from 'components/Loading'
import { KakaoIcon, ChatArrow } from 'components/Icon'

import SetType from './setType'
import PartnerItem from './item'

import * as colors from 'styles/colors'
import { API_URL } from 'constants/env'
import { fetchList } from 'api/partner'
import useInfiniteScroll from 'hooks/useInfiniteScroll'


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
    const THUMBNAIL_URL = API_URL + '/unsafe/88x88/'
    const history = useHistory()

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
                }, 500)
            })
    }

    const defaultText = [
        '기술은 백두산급 정성은 에베레스트급 이사입니다.',
        '친절!정확!속도! 믿을 수 있는 이사전문가입니다.',
        '내 집처럼 섬세하게 완벽한 이사 해드립니다.',
        '이사 품질만은 양보할 수 없다! 확실하게 해드립니다.',
        '이사는 기본, 정리정돈까지 완벽을 추구합니다.'
    ]

    const defaultImage = [
        `${API_URL}/unsafe/88x88/https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_1.jpg`,
        `${API_URL}/unsafe/88x88/https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_2.jpg`,
        `${API_URL}/unsafe/88x88/https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_3.jpg`,
        `${API_URL}/unsafe/88x88/https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_4.jpg`,
        `${API_URL}/unsafe/88x88/https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_5.jpg`,
    ]

    const randomSeed = () => {
        return Math.floor(Math.random() * 5)
    }

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    const getPartnerList = useCallback(async () => {
        const DEFAULT_PAGE = 1

        try {
            setLoading(true)
            const response = await fetchList(DEFAULT_PAGE, SIZE)
            setIsFetching(false)
            setPartnerList(response)
        } catch (e) {
        } finally {
            setLoading(false)
        }
    }, [])

    const makeDefaultData = () => {
        const r = randomSeed()
        return {
            text: defaultText[r],
            image: defaultImage[r],
            seed: r
        }
    }

    const handleLinkKakao = () => {
        window.open('https://api.happytalk.io/api/kakao/chat_open?yid=%40%EC%9C%84%EB%A7%A4%EC%B9%98&site_id=4000001315&category_id=111561&division_id=111564', '_blank')
    }

    useEffect(() => {
        getPartnerList()
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
                        {partnerList.map((list) => {
                            if (list.profile_img) {
                                return (
                                    <PartnerItem key={list.id} profile_img={THUMBNAIL_URL + list.profile_img} disabled={list.disabled}
                                         level={list.level} levelDescription={list.levelDescription} title={list.title}
                                         pick_count={list.pick_count} review_count={list.review_count} experience={list.experience}
                                         active={list.active} is_full={list.is_full} onClick={() => history.push(`/partner/detail/${list.username}`)}
                                    />
                                )
                            } else {
                                const data = makeDefaultData()
                                return (
                                    <PartnerItem key={list.id} profile_img={data.image} disabled={list.disabled}
                                         level={list.level} levelDescription={list.levelDescription} title={data.text}
                                         pick_count={list.pick_count} review_count={list.review_count} experience={list.experience}
                                         active={list.active} is_full={list.is_full} onClick={() => history.push(`/partner/detail/${list.username}?seed=${data.seed}`)}
                                    />
                                )
                            }
                        })}
                        <S.ChatText onClick={handleLinkKakao}>
                            도움이 필요하세요?
                            <ChatArrow width="20" height="12" />
                        </S.ChatText>
                        <S.BtnKakao onClick={handleLinkKakao}>
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