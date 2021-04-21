import { call, put, all, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'
import * as request from './requests'
import {showToast} from 'components/common/Toast'


export function* fetchNoticeListSaga(action: ActionType<typeof actions.fetchNoticeListAsync.request>) {
    try {
        const data = yield call(request.getNoticeList)
        yield put(actions.fetchNoticeListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchNoticeListAsync.failure())
    }
}


export function* fetchFaqListSaga(action: ActionType<typeof actions.fetchFaqListAsync.request>) {
    try {
        const data = yield call(request.getFaqList)
        yield put(actions.fetchFaqListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchFaqListAsync.failure())
    }
}


export function* submitContactFormSaga(action: ActionType<typeof actions.submitContactFormAsync.request>) {
    try {
        const data = yield call(request.submitContactForm, action.payload.formData)
        yield put(actions.submitContactFormAsync.success(data))
        showToast({ message: '접수되었습니다. 감사합니다.', type: 'success'  })
    } catch (e) {
        yield put(actions.submitContactFormAsync.failure())
        showToast({ message: '에러가 발생했습니다.', type: 'error'  })
    }
}

export function* submitPartnerFormSaga(action: ActionType<typeof actions.submitPartnerFormAsync.request>) {
    try {
        const data = yield call(request.submitPartnerForm, action.payload.formData)
        yield put(actions.submitPartnerFormAsync.success(data))
        showToast({ message: '신청되었습니다. 확인 후 곧 답변을 드리도록 하겠습니다. 감사합니다.', type: 'success'  })
    } catch (e) {
        yield put(actions.submitPartnerFormAsync.failure())
        showToast({ message: '에러가 발생했습니다.', type: 'error'  })
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchNoticeListAsync.request, fetchNoticeListSaga),
        takeEvery(actions.fetchFaqListAsync.request, fetchFaqListSaga),
        takeEvery(actions.submitContactFormAsync.request, submitContactFormSaga),
        takeEvery(actions.submitPartnerFormAsync.request, submitPartnerFormSaga),

    ])
}
