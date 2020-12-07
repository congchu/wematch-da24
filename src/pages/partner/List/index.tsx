import React, { useEffect, useState } from 'react'
import styled, {css} from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use-media'
import {isEmpty, some} from 'lodash'
import useInfiniteScroll from 'hooks/useInfiniteScroll'

import MainHeader from 'components/MainHeader'
import TopGnb from 'components/TopGnb'
import EmptyPage from 'components/EmptyPage'
import Loading from 'components/Loading'
import { KakaoIcon, ChatArrow } from 'components/Icon'
import ToastPopup from "components/wematch-ui/ToastPopup";

import SetType from 'components/SetType'
import PartnerItem from './item'
import {useCookies} from "react-cookie";

import * as colors from 'styles/colors'
import * as values from 'constants/values'

import * as partnerActions from 'store/partner/actions'
import * as partnerSelector from 'store/partner/selectors'
import * as formSelector from "store/form/selectors";
import * as commonSelector from "store/common/selectors";
import {dataLayer} from "lib/dataLayerUtil";
const S = {
    Container: styled.div`
        height:100%;
    `,
    WrapItem: styled.div`
        @media screen and (min-width:768px) {
            width:608px;
            margin:0 auto;
        }
        @media screen and (min-width:1200px) {
            width:720px;
        }
    `,
    PartnerItemContainer: styled.div<{hasMore: boolean}>`
      a {
        ${props => !props.hasMore && css`
           &:nth-last-child(1) {
			    	 padding-bottom: 160px;
  			  }
      `}}
        @media screen and (min-width:380px) {
        }
`,
	BtnKakao: styled.a`
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
    ChatText: styled.a`
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
    More: styled.div`
        display:flex;
        justify-content:center;
        font-size:16px;
        color:${colors.pointBlue};
        padding:15px;
    `
}

{/* 임시용 디자인 없음*/}
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
    const getFormData = useSelector(formSelector.getFormData)
    const getMoveIdxData = useSelector(commonSelector.getMoveIdxData)

    const [page, setPage] = useState<number>(2)
    const [visible, setVisible] = useState(false)

    const fetchMoreListItems = () => {
        if (getMoveIdxData.idx && getPartnerList.hasMore) {
            setPage(page + 1)
            dispatch(partnerActions.fetchPartnerMoreListAsync.request({
                page: page,
                size: values.DEFAULT_PARTNER_LIST_SIZE,
                idx: getMoveIdxData.idx
            }))
            setTimeout(() => {
                // @ts-ignore
                setIsFetching(false)
            }, 3000)
        }
    }

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    const handleLinkKakao = () => {
        window.open('https://api.happytalk.io/api/kakao/chat_open?yid=%40%EC%9C%84%EB%A7%A4%EC%B9%98&site_id=4000001315&category_id=111561&division_id=111564', '_blank')
    }

    useEffect(() => {
        if(getFormData.moving_date.length === 0) {
            setVisible(true)
        }
        if(!getMoveIdxData.idx) {
            setVisible(true)
        }
    }, [])

    useEffect(() => {
        if(getMoveIdxData.idx && !getMoveIdxData.loading) {
            dispatch(partnerActions.fetchPartnerListAsync.request({
                page: values.DEFAULT_PAGE,
                size: values.DEFAULT_PARTNER_LIST_SIZE,
                idx: getMoveIdxData.idx
            }))
        }
    }, [dispatch])

    useEffect(() => {
        if(isEmpty(getPartnerList.data)) {
            dataLayer({event: 'partner_inventory', CD5: "noservice_0"})
        } else {
            const availableLength = getPartnerList.data.filter(item => item.status !== 'unavailable').length
            dataLayer({event: 'partner_inventory', CD5: availableLength > 0 ? `showcnt_${availableLength}` : "nopartner_0"})
        }
    }, [getPartnerList.loading])
    if (getPartnerList.loading) {
        return <Loading text={'조건에 맞는 업체 찾는 중..'}/>
    }

    return (
        <S.Container>
            {isDesktop ? <MainHeader /> : <TopGnb title="업체 직접 선택" count={getPartnerPick.data.length} onPrevious={() => history.goBack()} showTruck={true}/>}
            <SetType count={getPartnerPick.data.length} formData={getFormData}/>
            {isEmpty(getPartnerList.data)
                ?   <EmptyPage title="죄송합니다" subTitle="해당지역에 가능한 업체가 없습니다."/>
                :
                <>
                <S.WrapItem id="dsl_booking_list_partner">
                    <S.PartnerItemContainer hasMore={getPartnerList.hasMore}>
                        {getPartnerList.data.map((list:any, index: number) => {
                            return (
                                <PartnerItem key={list.id} profile_img={list.profile_img}
                                             level={list.level} title={list.title ? list.title : values.DEFAULT_TEXT}
                                             pick_cnt={list.pick_cnt} feedback_cnt={list.feedback_cnt} experience={list.experience} status={list.status}
                                             adminid={list.adminid}
                                             onClick={() => {
                                                 history.push(`/partner/detail/${list.adminid}`)
                                                 dataLayer({event: 'partner_select', label: `${getPartnerList.data.length}_${index+1}`, CD7: `${list.level}등급`, CD8: `${list.title}`})
                                             }}
                                />
                            )
                        })}
                    </S.PartnerItemContainer>
                    <S.ChatText onClick={handleLinkKakao} id="dsl_booking_list_katalk2">
                        {getPartnerList.data[0].status === 'unavailable' ? "가능업체를 찾아드릴까요?":"도움이 필요하세요?"}
                        <ChatArrow width={20} height={12} />
                    </S.ChatText>
                    <S.BtnKakao onClick={handleLinkKakao} id="dsl_booking_list_katalk">
                        <KakaoIcon width={35} height={34} />
                    </S.BtnKakao>
                </S.WrapItem>
                {(isFetching && getPartnerList.hasMore) && <MoreLoading />}
                </>
            }
            <ToastPopup visible={visible} confirmText={'홈으로 가기'} confirmClick={() => history.push('/')} showHeaderCancelButton={false}>
                <p>{'정보가 만료되었습니다.\n다시 조회해주세요'}</p>
            </ToastPopup>
        </S.Container>
    )
}


export default PartnerList
