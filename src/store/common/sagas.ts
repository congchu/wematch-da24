import { push } from 'connected-react-router'
import { call, put, all, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { showToast } from 'components/common/Toast'

import * as actions from './actions'
import * as requests from './requests'

export function* fetchAddressListSaga(action: ActionType<typeof actions.fetchAddressListAsync.request>) {
    try {
        const {data} = yield call(requests.getAddress, action.payload)
        yield put(actions.fetchAddressListAsync.success(data))
    } catch (e) {
        const errorCode = ['E0009', 'E0010', 'EE0011', 'E0012', 'E0013']
        if (!errorCode.includes(e.error.code)) {
            showToast({
                message: e.error.message,
                type: 'error',
                position: 'bottom'
            })
        }
        yield put(actions.fetchAddressListAsync.failure(e.error))
    }
}


export function* fetchMoveIdxSaga(action: ActionType<typeof actions.fetchMoveIdx.request>) {
    try {
        const data = yield call(requests.getMoveIdx, action.payload)
        yield put(actions.fetchMoveIdx.success(data.data.data))
        yield put(push('/partner/list'));
    } catch (e) {
        yield put(actions.fetchMoveIdx.failure())
    }
}

export function* fetchCompletedMoveSaga(action: ActionType<typeof actions.fetchCompletedMoveIdx.request>) {
    try {
        const { data } = yield call(requests.getCompletedMoveIdx, action.payload.inquiry_idx)
        // console.log(data);
        yield put(actions.fetchCompletedMoveIdx.success(data))
    } catch(e) {
        yield put(actions.fetchCompletedMoveIdx.failure())
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchAddressListAsync.request, fetchAddressListSaga),
        takeEvery(actions.fetchMoveIdx.request, fetchMoveIdxSaga),
        takeEvery(actions.fetchCompletedMoveIdx.request, fetchCompletedMoveSaga)
    ])
}
