import { createSelector } from 'reselect'
import { RootState } from '../index'

const getPartnerState = (state: RootState) => state.partnerState

export const getCompanyDetail = createSelector(getPartnerState, state => state.detail)
export const getCompanyReviewList = createSelector(getPartnerState, state => state.review)