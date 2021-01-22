import { put, all, takeEvery, call, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { push } from 'connected-react-router'

import * as formSelector from "./selectors";
import {FormState} from "./reducers";
import * as actions from './actions'
import * as requests from './requests'

export function* submitFormSaga(action: ActionType<typeof actions.submitFormAsync.request>) {
    try {
        const data = yield call(requests.submitForm, action.payload.formData)
        const formState: FormState = {
            type: yield select(formSelector.getType),
            date: yield select(formSelector.getDate),
            address: yield select(formSelector.getAddress),
            agree: yield select(formSelector.getAgree),
            floor: yield select(formSelector.getFloor),
            formData: yield select(formSelector.getFormData),
            isMoveStore: yield select(formSelector.getIsMoveStore),
            name: yield select(formSelector.getName),
            phone: yield select(formSelector.getPhone),
            submittedForm:{
                data: data,
                loading: false,
            },
            contents: yield select(formSelector.getContents)
        }
        yield put(actions.submitFormAsync.success(formState))
        yield put(push('/requests/completed'))

    } catch (e) {
        yield put(actions.submitFormAsync.failure())
        alert('에러가 발생했습니다.')
        yield put(push('/error'))
    }
}

export default function* () {
    yield all([
        takeEvery(actions.submitFormAsync.request, submitFormSaga),
    ])
}
