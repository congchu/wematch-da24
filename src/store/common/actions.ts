import { IOrder } from 'store/user/types';
import { createAction, createAsyncAction } from 'typesafe-actions'
import * as types from './types'

export const fetchAddressListAsync = createAsyncAction(
    'FETCH_ADDRESS_LIST_REQUEST',
    'FETCH_ADDRESS_LIST_SUCCESS',
    'FETCH_ADDRESS_LIST_FAILURE'
)<types.RequestAddressProps, types.ResponseAddressProps, types.AddressErrorType>()

export const fetchAddressMoreListAsync = createAsyncAction(
    'FETCH_ADDRESS_LIST_MORE_REQUEST',
    'FETCH_ADDRESS_LIST_MORE_SUCCESS',
    'FETCH_ADDRESS_LIST_MORE_FAILURE'
)<types.RequestAddressProps, types.ResponseAddressProps, types.AddressErrorType>()

export const fetchMoveIdx = createAsyncAction(
    'FETCH_MOVE_IDX_REQUEST',
    'FETCH_MOVE_IDX_SUCCESS',
    'FETCH_MOVE_IDX_FAILURE'
)<types.RequestUserInfoInsert, types.RequestUserInfoInsertProps, undefined>()

export const fetchCompletedMoveIdx = createAsyncAction(
    'FETCH_COMPLETED_MOVE_IDX_REQUEST',
    'FETCH_COMPLETED_MOVE_IDX_SUCCESS',
    'FETCH_COMPLETED_MOVE_IDX_FAILURE',
)<types.RequestCompletedMoveIdxProps, IOrder, undefined>()

export const fetchDistance = createAsyncAction(
    'FETCH_DISTANCE_REQUEST',
    'FETCH_DISTANCE_SUCCESS',
    'FETCH_DISTANCE_FAILURE'
)<types.RequestDistanceType, types.ResponseDistanceType, undefined>()

export const setDeviceId = createAction('SET_DEVICE_ID')<string>();
export const setJuso = createAction('SET_JUSO')<{ start: types.Juso | null, end: types.Juso | null, distance: number }>()

export const resetAddressList = createAction('RESET_ADDRESS_LIST')()
export const resetAll = createAction('RESET_ALL')()
