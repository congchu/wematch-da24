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
import SetType from 'components/SetType'
import Index from 'components/da24/Review'
import TermsModal from 'components/Modal/TermsModal'

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
    CenterTitleContainer: styled.div`
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-left:0px;
		}
	`,
    Wrap: styled.div`
		padding:24px;
		@media screen and (min-width:768px) {
			width:608px;
			margin:0 auto;
			padding:24px 0;
		}
		@media screen and (min-width:1200px) {
			width:656px;
		}
	`,
    Box: styled.div`
		padding:14px 16px 10px;
		border-radius:8px;
		background-color:${colors.boxBg};
		p{
			font-size:12px;
			color:${colors.gray66};
			line-height:20px;
			letter-spacing:-0.5px;
		}
		span{
			text-decoration:underline;
			cursor:pointer;
		}
	`,
    Average: styled.div`
		margin-top:45px;
		strong{
			font-size:16px;
			font-weight:700;
		}
	`,
    CenterReviewContainer: styled.div`
  
          &:nth-child(1) {
         * {
                  border: none;
          }
      }
          @media screen and (min-width:1200px) {
              width:720px;
              margin:0 auto;
              padding-left:0px;
          }
      `,

}

const PartnerDetailForCompleted = () => {
    const nextPage = useRef(1)
    const [showScrollView, setShowScrollView] = useState(true)
    const [visibleTermsModal, setVisibleTermsModal] = useState(false)

    const isDesktop = useMedia({
        minWidth: 1200,
    })
    const history = useHistory()
    const router = useRouter()
    const params = useParams<{ adminId: string }>()
    const dispatch = useDispatch()

    const getPartnerDetailCompleted = useSelector(partnerSelector.getPartnerDetailCompleted)
    const getReviewCompList = useSelector(partnerSelector.getReviewList)
    const getFormData = useSelector(formSelector.getFormData)
    const getReviewList = useSelector(partnerSelector.getReviewList)

    const isMobile = useMedia({
        maxWidth: 767,
    })

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
        dispatch(partnerActions.fetchReviewListAsync.request({
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


    if (getPartnerDetailCompleted.loading) {
        return <Loading />
    }

    const handleMoreReview = () => {
        nextPage.current += 1;
        dispatch(partnerActions.fetchReviewMoreListAsync.request({
            adminId: params.adminId,
            page: nextPage.current,
            size: values.DEFAULT_REVIEW_LIST_SIZE
        }))
    }

    const toggleVisibleTerms = () => setVisibleTermsModal(!visibleTermsModal)


    const review = () => {
        if (getReviewList.data.length < 5) {
            return (
                <S.ReviewPreview>
                    <img src={require(`assets/images/review_${isMobile ? 'm' : 'pc'}.png`)} alt='review_img'/>
                </S.ReviewPreview>
            )
        }

        return (
            <div>
                {getReviewList.data.map((review, index) => {
                    return (
                        <Index key={index} id={review.id} created_at={review.created_at} professional={review.professional}
                               kind={review.kind} price={review.price} memo={review.memo} reply={review.reply} star={review.star}/>
                    )
                })}
            </div>
        )
    }

    return (
        <S.Container>
            {getPartnerDetailCompleted.data && (
                <>
                    {isDesktop ? <MainHeaderForDetail/> : <NavHeader title="이사업체 상세 정보"/>}
                    <PartnerInfo title={getPartnerDetailCompleted.data.title ? getPartnerDetailCompleted.data.title : values.DEFAULT_TEXT} profile_img={getPartnerDetailCompleted.data.profile_img} status={'automatch'}
                                 level={getPartnerDetailCompleted.data.level} pick_cnt={getPartnerDetailCompleted.data.pick_cnt} experience={getPartnerDetailCompleted.data.experience}
                                 description={getPartnerDetailCompleted.data.description} keywords={getPartnerDetailCompleted.data.keywords} adminname={getPartnerDetailCompleted.data.adminname} addition={getPartnerDetailCompleted.data.addition} />
                    <S.CenterTitleContainer>
                        <S.Wrap>
                            <S.Box>
                                <p>고객들의 업체 평가는 위매치 약관에 의해 보호 받는 저작물로서, 무단복제 및 배포를 금합니다. <span onClick={toggleVisibleTerms}>자세히</span></p>
                            </S.Box>
                            <S.Average>
                                <strong>고객평가</strong>
                            </S.Average>
                        </S.Wrap>
                        <TermsModal visible={visibleTermsModal} onClose={toggleVisibleTerms} />
                    </S.CenterTitleContainer>
                    <S.CenterReviewContainer>
                        {review()}
                    </S.CenterReviewContainer>
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
