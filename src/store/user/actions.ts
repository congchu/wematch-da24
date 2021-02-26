import { IUser } from "types/auth";
import { createAction, createAsyncAction } from "typesafe-actions";
import * as types from './types';

export const fetchUserConsultAsync = createAsyncAction(
    "FETCH_USER_CONSULT_REQUEST",
    "FETCH_USER_CONSULT_SUCCESS",
    "FETCH_USER_CONSULT_FAILURE",
)<{name: string, phone: string}, {name: string; phone: string; clean_orders: types.IOrder[]; move_orders: types.IOrder[]; }, undefined>()

export const fetchSignInAsync = createAsyncAction(
    'FETCH_SIGN_IN_REQUEST',
    'FETCH_SIGN_IN_SUCCESS',
    'FETCH_SIGN_IN_FAILURE'
)<types.RequestSignInProps, types.ResponseSignInProps, undefined>()


export const fetchSignUpAsync = createAsyncAction(
    'FETCH_SIGN_UP_REQUEST',
    'FETCH_SIGN_UP_SUCCESS',
    'FETCH_SIGN_UP_FAILURE'
)<types.RequestSignUpProps, types.ResponseSignUpProps, undefined>()

export const fetchVerifySendMessageAsync = createAsyncAction(
    'FETCH_VERIFY_SEND_MESSAGE_REQUEST',
    'FETCH_VERIFY_SEND_MESSAGE_SUCCESS',
    'FETCH_VERIFY_SEND_MESSAGE_FAILURE'
)<types.RequestVerifySendMessageProps, types.ResponseVerifySendMessageProps, undefined>()

export const fetchVerifyCodeAsync = createAsyncAction(
    'FETCH_VERIFY_CODE_REQUEST',
    'FETCH_VERIFY_CODE_SUCCESS',
    'FETCH_VERIFY_CODE_FAILURE'
)<types.RequestVerifyAuthCodeProps, types.ResponseVerifyCodeProps, undefined>()

export const fetchGetUserAsync = createAsyncAction(
    'FETCH_GET_USER_REQUEST',
    'FETCH_GET_USER_SUCCESS',
    'FETCH_GET_USER_FAILURE',
)<{token: string}, {token: string, user: IUser}, undefined>()

export const selectOrder = createAction('SELECT_ORDER')<{order: types.IOrder}>()
export const resetOrder = createAction('RESET_ORDER')();

export const signOut = createAction("SIGN_OUT")();

export const signIn = createAction('SIGN_IN')<{prevPage: types.ESignInCase}>();

export const phoneVerifyCancel = createAction('PHONE_VERIFY_CANCEL')();