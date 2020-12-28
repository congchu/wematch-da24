import { IUser } from 'types/auth';
import { createReducer, ActionType } from 'typesafe-actions'
import * as actions from './actions'
import * as types from './types';

export type Actions = ActionType<typeof actions>

export interface CommonState {
    addressList: {
        data: types.ResponseAddressProps[] | undefined;
        loading: boolean;
    };
    phoneVerify: {
        data: types.ResponseVerifyCodeProps;
        isSendMessage?: boolean;
        loading: boolean;
    };
    moveIdxData: {
        idx: string | null;
        loading: boolean
    }
    auth: {
        loginState: boolean;
        user: IUser | null;
        loading: boolean;
    }
}

const initialState: CommonState = {
    addressList: {
        data: undefined,
        loading: false
    },
    phoneVerify: {
        data: {
            "is_verified": undefined,
        },
        isSendMessage: false,
        loading: false
    },
    moveIdxData: {
        idx: null,
        loading: false
    },
    auth: {
        loginState: false,
        user: null,
        loading: false,
    }
}

export default createReducer<CommonState, Actions>(initialState)
    .handleAction(actions.fetchAddressListAsync.request, (state) => ({ ...state, addressList: { ...state.addressList, loading: true }}))
    .handleAction(actions.fetchAddressListAsync.success, (state, action) => ({ ...state,  addressList: { data: action.payload, loading: false } }))
    .handleAction(actions.fetchVerifySendMessageAsync.request, (state) => ({ ...state, phoneVerify: {...state.phoneVerify, loading: true}}))
    .handleAction(actions.fetchVerifySendMessageAsync.success, (state) => ({ ...state, phoneVerify: {...state.phoneVerify, isSendMessage: true, loading: false}}))
    .handleAction(actions.fetchVerifyCodeAsync.request, (state) => ({...state, phoneVerify: { ...state.phoneVerify, loading: true }}))
    .handleAction(actions.fetchVerifyCodeAsync.success, (state, action) => ({ ...state, phoneVerify: { data: action.payload, isSendMessage: !action.payload.is_verified, loading: false }}))
    .handleAction(actions.fetchMoveIdx.request, (state) => ({ ...state, moveIdxData: { ...state.moveIdxData, loading: true }}))
    .handleAction(actions.fetchMoveIdx.success, ((state, action) => ({ ...state, moveIdxData: {idx: action.payload.idx, loading: false}})))
    .handleAction(actions.resetAll, (state) => ({ ...state, ...initialState }))
    .handleAction(actions.fetchSignUpAsync.request, (state) => ({...state, auth: {...state.auth, loading: true}}))
    .handleAction(actions.fetchSignUpAsync.success, (state, action) => ({...state, auth: { ...state.auth, loginState: true, loading: false}}))
    .handleAction(actions.fetchSignInAsync.success, (state, action) =>({...state, auth: {...state.auth, user: action.payload}}))
