import { createReducer, ActionType } from 'typesafe-actions'
import * as actions from './actions'
import * as types from './types';

export type Actions = ActionType<typeof actions>

export interface CommonState {
    addressList: {
        data: types.ResponseAddressProps[] | undefined;
        loading: boolean;
    };
    moveIdxData: {
        idx: string | null;
        loading: boolean
    },
    deviceId: string;
}

const initialState: CommonState = {
    addressList: {
        data: undefined,
        loading: false
    },
    moveIdxData: {
        idx: null,
        loading: false
    },
    deviceId: '',
}

export default createReducer<CommonState, Actions>(initialState)
    .handleAction(actions.fetchAddressListAsync.request, (state) => ({ ...state, addressList: { ...state.addressList, loading: true }}))
    .handleAction(actions.fetchAddressListAsync.success, (state, action) => ({ ...state,  addressList: { data: action.payload, loading: false } }))
    .handleAction(actions.fetchMoveIdx.request, (state) => ({ ...state, moveIdxData: { ...state.moveIdxData, loading: true }}))
    .handleAction(actions.fetchMoveIdx.success, ((state, action) => ({ ...state, moveIdxData: {idx: action.payload.idx, loading: false}})))
    .handleAction(actions.resetAll, (state) => ({ ...state, ...initialState }))
    .handleAction(actions.setDeviceId, (state, action) => ({...state, deviceId: action.payload.deviceId}))