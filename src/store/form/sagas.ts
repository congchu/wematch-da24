import { put, all, takeEvery, call } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { push } from 'connected-react-router'

import * as actions from './actions'
import * as requests from './requests'

export function* submitFormSaga(action: ActionType<typeof actions.submitFormAsync.request>) {
    try {
        const data = yield call(requests.submitForm, action.payload.formData)
        yield put(actions.submitFormAsync.success(data))
        yield put(push('/requests/completed'))
    } catch (e) {
        yield put(actions.submitFormAsync.failure())
        alert('에러가 발생했습니다.')
        yield put(push('/error'))
    }
}

export default function* () {
    yield all([
        takeEvery(actions.submitFormAsync.request, submitFormSaga)
    ])
}
