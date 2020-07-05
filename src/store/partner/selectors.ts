import { createSelector } from 'reselect'
import { RootState } from '../index'

const getPartnerState = (state: RootState) => state.partnerState

export const getPartnerPick = createSelector(getPartnerState, state => state.pick)
export const getPartnerList = createSelector(getPartnerState, state => state.list)
export const getPartnerDetail = createSelector(getPartnerState, state => state.detail)
export const getReviewList = createSelector(getPartnerState, state => state.review)
