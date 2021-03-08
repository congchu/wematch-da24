import { createReducer, ActionType } from 'typesafe-actions'

import * as actions from './actions'
import {INotice} from 'types/backoffice'


export type Actions = ActionType<typeof actions>

export interface BackofficeState {
    notice: {
        notices: INotice[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore: boolean;
    },
}

const initialState: BackofficeState  = {
    notice: {
        notices: [],
        loading: false,
        moreLoading: false,
        hasMore: false
    },
}

export default createReducer <BackofficeState, Actions>(initialState)
    .handleAction(actions.fetchNoticeListAsync.request, (state) => ({ ...state, notice: { ...state.notice, loading: true }}))
    .handleAction(actions.fetchNoticeListAsync.success, (state, action) => ({ ...state, notice: { notices: action.payload.notices, loading: false, hasMore: action.payload.has_more }}))
    .handleAction(actions.fetchNoticeMoreListAsync.request, (state) => ({ ...state, notice: { ...state.notice, moreLoading: true }}))
    .handleAction(actions.fetchNoticeMoreListAsync.success, (state, action) => ({ ...state, notice: { notices: [...state.notice.notices, ...action.payload.notices], loading: false, moreLoading: false, hasMore: action.payload.has_more}}))