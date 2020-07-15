import { createReducer, ActionType } from 'typesafe-actions'

import * as actions from './actions'
import { PartnerList, PartnerDetail, Review } from 'types/partner'

export type Actions = ActionType<typeof actions>

export interface PartnerState {
    pick: {
        data: PartnerDetail[];
    },
    list: {
        data: PartnerList[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore?: boolean;
    }
    detail: {
        data: PartnerDetail | undefined;
        loading: boolean;
    },
    review: {
        data: Review[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore?: boolean;
    }
}

const initialState: PartnerState = {
    pick: {
        data: [],
    },
    list: {
        data: [],
        loading: false,
        hasMore: false
    },
    detail: {
        data: undefined,
        loading: false
    },
    review: {
        data: [],
        loading: false,
        moreLoading: false,
        hasMore: false
    }
}

export default createReducer<PartnerState, Actions>(initialState)
    .handleAction(actions.setPartnerPick, (state, action) => ({ ...state, pick: { data: [...state.pick.data, ...action.payload] } }))
    .handleAction(actions.fetchPartnerListAsync.request, (state) => ({ ...state, list: { ...state.list, loading: true }}))
    .handleAction(actions.fetchPartnerListAsync.success, (state, action) => ({ ...state, list: { data: action.payload, loading: false, hasMore: action.payload.length === 10 }}))
    .handleAction(actions.fetchPartnerMoreListAsync.request, (state) => ({ ...state, list: { ...state.list, loading: false }}))
    .handleAction(actions.fetchPartnerMoreListAsync.success, (state, action) => ({ ...state, list: { data: [...state.list.data, ...action.payload], loading: false, hasMore: action.payload.length === 10 }}))
    .handleAction(actions.fetchPartnerDetailAsync.request, (state) => ({ ...state, detail: { ...state.detail, loading: true }}))
    .handleAction(actions.fetchPartnerDetailAsync.success, (state, action) => ({ ...state, detail: { data: action.payload, loading: false }}))
    .handleAction(actions.fetchReviewListAsync.request, (state) => ({ ...state, review: { ...state.review, loading: true }}))
    .handleAction(actions.fetchReviewListAsync.success, (state, action) => ({ ...state, review: { data: action.payload, loading: false, hasMore: action.payload.length === 5 }}))
    .handleAction(actions.fetchReviewMoreListAsync.request, (state) => ({ ...state, review: { ...state.review, loading: false, moreLoading: true }}))
    .handleAction(actions.fetchReviewMoreListAsync.success, (state, action) => ({ ...state, review: { data: [...state.review.data, ...action.payload], loading: false, moreLoading: false, hasMore: action.payload.length === 5 }}))
