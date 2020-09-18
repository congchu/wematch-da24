import React, { useEffect, useState, useRef } from 'react'
import Styled, { css } from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use-media'

import { DownArrow, UpArrow } from 'components/Icon'
import Loading from 'components/Loading'
import MainHeader from 'components/MainHeader'
import TopGnb from 'components/TopGnb'
import UserImage from './userImage'
import PartnerInfo from './partnerInfo'
import LevelData from './levelData'
import Review from './review'

import * as colors from 'styles/colors'
import * as values from 'constants/values'

import * as partnerActions from 'store/partner/actions'
import * as partnerSelector from 'store/partner/selectors'
import * as formSelector from "store/form/selectors";
import {some} from "lodash";

const S = {
    Container: Styled.div``,
    BottomContainer: Styled.div`
		position:relative;
		margin-top:10px;
		:before{
			content:'';
			position:absolute;
			top:-10px;
			width:100%;
			height:8px;
			margin-bottom:64px;
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
			padding-bottom:80px;
			padding-left:272px;
		}
	`,
    MoreList: Styled.button`
		width:100%;
		height:52px;
		margin-bottom:64px;
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
    BtnSelect: Styled.button<{is_full: boolean, isSelected: boolean}>`
		position:fixed;
		z-index:5;
		left:0;
		right:0;
		bottom:0;
		width:100%;
		height:64px;
		font-size:18px;
		font-weight:700;
		background-color: ${props => props.isSelected ? colors.lineDefault : colors.pointBlue};
		color:${colors.white};
		cursor:pointer;
		${props => props.is_full && css`
			background-color:${colors.lineDefault};
		`};
		@media screen and (min-width:1200px) {
			position:relative;
		}
	`,
    TopBtn: Styled.span`
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
    ReviewMoreLoading: Styled.div`
        display: block;
        text-align: center;
        color: ${colors.pointBlue};
        padding: 25px
    `,
    ScrollView: Styled.div``,
    ReviewPreview: Styled.div`
        @media screen and (min-width:768px) {
            width: 608px;
            margin: 0 auto;
        }
        
        @media screen and (min-width: 1200px) {
            width: 656px;
            margin: 0 auto;
            padding-left: 272px;
        }       
        img {
            width: inherit;
            display: block;
            margin: 0 auto;
        }
    `,

}

const PartnerDetail = () => {
    const nextPage = useRef(1)
    const [showScrollView, setShowScrollView] = useState(false)

    const isDesktop = useMedia({
        minWidth: 1200,
    })

    const isMobile = useMedia({
        maxWidth: 767,
    })
    const history = useHistory()
    const params = useParams<{username: string}>()
    const dispatch = useDispatch()

    const getPartnerDetail = useSelector(partnerSelector.getPartnerDetail)
    const getReviewList = useSelector(partnerSelector.getReviewList)
    const getPartnerPick = useSelector(partnerSelector.getPartnerPick)
    const getFormData = useSelector(formSelector.getFormData)


    const checkScrollTop = () => {
        if (!showScrollView && window.pageYOffset > 300){
            setShowScrollView(true)
        } else if (showScrollView && window.pageYOffset <= 300){
            setShowScrollView(false)
        } else if (window.pageYOffset === 0) {
            setShowScrollView(false)
        }
    };

    const handleScrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleSelected = () => {
        if (getPartnerDetail.data)
            dispatch(partnerActions.setPartnerPick([getPartnerDetail.data]))
        history.goBack()
    }

    const isActive = () => {
        return some(getPartnerPick.data, {
            adminid: params.username
        })
    }
    useEffect(() => {
        dispatch(partnerActions.fetchPartnerDetailAsync.request({
            username: params.username,
        }))
        dispatch(partnerActions.fetchReviewListAsync.request({
            username: params.username,
            page: 1,
            size: values.DEFAULT_REVIEW_LIST_SIZE
        }))
    }, [dispatch, params.username])

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        }
    }, [checkScrollTop])

    if (getPartnerDetail.loading) {
        return <Loading />
    }

    const handleMoreReview = () => {
        nextPage.current += 1;
        dispatch(partnerActions.fetchReviewMoreListAsync.request({
            username: params.username,
            page: nextPage.current,
            size: values.DEFAULT_REVIEW_LIST_SIZE
        }))
    }

    return (
        <S.Container>
            {getPartnerDetail.data && (
                <>
                    {isDesktop ? <MainHeader /> : <TopGnb title="이사업체 상세 정보" count={getPartnerPick.data.length} onPrevious={() => history.goBack()}/>}
                    <UserImage profile_img={getPartnerDetail.data.profile_img } is_full={getPartnerDetail.data.is_full} />
                    <PartnerInfo title={getPartnerDetail.data.title ? getPartnerDetail.data.title : values.DEFAULT_TEXT}
                        level={getPartnerDetail.data.level} pick_count={getPartnerDetail.data.pick_count} experience={getPartnerDetail.data.experience}
                        description={getPartnerDetail.data.description} keywords={getPartnerDetail.data.keywords} adminname={getPartnerDetail.data.adminname}/>
                    <LevelData review_count={getPartnerDetail.data.review_count} />
                    {getReviewList.data.map((review, index) => {
                        if(!review) {
                            return (
                                <S.ReviewPreview>
                                    <img src={require(`../../../assets/images/review_${isMobile ? 'm' : 'pc'}.png`)} alt='review_img'/>
                                </S.ReviewPreview>
                            )
                        }
                        return (
                            <Review key={index} id={review.id} created_at={review.created_at} professional={review.professional}
                                kind={review.kind} price={review.price} memo={review.memo} reply={review.reply} star={review.star}/>
                        )
                    })}
                    <S.BottomContainer>
                        {/* 임시용 디자인 없음*/}
                        {getReviewList.moreLoading && (
                            <S.ReviewMoreLoading>
                                로딩중..
                            </S.ReviewMoreLoading>
                        )}
                        {getReviewList.hasMore && (
                            <S.MoreList onClick={handleMoreReview}>후기 더보기 <DownArrow width={16} height={16} /></S.MoreList>
                        )}
                        {showScrollView && (
                            <S.ScrollView>
                                <S.BtnSelect onClick={handleSelected} disabled={isActive()} isSelected={isActive()} is_full={getPartnerDetail.data.is_full}>이 업체에 견적 받아보기</S.BtnSelect>
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

export default PartnerDetail
