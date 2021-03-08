import { createSelector } from 'reselect'
import { RootState } from '../index'

const getBackofficeState = (state: RootState) => state.backofficeState

export const getNoticeList = createSelector(getBackofficeState, state => state.notice)
export const getFaqList = createSelector(getBackofficeState, state => state.faq)