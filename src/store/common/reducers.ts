import { IOrder } from 'store/user/types';
import { createReducer, ActionType } from 'typesafe-actions'
import * as actions from './actions'
import * as types from './types';

export type Actions = ActionType<typeof actions>
export const CNT_PER_PAGE = 30

export interface CommonState {
    addressList: {
        data: types.Juso[];
        hasMore: boolean,
        loading: boolean;
        error: types.AddressErrorType | undefined
    };
    moveIdxData: {
        idx: string | null;
        loading: boolean
    },
    completedMove: {
        data: IOrder | null;
        loading: boolean;
        error: boolean;
    },
    deviceId: string;
    juso: {
        start: types.Juso | null,
        end : types.Juso | null,
        distance: number
    }
}

const initialState: CommonState = {
    addressList: {
        data: [],
        hasMore: false,
        loading: false,
        error: undefined,
    },
    moveIdxData: {
        idx: null,
        loading: false
    },
    completedMove: {
        data: null,
        loading: false,
        error: false,
    },
    deviceId: '',
    juso: {
        start: null,
        end: null,
        distance: 1
    }
}

export default createReducer<CommonState, Actions>(initialState)
    .handleAction(actions.fetchAddressListAsync.request, (state) => ({ ...state, addressList: { ...state.addressList, loading: true, error: undefined }}))
    .handleAction(actions.fetchAddressListAsync.success, (state, action) => ({ ...state, addressList: { data: action.payload.results.juso, loading: false, error: undefined, hasMore: action.payload.results.juso.length === CNT_PER_PAGE } }))
    .handleAction(actions.fetchAddressListAsync.failure, (state, action) => ({ ...state, addressList: { data: [], loading: false, error: action.payload, hasMore: false } }))
    .handleAction(actions.fetchAddressMoreListAsync.request, (state) => ({ ...state, addressList: { ...state.addressList, loading: true, error: undefined }}))
    .handleAction(actions.fetchAddressMoreListAsync.success, (state, action) => ({ ...state, addressList: { data: [...state.addressList.data, ...action.payload.results.juso], loading: false, error: undefined, hasMore: action.payload.results.juso.length === CNT_PER_PAGE } }))
    .handleAction(actions.fetchAddressMoreListAsync.failure, (state, action) => ({ ...state, addressList: { data: [], loading: false, error: action.payload, hasMore: false } }))
    .handleAction(actions.fetchMoveIdx.request, (state) => ({ ...state, moveIdxData: { ...state.moveIdxData, loading: true }}))
    .handleAction(actions.fetchMoveIdx.success, ((state, action) => ({ ...state, moveIdxData: {idx: action.payload.idx, loading: false}})))
    .handleAction(actions.fetchCompletedMoveIdx.request, (state) => ({...state, completedMove: {...state.completedMove, loading: true}}))
    .handleAction(actions.fetchCompletedMoveIdx.success, (state, action) => ({...state, completedMove: { loading: false, data: action.payload, error: false }}))
    .handleAction(actions.fetchCompletedMoveIdx.failure, (state, action) => ({...state, completedMove: { loading: false, data: null, error: true }}))
    .handleAction(actions.resetAll, (state) => ({ ...state, ...initialState }))
    .handleAction(actions.resetAddressList, (state) => ({ ...state, addressList: initialState.addressList }))
    .handleAction(actions.setDeviceId, (state, action) => ({...state, deviceId: action.payload}))
    .handleAction(actions.setJuso, (state, action) => ({ ...state, juso: action.payload }))
