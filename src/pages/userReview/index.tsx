import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash'

import Layout from 'components/base/Layout'
import { useDispatch, useSelector } from 'react-redux'

import * as partnerActions from 'store/partner/actions'
import * as partnerSelector from 'store/partner/selectors'
import * as values from 'constants/values'
import ReviewSkeleton from 'components/common/Skeleton/reviewSkeleton'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import Review from 'components/da24/Review'
const S = {
  Container: styled.div`
    margin-top: 0px;
    @media screen and (min-width: 1200px) {
      margin-top: -30px;
    }
  `,
  Title: styled.div`
    display: block;
    padding: 40px 24px 9px;
    font-size: 22px;
    font-weight: 400;
    color: #333;
    line-height: 1.36;
    letter-spacing: -1px;
    em {
      font-weight: 600;
    }
    @media screen and (min-width: 768px) {
      padding-left: 0;
    }
    @media screen and (min-width: 1200px) {
      display: none;
      margin-left: -496px;
      font-weight: bold;
      font-size: 24px;
      line-height: 36px;
    }
  `
}

export default function UserReviewPage() {
  const dispatch = useDispatch()
  const getCommentList = useSelector(partnerSelector.getCommentList)

  useEffect(() => {
    if (isEmpty(getCommentList.data)) {
      window.scrollTo(0, 0)
      dispatch(
        partnerActions.fetchCommentListAsync.request({
          page: 1,
          size: values.DEFAULT_COMMENT_LIST_SIZE
        })
      )
    }
    window.scrollTo(0, 0)
  }, [])

  /* 스켈레톤 끝나면 스크롤 방지 해제 */
  if (!getCommentList.loading) {
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      <Layout
        title="이용자 평가 현황"
        subTitle={
          <>
            실제 이용한 고객의
            <br />
            업체평가입니다
          </>
        }>
        <S.Container>
          <S.Title>
            <em>실제 이용한 고객</em>의<br />
            업체평가입니다
          </S.Title>
          <div>
            {getCommentList.loading ? (
              <ReviewSkeleton />
            ) : (
              getCommentList.data.map((comment, index) => {
                return (
                  <Review
                    key={index}
                    id={comment.id}
                    created_at={comment.created_at}
                    professional={comment.professional}
                    partnerName={comment.area + '' + '이사업체'}
                    kind={comment.kind}
                    price={comment.price}
                    memo={comment.memo}
                    reply={comment.reply}
                    star={comment.star}
                    level={comment.level}
                    partner={comment.partner}
                  />
                )
              })
            )}
          </div>
        </S.Container>
      </Layout>
    </>
  )
}
