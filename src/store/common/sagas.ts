import { call, put, all, takeEvery, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import * as requests from './requests'

export function* fetchAddressListSaga(action: ActionType<typeof actions.fetchAddressListAsync.request>) {
    try {
        const {data} = yield call(requests.getAddress, action.payload.dong)
        yield put(actions.fetchAddressListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchAddressListAsync.failure())
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
        takeEvery(actions.fetchMoveIdx.request, fetchMoveIdxSaga),
    ])
}