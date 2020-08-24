import { call, put, all, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'
import * as requests from './requests'
import * as constants from '../../constants/env'

export function* fetchAddressListSaga(action: ActionType<typeof actions.fetchAddressListAsync.request>) {
    try {
        const data = yield call(requests.getAddress, action.payload.dong)
        yield put(actions.fetchAddressListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchAddressListAsync.failure())
    }
}

export function* fetchVerifySendMessageSaga(action: ActionType<typeof actions.fetchVerifySendMessageAsync.request>) {
    try {
        const data = yield call(requests.verifySendMessage, action.payload.phone)
        yield put(actions.fetchVerifySendMessageAsync.success(data))
    } catch (e) {
        yield put(actions.fetchVerifySendMessageAsync.failure())
    }
}

export function* fetchVerifyCodeSaga(action: ActionType<typeof actions.fetchVerifyCodeAsync.request>) {
    try {
        const data = yield call(requests.verifyAuthCode, action.payload.phone, action.payload.code)
        yield put(actions.fetchVerifyCodeAsync.success(data))
    } catch (e) {
        yield put(actions.fetchVerifyCodeAsync.failure())
    }
}

export function* fetchUserInfoInsertSaga(action: ActionType<typeof actions.fetchUserInfoInsert.request>) {
    try {
        const data = yield call(requests.postUserInfo, action.payload)
        yield put(actions.fetchUserInfoInsert.success(data.data))
    } catch (e) {
        yield put(actions.fetchUserInfoInsert.failure())
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchAddressListAsync.request, fetchAddressListSaga),
        takeEvery(actions.fetchVerifySendMessageAsync.request, fetchVerifySendMessageSaga),
        takeEvery(actions.fetchVerifyCodeAsync.request, fetchVerifyCodeSaga),
        takeEvery(actions.fetchUserInfoInsert.request, fetchUserInfoInsertSaga)
    ])
}