import React, {useEffect} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";

import * as partnerSelector from "store/partner/selectors";
import * as partnerActions from "../../../../../store/partner/actions";
import * as values from "../../../../../constants/values";
import {useParams} from "react-router-dom";

const ReviewContainer = () => {
  const dispatch = useDispatch()
  const params = useParams<{username: string}>()
  const getReviewList = useSelector(partnerSelector.getReviewList)

  useEffect(() => {
    dispatch(partnerActions.fetchReviewListAsync.request({
      username: params.username,
      page: 1,
      size: values.DEFAULT_REVIEW_LIST_SIZE
    }))
  }, [dispatch])

  return (
    <div>return</div>
  )
};

export default ReviewContainer