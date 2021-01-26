import {ActionType, createReducer} from 'typesafe-actions';
import * as actions from './actions';
import {ICompanyDetail, ICompanyReview} from './type';

export type Actions = ActionType<typeof actions>

export interface CompanyState {
    detail: {
        data: ICompanyDetail | undefined;
        loading: boolean;
    },
    review: {
        data: ICompanyReview[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore: boolean;
    },

}

const initialState: CompanyState = {
    detail: {
        //loading 확인
        data: undefined,
        loading: false
    },
    review: {
        // loading 인확
        data: [],
        loading: false,
        moreLoading: false,
        hasMore: false
    }
}


export default createReducer<CompanyState, Actions>(initialState)
    .handleAction(actions.fetchCompanyDetailAsync.request, (state) => ({ ...state, detail: { ...state.detail, loading: true }, review: {data: [], loading: false, moreLoading: false, hasMore: false}}))
    .handleAction(actions.fetchCompanyDetailAsync.success, (state, action) => ({ ...state, detail: { data: action.payload, loading: false }}))
    .handleAction(actions.fetchCompReviewListAsync.request, (state) => ({ ...state, review: { ...state.review, loading: true }}))
    .handleAction(actions.fetchCompReviewListAsync.success, (state, action) => ({ ...state, review: { data: action.payload.data, loading: false, hasMore: action.payload.has_more }}))
    .handleAction(actions.fetchCompReviewMoreListAsync.request, (state) => ({ ...state, review: { ...state.review, loading: false, moreLoading: true }}))
    .handleAction(actions.fetchCompReviewMoreListAsync.success, (state, action) => ({ ...state, review: { data: [...state.review.data, ...action.payload.data], loading: false, moreLoading: false, hasMore: action.payload.has_more}}))
