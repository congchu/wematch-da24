import { call, put, all, takeEvery, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import * as requests from './requests'
import * as constants from '../../constants/env'
import { setAgree } from 'store/form/actions'


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

export function* fetchMoveIdxSaga(action: ActionType<typeof actions.fetchMoveIdx.request>) {
    try {
        const data = yield call(requests.getMoveIdx, action.payload)
        yield put(actions.fetchMoveIdx.success(data.data.data))
    } catch (e) {
        yield put(actions.fetchMoveIdx.failure())
    }
}


export default function* () {
    yield all([
        takeEvery(actions.fetchAddressListAsync.request, fetchAddressListSaga),
        takeEvery(actions.fetchVerifySendMessageAsync.request, fetchVerifySendMessageSaga),
        takeEvery(actions.fetchVerifyCodeAsync.request, fetchVerifyCodeSaga),
        takeEvery(actions.fetchMoveIdx.request, fetchMoveIdxSaga),
    ])
}