import React, { useEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use-media'
import {RouteComponentProps} from 'react-router'
import { useRouter } from 'hooks/useRouter'

import { DownArrow, UpArrow } from 'components/Icon'
import Loading from 'components/Loading'
import MainHeaderForDetail from 'components/common/MainHeaderForDetail'
import NavHeader from 'components/common/NavHeader'
import PartnerInfo from 'components/da24/PartnerInfo/index'
import ReviewContainerCenter from 'components/da24/ReviewContainerCenter/index'
import SetType from 'components/SetType'

import * as partnerActions from 'store/partner/actions'
import * as partnerSelector from 'store/partner/selectors'
import * as formSelector from 'store/form/selectors'
import * as commonSelector from 'store/common/selectors'

import * as colors from 'styles/colors'
import * as values from 'constants/values'

import { some } from "lodash";
import { dataLayer } from "lib/dataLayerUtil";


const S = {
    Container: styled.div``,
    BottomContainer: styled.div`
		position:relative;
		margin-top:10px;
		:before{
			content:'';
			position:absolute;
			top:-10px;
			width:100%;
			height:8px;
			margin-bottom:0px;
			background-color:${colors.lineDeco};
			border:1px solid ${colors.lineDefault};
			box-sizing:border-box;
			@media screen and (min-width:1200px) {
				width:720px;
				border:0;
			}
		}
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-bottom:0px;
			padding-left:0px;
		}
	`,
    MoreList: styled.button`
		width:100%;
		height:52px;
		margin-bottom:0px;
		font-size:15px;
		font-weight:500;
		background-color:${colors.white};
		color:${colors.gray66};
		cursor:pointer;
		svg{
			margin-left:4px;
			vertical-align:middle;
		}
		@media screen and (min-width:1200px) {
			margin-bottom:0;
		}
	`,
    TopBtn: styled.span`
		position:fixed;
		right:24px;
		bottom:88px;
		width:40px;
		height:40px;
		border:1px solid ${colors.pointBlue};
		border-radius:22px;
		background-color:${colors.white};
		box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.2);
		cursor:pointer;
		svg{
			position:absolute;
			top:50%;
			left:50%;
			margin-top:-8px;
			margin-left:-8px;
		}
		@media screen and (min-width:768px) {
			bottom:120px;
		}
		@media screen and (min-width:1200px) {
			z-index:5;
			right:130px;
			bottom:80px;
		}
	`,
    ReviewMoreLoading: styled.div`
        display: block;
        text-align: center;
        color: ${colors.pointBlue};
        padding: 25px
    `,
    ScrollView: styled.div``,
    ReviewPreview: styled.div`
        @media screen and (min-width:768px) {
            width: 608px;
            margin: 0 auto;
        }

        @media screen and (min-width: 1200px) {
            width: 656px;
            margin: 0 auto;
            padding-left: 0px;
        }
        img {
            width: inherit;
            display: block;
            margin: 0 auto;
        }
    `,

}

const PartnerDetailForCompleted = () => {
    const nextPage = useRef(1)
    const [showScrollView, setShowScrollView] = useState(true)

    const isDesktop = useMedia({
        minWidth: 1200,
    })
    const history = useHistory()
    const router = useRouter()
    const params = useParams<{ adminId: string }>()
    const dispatch = useDispatch()

    const getPartnerDetailComp = useSelector(partnerSelector.getPartnerDetailComp)
    const getReviewCompList = useSelector(partnerSelector.getReviewCompList)
    const getFormData = useSelector(formSelector.getFormData)

    const checkScrollTop = () => {
        if (!showScrollView && window.pageYOffset > 300) {
            setShowScrollView(true)
        } else if (showScrollView && window.pageYOffset <= 300) {
            setShowScrollView(false)
        } else if (window.pageYOffset === 0) {
            setShowScrollView(false)
        }
    };

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    useEffect(() => {
        dispatch(partnerActions.fetchPartnerDetailCompAsync.request({
            adminId: params.adminId
        }))
        dispatch(partnerActions.fetchReviewListCompAsync.request({
            adminId: params.adminId,
            page: 1,
            size: values.DEFAULT_REVIEW_LIST_SIZE
        }))
    }, [dispatch, params.adminId])


    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        }
    }, [checkScrollTop])


    if (getPartnerDetailComp.loading) {
        return <Loading />
    }

    const handleMoreReview = () => {
        nextPage.current += 1;
        dispatch(partnerActions.fetchReviewMoreListCompAsync.request({
            adminId: params.adminId,
            page: nextPage.current,
            size: values.DEFAULT_REVIEW_LIST_SIZE
        }))
    }

    return (
        <S.Container>
            {getPartnerDetailComp.data && (
                <>
                    {isDesktop ? <MainHeaderForDetail/> : <NavHeader title="이사업체 상제 정보"/>}
                    <PartnerInfo title={getPartnerDetailComp.data.title ? getPartnerDetailComp.data.title : values.DEFAULT_TEXT} profile_img={getPartnerDetailComp.data.profile_img} status={'automatch'}
                                 level={getPartnerDetailComp.data.level} pick_cnt={getPartnerDetailComp.data.pick_cnt} experience={getPartnerDetailComp.data.experience}
                                 description={getPartnerDetailComp.data.description} keywords={getPartnerDetailComp.data.keywords} adminname={getPartnerDetailComp.data.adminname} addition={getPartnerDetailComp.data.addition} />
                    <ReviewContainerCenter/>
                    <S.BottomContainer>
                        {getReviewCompList.moreLoading && (
                            <S.ReviewMoreLoading>
                                로딩중..
                            </S.ReviewMoreLoading>
                        )}
                        {getReviewCompList.hasMore && (
                            <S.MoreList onClick={handleMoreReview}>후기 더보기 <DownArrow width={16} height={16} /></S.MoreList>
                        )}
                        {showScrollView && (
                            <S.ScrollView>
                                <S.TopBtn onClick={handleScrollTop}>
                                    <UpArrow color={colors.pointBlue} width={16} height={16} />
                                </S.TopBtn>
                            </S.ScrollView>
                        )}
                    </S.BottomContainer>
                </>
            )}
        </S.Container>
    )
}

export default PartnerDetailForCompleted
