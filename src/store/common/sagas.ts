import { push } from "connected-react-router";
import { call, put, all, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { showToast } from "components/common/Toast";

import * as actions from "./actions";
import * as requests from "./requests";

export function* fetchAddressListSaga(action: ActionType<typeof actions.fetchAddressListAsync.request>) {
  try {
    const { data } = yield call(requests.getAddress, action.payload);
    yield put(actions.fetchAddressListAsync.success(data));
  } catch (e) {
    const errorCode = ["E0006", "E0009", "E0010", "EE0011", "E0012", "E0013"];
    if (!errorCode.includes(e.error.code)) {
      showToast({
        message: e.error.message,
        type: "error",
        position: "bottom"
      });
    }
    yield put(actions.fetchAddressListAsync.failure(e.error));
  }
}

export function* fetchAddressListMoreSaga(action: ActionType<typeof actions.fetchAddressMoreListAsync.request>) {
  try {
    const { data } = yield call(requests.getAddress, action.payload);
    yield put(actions.fetchAddressMoreListAsync.success(data));
  } catch (e) {
    const errorCode = ["E0006", "E0009", "E0010", "EE0011", "E0012", "E0013"];
    if (!errorCode.includes(e.error.code)) {
      showToast({
        message: e.error.message,
        type: "error",
        position: "bottom"
      });
    }
    yield put(actions.fetchAddressMoreListAsync.failure(e.error));
  }
}

export function* fetchMoveIdxSaga(action: ActionType<typeof actions.fetchMoveIdx.request>) {
  try {
    const data = yield call(requests.getMoveIdx, action.payload);
    yield put(actions.fetchMoveIdx.success(data.data.data));
    yield put(push("/partner/list"));
  } catch (e) {
    yield put(actions.fetchMoveIdx.failure());
  }
}

export function* fetchCompletedMoveSaga(action: ActionType<typeof actions.fetchCompletedMoveIdx.request>) {
  try {
    const { data } = yield call(requests.getCompletedMoveIdx, action.payload.inquiry_idx);
    yield put(actions.fetchCompletedMoveIdx.success(data));
  } catch (e) {
    yield put(actions.fetchCompletedMoveIdx.failure());
    yield put(push("/error"));
  }
}

function* fetchFeedbackIdxSaga(action: ActionType<typeof actions.fetchPartnerFeedback>) {
  try {
    const data = yield call(requests.postPartnerFeedback, action.payload);
  } catch (e) {}
}

function* fetchEstimateIdxSaga(action: ActionType<typeof actions.fetchPartnerEstimate>) {
  try {
    const data = yield call(requests.postEstimateFeedback, action.payload);
  } catch (e) {}
}

export default function*() {
  yield all([
    takeEvery(actions.fetchAddressListAsync.request, fetchAddressListSaga),
    takeEvery(actions.fetchAddressMoreListAsync.request, fetchAddressListMoreSaga),
    takeEvery(actions.fetchMoveIdx.request, fetchMoveIdxSaga),
    takeEvery(actions.fetchCompletedMoveIdx.request, fetchCompletedMoveSaga),
    takeLatest(actions.fetchPartnerFeedback, fetchFeedbackIdxSaga),
    takeLatest(actions.fetchPartnerEstimate, fetchEstimateIdxSaga)
  ]);
}
