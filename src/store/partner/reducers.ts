import { createReducer, ActionType } from 'typesafe-actions'

import * as actions from './actions'
import {IPartnerList, IPartnerDetail, IReview, IPartnerDetailForCompleted, IReviewForCompleted} from 'types/partner'

import { DEFAULT_REVIEW_LIST_SIZE } from 'constants/values'

export type Actions = ActionType<typeof actions>

export interface PartnerState {
    pick: {
        data: IPartnerDetail[];
    },
    list: {
        data: IPartnerDetail[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore: boolean;
    }
    detail: {
        data: IPartnerDetail | undefined;
        loading: boolean;
    },
    detailForCompleted: {
        data: IPartnerDetailForCompleted | undefined;
        loading: boolean;
    },
    review: {
        data: IReview[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore: boolean;
    },
    reviewForCompleted: {
        data: IReviewForCompleted[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore: boolean;
    },
    cart: any,
    matching: {
        idx: string;
        loading: boolean;
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
    detailForCompleted: {
        data: undefined,
        loading: false
    },
    review: {
        data: [],
        loading: false,
        moreLoading: false,
        hasMore: false
    },
    reviewForCompleted: {
        data: [],
        loading: false,
        moreLoading: false,
        hasMore: false
    },
    cart: {
        recommendedList: [],
        selectedList: [],
        loading: false
    },
    matching: {
        idx: '',
        loading: false
    }
}

export default createReducer<PartnerState, Actions>(initialState)
    .handleAction(actions.setPartnerPick, (state, action) => ({ ...state, pick: { data: [...state.pick.data, ...action.payload] } }))
    .handleAction(actions.fetchPartnerListAsync.request, (state) => ({ ...state, list: { ...state.list, loading: true }}))
    .handleAction(actions.fetchPartnerListAsync.success, (state, action) => ({ ...state, list: { data: action.payload.data, hasMore: action.payload.has_more, loading: false}}))
    .handleAction(actions.fetchPartnerMoreListAsync.request, (state) => ({ ...state, list: { ...state.list, loading: false }}))
    .handleAction(actions.fetchPartnerMoreListAsync.success, (state, action) => ({ ...state, list: { data: [...state.list.data, ...action.payload.data], hasMore: action.payload.has_more, loading: false}}))
    .handleAction(actions.fetchPartnerDetailAsync.request, (state) => ({ ...state, detail: { ...state.detail, loading: true }, review: {data: [], loading: false, moreLoading: false, hasMore: false}}))
    .handleAction(actions.fetchPartnerDetailAsync.success, (state, action) => ({ ...state, detail: { data: action.payload, loading: false }}))
    .handleAction(actions.fetchReviewListAsync.request, (state) => ({ ...state, review: { ...state.review, loading: true }}))
    .handleAction(actions.fetchReviewListAsync.success, (state, action) => ({ ...state, review: { data: action.payload.data, loading: false, hasMore: action.payload.has_more }}))
    .handleAction(actions.fetchReviewMoreListAsync.request, (state) => ({ ...state, review: { ...state.review, loading: false, moreLoading: true }}))
    .handleAction(actions.fetchReviewMoreListAsync.success, (state, action) => ({ ...state, review: { data: [...state.review.data, ...action.payload.data], loading: false, moreLoading: false, hasMore: action.payload.has_more}}))
    .handleAction(actions.fetchCartListAsync.request, (state => ({...state, cart: {selectedList: state.pick.data, loading: true}})))
    .handleAction(actions.fetchCartListAsync.success, (state,action) => ({...state, cart: {recommendedList: action.payload.data, loading: false, selectedList: state.cart.selectedList}}))
    .handleAction(actions.fetchMatchingAsync.request, (state) => ({...state, matching: {...state.matching, loading: true}}))
    .handleAction(actions.fetchMatchingAsync.success, (state,action) => ({...state, matching: {idx: action.payload.data.data.idx, loading: false}}))
    .handleAction(actions.cartReset, (state) => ({...state, cart: {recommendedList: [], selectedList: [], loading: false}, pick: {data: []}}))
    .handleAction(actions.partnerListReset, (state) => ({...state, list: {...state.list, data: []}}))
    .handleAction(actions.fetchPartnerDetailCompAsync.request, (state) => ({ ...state, detailForCompleted: { ...state.detailForCompleted, loading: true }, reviewForCompleted: {data: [], loading: false, moreLoading: false, hasMore: false}}))
    .handleAction(actions.fetchPartnerDetailCompAsync.success, (state, action) => ({ ...state, detailForCompleted: { data: action.payload, loading: false }}))
    .handleAction(actions.fetchReviewListCompAsync.request, (state) => ({ ...state, reviewForCompleted: { ...state.reviewForCompleted, loading: true }}))
    .handleAction(actions.fetchReviewListCompAsync.success, (state, action) => ({ ...state, reviewForCompleted: { data: action.payload.data, loading: false, hasMore: action.payload.has_more }}))
    .handleAction(actions.fetchReviewMoreListCompAsync.request, (state) => ({ ...state, reviewForCompleted: { ...state.reviewForCompleted, loading: false, moreLoading: true }}))
    .handleAction(actions.fetchReviewMoreListCompAsync.success, (state, action) => ({ ...state, reviewForCompleted: { data: [...state.reviewForCompleted.data, ...action.payload.data], loading: false, moreLoading: false, hasMore: action.payload.has_more}}))