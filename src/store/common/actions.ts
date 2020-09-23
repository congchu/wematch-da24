import { createAction, createAsyncAction } from 'typesafe-actions'
import * as types from './types'

export const fetchAddressListAsync = createAsyncAction(
    'FETCH_ADDRESS_REQUEST',
    'FETCH_ADDRESS_SUCCESS',
    'FETCH_ADDRESS_FAILURE'
)<types.RequestAddressProps, types.ResponseAddressProps[], undefined>()

export const fetchVerifySendMessageAsync = createAsyncAction(
    'FETCH_VERIFY_SEND_MESSAGE_REQUEST',
    'FETCH_VERIFY_SEND_MESSAGE_SUCCESS',
    'FETCH_VERIFY_SEND_MESSAGE_FAILURE'
)<types.RequestVerifySendMessageProps, types.ResponseVerifySendMessageProps, undefined>()


export const resetAll = createAction('RESET_ALL')();

export const fetchVerifyCodeAsync = createAsyncAction(
    'FETCH_VERIFY_CODE_REQUEST',
    'FETCH_VERIFY_CODE_SUCCESS',
    'FETCH_VERIFY_CODE_FAILURE'
)<types.RequestVerifyAuthCodeProps, types.ResponseVerifyCodeProps, undefined>()

export const fetchMoveIdx = createAsyncAction(
    'FETCH_MOVE_IDX_REQUEST',
    'FETCH_MOVE_IDX_SUCCESS',
    'FETCH_MOVE_IDX_FAILURE'
)<types.RequestUserInfoInsert, types.RequestUserInfoInsertProps, undefined>()