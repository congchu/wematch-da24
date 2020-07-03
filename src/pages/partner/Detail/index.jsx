import React, { useCallback, useEffect, useState } from 'react'
import Styled from 'styled-components'
import queryString from 'query-string';
import { useParams, useHistory } from 'react-router-dom'
import { useMedia } from 'react-use-media'
import { isEmpty } from 'lodash'

import { DownArrow, UpArrow } from '../../../components/Icon'
import Loading from '../../../components/Loading'
import MainHeader from '../../../components/MainHeader'
import TopGnb from '../../../components/TopGnb'
import SetType from '../List/setType'
import UserImage from './userImage'
import PartnerInfo from './partnerInfo'
import LevelData from './levelData'
import Review from './review'

import { API_URL } from '../../../constants/env';
import { fetchDetail, fetchReviewList } from '../../../api/partner'
import * as colors from '../../../styles/colors'

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
    BtnSelect: Styled.button`
		position:fixed;
		z-index:5;
		left:0;
		right:0;
		bottom:0;
		width:100%;
		height:64px;
		font-size:18px;
		font-weight:700;
		background-color:${colors.pointBlue};
		color:${colors.white};
		cursor:pointer;
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
    `,
    ScrollView: Styled.div``
}

const PartnerDetail = ({location}) => {
    const isDesktop = useMedia({
        minWidth: 1200,
    })

    const defaultText = [
        '기술은 백두산급 정성은 에베레스트급 이사입니다.',
        '친절!정확!속도! 믿을 수 있는 이사전문가입니다.',
        '내 집처럼 섬세하게 완벽한 이사 해드립니다.',
        '이사 품질만은 양보할 수 없다! 확실하게 해드립니다.',
        '이사는 기본, 정리정돈까지 완벽을 추구합니다.'
    ]

    const defaultImage = [
        `https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_1.jpg`,
        `https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_2.jpg`,
        `https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_3.jpg`,
        `https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_4.jpg`,
        `https://wematch-booking.s3.ap-northeast-2.amazonaws.com/da24/default_profile_5.jpg`,
    ]

    const [detailLoading, setDetailLoading] = useState(false)
    const [partnerDetail, setPartnerDetail] = useState(undefined)
    const [reviewLoading, setReviewLoading] = useState(false)
    const [reviewList, setReviewList] = useState([])
    const [showScrollView, setShowScrollView] = useState(false)

    const history = useHistory()
    const params = useParams()

    const DEFAULT_SIZE = 5
    let page = 1

    const getReviewList = useCallback(async () => {
        try {
            setDetailLoading(true)
            const response = await fetchReviewList(params.username, page, DEFAULT_SIZE)
            setReviewList(response)
        } catch (e) {
        } finally {
            setDetailLoading(false)
        }
    }, [page, params.username])

    const getPartnerDetail = useCallback(async () => {
        try {
            setReviewLoading(true)
            const response = await fetchDetail(params.username)
            setPartnerDetail(response)
        } catch (e) {
        } finally {
            setReviewLoading(false)
        }

    }, [params.username])

    const getMoreReviewList = useCallback(async () => {
        page = page + 1
        setReviewLoading(true)
        const response = await fetchReviewList(params.username, page, DEFAULT_SIZE)
        setReviewList(prevState => ([...prevState, ...response]))
        setReviewLoading(false)
    }, [reviewList])

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
        history.goBack()
    }

    useEffect(() => {
        getPartnerDetail()
        getReviewList()
    }, [getPartnerDetail, getReviewList])

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        }
    }, [])

    if (detailLoading) {
        return <Loading />
    }

    const query = queryString.parse(location.search);

    return (
        <S.Container>
            {!isEmpty(partnerDetail) && (
                <>
                    {isDesktop ? <MainHeader /> : <TopGnb title="업체 직접 선택" count={0} onPrevious={() => history.goBack()}/>}
                    <SetType />
                    <UserImage profile_img={isEmpty(query.seed) ? partnerDetail.profile_img : defaultImage[query.seed]} />
                    <PartnerInfo title={isEmpty(query.seed) ? partnerDetail.title : defaultText[query.seed]} level={partnerDetail.level} pick_count={partnerDetail.pick_count} experience={partnerDetail.experience} description={partnerDetail.description} keyword={partnerDetail.keyword}/>
                    <LevelData review_count={partnerDetail.review_count} />
                    {reviewList.map((review, index) => (
                        <Review key={index} id={review.id} created_at={review.created_at} professional={review.professional} kind={review.kind} price={review.price} memo={review.memo} reply={review.reply} />
                    ))}
                    <S.BottomContainer>
                        <S.MoreList onClick={getMoreReviewList}>후기 더보기 <DownArrow width="16" height="16" /></S.MoreList>
                        {showScrollView && (
                            <S.ScrollView>
                                <S.BtnSelect onClick={handleSelected}>이 업체 선택하기</S.BtnSelect>
                                <S.TopBtn onClick={handleScrollTop}>
                                    <UpArrow color={colors.pointBlue} width="16" height="16" />
                                </S.TopBtn>
                            </S.ScrollView>
                        )}
                    </S.BottomContainer>
                    {reviewLoading && (
                        <S.ReviewMoreLoading>
                            로딩중..
                        </S.ReviewMoreLoading>
                    )}
                </>
            )}
        </S.Container>
    )
}

export default PartnerDetail