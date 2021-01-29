import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useMedia} from "react-use-media";

import Index from '../Review';
import TermsModal from "components/Modal/TermsModal";

import * as partnerSelector from "store/partner/selectors";
import * as partnerActions from "store/partner/actions";
import * as values from "constants/values";
import * as colors from "styles/colors";

const S = {
  TitleContainer: styled.div`
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-left:272px;
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
}

const ReviewContainer = () => {
  const dispatch = useDispatch()

  const [visibleTermsModal, setVisibleTermsModal] = useState(false)
  const params = useParams<{adminId: string}>()
  const getReviewList = useSelector(partnerSelector.getReviewList)

  const isMobile = useMedia({
    maxWidth: 767,
  })

  useEffect(() => {
    dispatch(partnerActions.fetchReviewListAsync.request({
      username: params.adminId,
      page: 1,
      size: values.DEFAULT_REVIEW_LIST_SIZE
    }))
  }, [dispatch])

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
    <>
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
      {/*Index Item*/}
      {review()}
    </>
  )
};

export default ReviewContainer