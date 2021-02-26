import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import ReviewItem from './ReviewItem/reviewItem'
import {useDispatch, useSelector} from "react-redux";

import * as partnerActions from 'store/partner/actions'
import * as partnerSelector from 'store/partner/selectors'
import * as values from "../../constants/values";
import Review from "../../components/da24/Review";

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

/*
* FEB 2020
* api 생성이후 다음내용 적용필요
*   1. infinite scroll 적용
*   2. props 확인/수정 및 ReviewItem 반영
* */

export default function UserReviewPage() {

    const nextPage = useRef(1)
    const dispatch = useDispatch()

    const getCommentList = useSelector(partnerSelector.getCommentList)

    useEffect(() => {
        dispatch(partnerActions.fetchCommentListAsync.request({
            page: 1,
            size: values.DEFAULT_REVIEW_LIST_SIZE
        }))
    }, [dispatch])

    return (
        <Layout title='이용자 평가 현황' subTitle={<>실제 이용한 고객의<br/>업체평가입니다</>}>
            <S.Container>
                <S.Title><em>실제 이용한 고객</em>의<br/>업체평가입니다</S.Title>
                <div>
                    {getCommentList.data.map((comment, index) => {
                        return (
                            <ReviewItem adminid={comment.partner} partnerName={comment.area + " " + comment.level  + "등급 업체"}
                                        userId={comment.id*7} created_at={comment.created_at}
                                        star={comment.star} price={comment.price} kind={comment.kind} professional={comment.professional}
                                        reviewContents={comment.memo} reply={comment.reply}/>
                        )
                    })}
                </div>
            </S.Container>
        </Layout>
    )

}