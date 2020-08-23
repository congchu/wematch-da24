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
        loading: boolean;
    };
    insertInfo: {
        move_idx: string | null;
        loading: boolean
    }
}

const initialState: CommonState = {
    addressList: {
        data: undefined,
        loading: false
    },
    phoneVerify: {
        data: {
            "is_verified": undefined
        },
        loading: false
    },
    insertInfo: {
        move_idx: null,
        loading: false
    }
}

export default createReducer<CommonState, Actions>(initialState)
    .handleAction(actions.fetchAddressListAsync.request, (state) => ({ ...state, addressList: { ...state.addressList, loading: true }}))
    .handleAction(actions.fetchAddressListAsync.success, (state, action) => ({ ...state,  addressList: { data: action.payload, loading: false } }))
    .handleAction(actions.fetchVerifyCodeAsync.request, (state) => ({...state, phoneVerify: { ...state.phoneVerify, loading: true }}))
    .handleAction(actions.fetchVerifyCodeAsync.success, (state, action) => ({ ...state, phoneVerify: { data: action.payload, loading: false }}))
    .handleAction(actions.fetchUserInfoInsert.request, (state) => ({ ...state, insertInfo: { ...state.insertInfo, loading: true }}))
    .handleAction(actions.fetchUserInfoInsert.success, ((state, action) => ({ ...state, insertInfo: {move_idx: action.payload.move_idx, loading: false}})))
    .handleAction(actions.resetAll, (state) => ({ ...state, ...initialState }))