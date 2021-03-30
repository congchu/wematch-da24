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


export function* submitContactFormSaga(action: ActionType<typeof actions.submitContactFormAsync.request>) {
    try {
        const data = yield call(request.submitContactForm, action.payload.formData)
        yield put(actions.submitContactFormAsync.success(data))
        alert('접수되었습니다. 감사합니다.')
    } catch (e) {
        yield put(actions.submitContactFormAsync.failure())
        alert('에러가 발생했습니다.')
    }
}

export function* submitPartnerFormSaga(action: ActionType<typeof actions.submitPartnerFormAsync.request>) {
    try {
        const data = yield call(request.submitPartnerForm, action.payload.formData)
        yield put(actions.submitPartnerFormAsync.success(data))
        alert('신청되었습니다. 확인 후 곧 답변을 드리도록 하겠습니다. 감사합니다.')
    } catch (e) {
        yield put(actions.submitPartnerFormAsync.failure())
        alert('에러가 발생했습니다.')
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchNoticeListAsync.request, fetchNoticeListSaga),
        takeEvery(actions.fetchNoticeMoreListAsync.request, fetchNoticeMoreListSaga),
        takeEvery(actions.fetchFaqListAsync.request, fetchFaqListSaga),
        takeEvery(actions.fetchFaqMoreListAsync.request, fetchFaqMoreListSaga),
        takeEvery(actions.submitContactFormAsync.request, submitContactFormSaga),
        takeEvery(actions.submitPartnerFormAsync.request, submitPartnerFormSaga),

    ])
}
