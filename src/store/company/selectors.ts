import { createSelector } from 'reselect'
import { RootState } from '../index'

const getCompanyState = (state: RootState) => state.companyState

export const getCompanyDetail = createSelector(getCompanyState, state => state.detail)
export const getCompanyReviewList = createSelector(getCompanyState, state => state.review)