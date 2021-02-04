import { createAction, createAsyncAction } from 'typesafe-actions'
import * as types from './types'

export const fetchAddressListAsync = createAsyncAction(
    'FETCH_ADDRESS_REQUEST',
    'FETCH_ADDRESS_SUCCESS',
    'FETCH_ADDRESS_FAILURE'
)<types.RequestAddressProps, types.ResponseAddressProps[], undefined>()

export const resetAll = createAction('RESET_ALL')();

export const fetchMoveIdx = createAsyncAction(
    'FETCH_MOVE_IDX_REQUEST',
    'FETCH_MOVE_IDX_SUCCESS',
    'FETCH_MOVE_IDX_FAILURE'
)<types.RequestUserInfoInsert, types.RequestUserInfoInsertProps, undefined>()