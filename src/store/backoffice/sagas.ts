import {call, put, all, takeEvery, select} from 'redux-saga/effects'
import {push} from "connected-react-router"
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'
import * as request from './requests'
import * as backofficeSelector from './selectors'


export function* fetchNoticeListSaga(action: ActionType<typeof actions.fetchNoticeListAsync.request>) {
    try {
        const data = yield call(request.getNoticeList, action.payload.page, action.payload.size)
        yield put(actions.fetchNoticeListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchNoticeMoreListAsync.failure())
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


export function* submitContactFormSaga(action: ActionType<typeof actions.submitContactFormAsync.request>) {
    try {
        // const data = yield call(request.submitContactForm, action.payload.formData)
        const data = yield select(backofficeSelector.getContactForm)
        yield put(actions.submitContactFormAsync.success(data))
        /* TODO: 멘트가 이상합니다. */
        alert('접수되었습니다. 고객님의 쓴소리 귀 기울여 듣도록 하겠습니다. 감사합니다.')
        yield put(push('/contact'))
    } catch (e) {
        yield put(actions.submitContactFormAsync.failure())
        alert('에러가 발생했습니다.')
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchNoticeListAsync.request, fetchNoticeListSaga),
        takeEvery(actions.fetchNoticeMoreListAsync.request, fetchNoticeMoreListSaga),
        takeEvery(actions.submitContactFormAsync.request, submitContactFormSaga),

    ])
}
