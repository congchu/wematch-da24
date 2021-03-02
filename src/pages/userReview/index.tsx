import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import ReviewItem from './ReviewItem/reviewItem'
import {useDispatch, useSelector} from 'react-redux'

import * as partnerActions from 'store/partner/actions'
import * as partnerSelector from 'store/partner/selectors'
import * as values from 'constants/values'
import ReviewSkeleton from 'components/common/Skeleton/reviewSkeleton'
import useInfiniteScroll from 'hooks/useInfiniteScroll'

const S = {
    Container: styled.div`
        margin-top: 0px;
        @media screen and (min-width: 1200px){
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
      em{
        font-weight: 600;
      }
      @media screen and (min-width: 768px){
        padding-left: 0;
      }
      @media screen and (min-width: 1200px){
        display: none;
        margin-left: -496px;
        font-weight: bold;
        font-size: 24px;
        line-height: 36px;
      }
    `,
}

export default function UserReviewPage() {

    const moreComments = () => {
        nextPage.current += 1
        dispatch(partnerActions.fetchCommentMoreListAsync.request({
            page: nextPage.current,
            size: values.DEFAULT_COMMENT_LIST_SIZE
        }))
        setIsFetching(false)
    }

    const nextPage = useRef(1)
    const [isFetching, setIsFetching] = useInfiniteScroll(moreComments)

    const dispatch = useDispatch()
    const getCommentList = useSelector(partnerSelector.getCommentList)

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    useEffect(() => {
        dispatch(partnerActions.fetchCommentListAsync.request({
            page: 1,
            size: values.DEFAULT_COMMENT_LIST_SIZE
        }))
    }, [])

    return (
        <>
            <Layout title='이용자 평가 현황' subTitle={<>실제 이용한 고객의<br/>업체평가입니다</>}>
                <S.Container>
                    <S.Title><em>실제 이용한 고객</em>의<br/>업체평가입니다</S.Title>
                    <div>
                        {getCommentList.loading ? <ReviewSkeleton/> : (
                            getCommentList.data.map((comment, index) => {
                                return (
                                    <ReviewItem adminid={comment.partner} partnerName={comment.area + " " + comment.level  + "등급 업체"}
                                                userId={comment.id*7} created_at={comment.created_at}
                                                star={comment.star} price={comment.price} kind={comment.kind} professional={comment.professional}
                                                reviewContents={comment.memo} reply={comment.reply}/>
                                )
                            })
                        )}
                    </div>
                </S.Container>
            </Layout>
        </>

    )

}