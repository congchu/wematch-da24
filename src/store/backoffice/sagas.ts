import { call, put, all, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'
import * as request from './requests'


export function* fetchNoticeListSaga(action: ActionType<typeof actions.fetchNoticeListAsync.request>) {
    try {
        const data = yield call(request.getNoticeList, action.payload.page, action.payload.size)
        yield put(actions.fetchNoticeListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchNoticeListAsync.failure())
        console.log('실패')
    }
}


export default function* () {
    yield all([
        takeEvery(actions.fetchNoticeListAsync.request, fetchNoticeListSaga),

    ])
}
