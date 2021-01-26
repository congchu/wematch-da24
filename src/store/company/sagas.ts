import { call, put, all, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'
import * as request from './requests'




export function* fetchCompanyDetailSaga(action: ActionType<typeof actions.fetchCompanyDetailAsync.request>) {
    try {
        const data = yield call(request.getCompanyDetail, action.payload.username)
        yield put(actions.fetchCompanyDetailAsync.success(data))
    } catch (e) {
        yield put(actions.fetchCompanyDetailAsync.failure())
    }
}

export function* fetchCompReviewListSaga(action: ActionType<typeof actions.fetchCompReviewListAsync.request>) {
    try {
        const data = yield call(request.getCompReviewList, action.payload.username, action.payload.page, action.payload.size)
        yield put(actions.fetchCompReviewListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchCompReviewListAsync.failure())
    }
}

export function* fetchCompReviewMoreListSaga(action: ActionType<typeof actions.fetchCompReviewMoreListAsync.request>) {
    try {
        const data = yield call(request.getCompReviewList, action.payload.username, action.payload.page, action.payload.size)
        yield put(actions.fetchCompReviewMoreListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchCompReviewMoreListAsync.failure())
    }
}


export default function* () {
    yield all([
        takeEvery(actions.fetchCompanyDetailAsync.request, fetchCompanyDetailSaga),
        takeEvery(actions.fetchCompReviewListAsync.request, fetchCompReviewListSaga),
        takeEvery(actions.fetchCompReviewMoreListAsync.request, fetchCompReviewMoreListSaga),
    ])
}
