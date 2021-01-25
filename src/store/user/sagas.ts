import { all, call, put, takeEvery } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import * as actions from './actions';
import * as requests from './requests';

export function* fetchUserConsultSaga(action: ActionType<typeof actions.fetchUserConsultAsync.request>) {
    try {
        const data = yield call(requests.getUserConsult)
        console.log(data);
    } catch(e) {
        yield put(actions.fetchUserConsultAsync.failure())
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchUserConsultAsync.request, fetchUserConsultSaga)
    ])
}