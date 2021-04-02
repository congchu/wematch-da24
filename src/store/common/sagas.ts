import { push } from 'connected-react-router'
import { call, put, all, takeEvery, select, debounce} from 'redux-saga/effects'
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