import { call, put, all, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'
import * as request from './requests'


export function* fetchNoticeListSaga(action: ActionType<typeof actions.fetchNoticeListAsync.request>) {
    try {
        const data = yield call(request.getNoticeList, action.payload.page, action.payload.size)
        yield put(actions.fetchNoticeListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchNoticeMoreListAsync.failure())
        console.log('실패')
    }
}

export function* fetchNoticeMoreListSaga(action: ActionType<typeof actions.fetchNoticeMoreListAsync.request>) {
    try {
        const data = yield call(request.getNoticeList, action.payload.page, action.payload.size)
        yield put(actions.fetchNoticeMoreListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchNoticeMoreListAsync.failure())
    }
}

export function* fetchFaqListSaga(action: ActionType<typeof actions.fetchFaqListAsync.request>) {
    try {
        const data = yield call(request.getFaqList, action.payload.page, action.payload.size)
        yield put(actions.fetchFaqListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchFaqListAsync.failure())
        console.log('실패')
    }
}

export function* fetchFaqMoreListSaga(action: ActionType<typeof actions.fetchFaqMoreListAsync.request>) {
    try {
        const data = yield call(request.getFaqList, action.payload.page, action.payload.size)
        yield put(actions.fetchFaqMoreListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchFaqMoreListAsync.failure())
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchNoticeListAsync.request, fetchNoticeListSaga),
        takeEvery(actions.fetchNoticeMoreListAsync.request, fetchNoticeMoreListSaga),
        takeEvery(actions.fetchFaqListAsync.request, fetchFaqListSaga),
        takeEvery(actions.fetchFaqMoreListAsync.request, fetchFaqMoreListSaga),

    ])
}
