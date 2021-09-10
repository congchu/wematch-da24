import React, { useEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use-media'
import { useRouter } from 'hooks/useRouter'

import {DownArrow, ProfileDefault, UpArrow} from 'components/Icon'
import Loading from 'components/Loading'
import MainHeader from 'components/common/MainHeader'
import TopGnb from 'components/TopGnb'
import PartnerInfo from 'components/da24/PartnerInfo/index'
import ToastPopup from 'components/wematch-ui/ToastPopup'
import SetType from 'components/SetType'
import Index from 'components/da24/Review'
import TermsModal from 'components/Modal/TermsModal'
import Review from 'components/da24/Review'

import * as partnerActions from 'store/partner/actions'
import * as partnerSelector from 'store/partner/selectors'
import * as formSelector from 'store/form/selectors'
import * as commonSelector from 'store/common/selectors'

import * as colors from 'styles/colors'
import * as values from 'constants/values'
import { some } from 'lodash'
import NewModal from "components/NewModalTemplate";



const S = {
    Container: styled.div`
    `,
    PartnerInfoContainer: styled.div`
		position:relative;
		margin-top:-16px;
		border-top-left-radius:10px;
		border-top-right-radius:10px;
		background:${colors.white};
		border-bottom:8px solid ${colors.lineDeco};
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-left:272px;
			border-bottom:0;
		}
	`,
    BottomContainer: styled.div`
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
    MoreList: styled.button`
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


    BtnSelect: styled.button<{ status: 'selected' | 'available' | 'unavailable', isSelected: boolean }>`
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
		${props => props.status === 'unavailable' && css`
			background-color:${colors.lineDefault};
			pointer-events: none;  
		`};
		@media screen and (min-width:1200px) {
			//position:relative;
			width: 720px;
			margin: 0 auto;
			left: 272px;
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
            padding-left: 272px;
        }       
        img {
            width: inherit;
            display: block;
            margin: 0 auto;
        }
    `,
    TitleContainer: styled.div`
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-left:272px;
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
    ReviewContainer: styled.div`
  
          &:nth-child(1) {
         * {
                  border: none;
          }
      }
          @media screen and (min-width:1200px) {
              width:720px;
              margin:0 auto;
              padding-left:272px;
          }
      `,


}

const PartnerImg = {
    WrapImg: styled.div<{margin: number}>`
		margin-top: ${props => props.margin && props.margin}px;
		
		@media screen and (min-width: 768px) {
			margin-top: ${props => props.margin && props.margin}px;
		}
		@media screen and (min-width:1200px) {
			position:relative;
			width:720px;
			margin:0 auto;
			padding-left:272px;
			margin-top: ${props => props.margin && props.margin + 45}px;
		}
	`,
    Title: styled.div`
		display:none;
		position:absolute;
		z-index:1;
		top:74px;
		left:50%;
		width:240px;
		margin-left:-496px;
		h3{
			font-size:32px;
			font-weight:700;
			letter-spacing:-1px;
			line-height:48px;
		}
		@media screen and (min-width:1200px) {
			display:block;
		}
	`,
    ProfileImg: styled.div<{profile_img: string}>`
		span{
			display:inline-block;
			width:100%;
			height:228px;
			background-image:url(${props => props.profile_img});
			background-size:cover;
			background-position:50% 50%;
			background-repeat:no-repeat;
			@media screen and (min-width:768px) {
				height:486px;
			}
			@media screen and (min-width:1200px) {
				height:474px;
			}
		}
		@media screen and (min-width:1200px) {
			margin-top:70px;
		}
	`,
    DefaultProfileImg: styled.div`
		position:relative;
	  	background-color:${colors.lineDefault};
	  	width:100%;
	  	height:228px;
	  	display: flex;
	  	justify-content: center;
	  	align-items: center;

	  	span{
	  		position:absolute;
	  		left:50%;
	  		top:50%;
	  		transform:translate(-50%, -50%);
	  		font-size: 18px;
			font-weight: bold;
			font-stretch: normal;
			font-style: normal;
			line-height: 0.89;
			letter-spacing: -1.29px;
			color: ${colors.white};
	  	}
	  	
		@media screen and (min-width:768px) {
			height:486px;
		}
		@media screen and (min-width:1200px) {
			height:474px;
		}
		@media screen and (min-width:1200px) {
			margin-top:70px;
		}
	`,
    Opacity: styled.div`
		position: absolute;
		left:0;
		top:0;
		width: 100%;
		height: 228px;
		background-color: rgba(0,0,0,0.4);
		
		@media screen and (min-width:768px) {
			height:486px;
		}
		@media screen and (min-width:1200px) {
			height:474px;
		}
	`
}


const PartnerDetail = () => {
    const nextPage = useRef(1)
    const [showScrollView, setShowScrollView] = useState(true)
    const [visibleTermsModal, setVisibleTermsModal] = useState(false)
    const [sessionVisible, setSessionVisible] = useState(false)
    const [unavailableCheck, setUnavailableCheck] = useState(false)

    const isDesktop = useMedia({
        minWidth: 1200,
    })
    const history = useHistory()
    const router = useRouter()
    const params = useParams<{ adminId: string }>()
    const dispatch = useDispatch()

    const getPartnerDetail = useSelector(partnerSelector.getPartnerDetail)
    const getReviewList = useSelector(partnerSelector.getReviewList)
    const getPartnerPick = useSelector(partnerSelector.getPartnerPick)
    const getMoveIdxData = useSelector(commonSelector.getMoveIdxData)
    const getFormData = useSelector(formSelector.getFormData)

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

    const handleSelected = () => {
        if (getPartnerDetail.data) {
            dispatch(partnerActions.setPartnerPick([getPartnerDetail.data]))
        }

        router.push('/partner/cart')
    }

    const isActive = () => {
        return some(getPartnerPick.data, {
            adminid: params.adminId
        })
    }

    const buttonText = (status: 'selected' | 'available' | 'unavailable') => {
        if (status === 'unavailable') {
            return '오늘 마감된 업체입니다.'
        }

        if (isActive()) {
            return '이미 선택된 업체입니다.'
        }

        return '이 업체에 견적 받아보기'
    }

    useEffect(() => {
        if (!getMoveIdxData.idx) {
            setSessionVisible(true)
        }

    }, [])

    useEffect(() => {
        if (getMoveIdxData.idx) {
            dispatch(partnerActions.fetchPartnerDetailAsync.request({
                adminId: params.adminId,
                idx: getMoveIdxData.idx
            }))
        }
        dispatch(partnerActions.fetchReviewListAsync.request({
            adminId: params.adminId,
            page: 1,
            size: values.DEFAULT_REVIEW_LIST_SIZE
        }))
    }, [dispatch, params.adminId])

    useEffect(() => {
        if (getMoveIdxData.idx && getPartnerDetail?.data?.status === 'unavailable' && !getPartnerDetail.loading && getPartnerDetail?.data?.adminid === params.adminId) {
            setUnavailableCheck(true)
        }
    }, [getPartnerDetail.loading])

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
            adminId: params.adminId,
            page: nextPage.current,
            size: values.DEFAULT_REVIEW_LIST_SIZE
        }))
    }

    const toggleVisibleTerms = () => setVisibleTermsModal(!visibleTermsModal)

    /* Partner Info  - UserImage */
    const partnerImage = () => {
        return(
            <PartnerImg.WrapImg margin={isMobile ? 48 : 72}>
                <PartnerImg.Title>
                    <h3>업체<br />직접선택</h3>
                </PartnerImg.Title>
                {getPartnerDetail.data?.profile_img ? (
                    <>
                        <PartnerImg.ProfileImg profile_img={getPartnerDetail.data?.profile_img}>
                            <span />
                        </PartnerImg.ProfileImg>
                    </>
                ) : (
                    <PartnerImg.DefaultProfileImg>
                        {getPartnerDetail.data?.status === "unavailable" && (<PartnerImg.Opacity />)}
                        <ProfileDefault width={60} height={60} color={colors.white} />
                        {getPartnerDetail.data?.status === "unavailable" && (<span>오늘 마감</span>)}
                    </PartnerImg.DefaultProfileImg>
                )}
            </PartnerImg.WrapImg>
        )
    }

    /* Review */
    const review = () => {
        if (getReviewList.data.length < 1) {
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
                        <Review key={index} id={review.id} created_at={review.created_at} professional={review.professional}
                               kind={review.kind} price={review.price} memo={review.memo} reply={review.reply} star={review.star}/>
                    )
                })}
            </div>
        )
    }

    return (
        <S.Container>
            {getPartnerDetail.data && (
                <>
                    {isDesktop ? <MainHeader isFixed={true}/> : <TopGnb title="이사업체 상세 정보" count={getPartnerPick.data.length} onPrevious={() => history.goBack()} showTruck={true} />}
                    {partnerImage()}
                    <S.PartnerInfoContainer>
                        <PartnerInfo title={getPartnerDetail.data.title ? getPartnerDetail.data.title : values.DEFAULT_TEXT} level={getPartnerDetail.data.level} pick_cnt={getPartnerDetail.data.pick_cnt}
                            experience={getPartnerDetail.data.experience} description={getPartnerDetail.data.description} keywords={getPartnerDetail.data.keywords}
                            adminname={getPartnerDetail.data.adminname} addition={getPartnerDetail.data.addition} />
                    </S.PartnerInfoContainer>
                    <S.TitleContainer>
                        <S.Wrap>
                            <S.Box>
                                <p>고객들의 업체 평가는 위매치 약관에 의해 보호 받는 저작물로서, 무단복제 및 배포를 금합니다. <span onClick={toggleVisibleTerms}>자세히</span></p>
                            </S.Box>
                            <S.Average>
                                <strong>고객평가</strong>
                            </S.Average>
                        </S.Wrap>
                        <TermsModal visible={visibleTermsModal} onClose={toggleVisibleTerms} />
                    </S.TitleContainer>
                    <S.ReviewContainer>
                        {review()}
                    </S.ReviewContainer>
                    <S.BottomContainer>
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
                                <S.BtnSelect onClick={handleSelected} isSelected={isActive()} status={getPartnerDetail.data.status} id="dsl_booking_detail_cta">{buttonText(getPartnerDetail.data.status)}</S.BtnSelect>
                                <S.TopBtn onClick={handleScrollTop}>
                                    <UpArrow color={colors.pointBlue} width={16} height={16} />
                                </S.TopBtn>
                            </S.ScrollView>
                        )}
                    </S.BottomContainer>
                </>
            )}
            <NewModal visible={sessionVisible} title={"정보 만료"} content={"현재 페이지의 정보가 만료되었습니다. 다시 조회해 주세요."} confirmClick={() => history.push('/')} confirmText={"홈으로 가기"}/>
            <ToastPopup visible={unavailableCheck} showHeaderCancelButton={false} confirmClick={() => setUnavailableCheck(!unavailableCheck)} confirmText={"확인"}>
                <p>오늘 마감된 업체</p>
                <span>해당 업체는 오늘 예약 및 상담 접수가 마감됐어요. 내일 오전에 다시 조회해보세요!</span>
            </ToastPopup>
        </S.Container>
    )
}

export default PartnerDetail
