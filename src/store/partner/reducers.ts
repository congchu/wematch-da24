import { createReducer, ActionType } from 'typesafe-actions'

import * as actions from './actions'
import { PartnerList, PartnerDetail, Review } from 'types/partner'

import { DEFAULT_REVIEW_LIST_SIZE } from 'constants/values'

export type Actions = ActionType<typeof actions>

export interface PartnerState {
    pick: {
        data: PartnerDetail[];
    },
    list: {
        data: PartnerDetail[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore: boolean;
    }
    detail: {
        data: PartnerDetail | undefined;
        loading: boolean;
    },
    review: {
        data: Review[];
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
    review: {
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
    .handleAction(actions.fetchPartnerDetailAsync.request, (state) => ({ ...state, detail: { ...state.detail, loading: true }}))
    .handleAction(actions.fetchPartnerDetailAsync.success, (state, action) => ({ ...state, detail: { data: action.payload, loading: false }}))
    .handleAction(actions.fetchReviewListAsync.request, (state) => ({ ...state, review: { ...state.review, loading: true }}))
    .handleAction(actions.fetchReviewListAsync.success, (state, action) => ({ ...state, review: { data: action.payload.data, loading: false, hasMore: action.payload.has_more }}))
    .handleAction(actions.fetchReviewMoreListAsync.request, (state) => ({ ...state, review: { ...state.review, loading: false, moreLoading: true }}))
    .handleAction(actions.fetchReviewMoreListAsync.success, (state, action) => ({ ...state, review: { data: [...state.review.data, ...action.payload.data], loading: false, moreLoading: false, hasMore: action.payload.has_more}}))
    .handleAction(actions.fetchCartListAsync.request, (state => ({...state, cart: {selectedList: state.pick.data, loading: true}})))
    .handleAction(actions.fetchCartListAsync.success, (state,action) => (
            {
                ...state,
                cart: {
                    recommendedList: action.payload.data.filter(({ id: id1 } : any) => !state.cart.selectedList.some(({ id: id2 }: any) => id2 === id1)),
                    loading: false,
                    selectedList: state.cart.selectedList
                }
            }
            ))
    .handleAction(actions.fetchMatchingAsync.request, (state) => ({...state, matching: {...state.matching, loading: true}}))
    .handleAction(actions.fetchMatchingAsync.success, (state,action) => ({...state, matching: {idx: action.payload.data.data.idx, loading: false}}))