import { call, put, all, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'
import * as request from './requests'
import {isEmpty} from 'lodash'
import {dataLayer} from 'lib/dataLayerUtil'
import {IPartnerList} from 'types/partner'

export function* fetchPartnerListSaga(action: ActionType<typeof actions.fetchPartnerListAsync.request>) {
    try {
        const data = yield call(request.getPartnerList, action.payload.page, action.payload.size, action.payload.idx)
        if(isEmpty(data.data)) {
            dataLayer({event: 'partner_inventory', CD5: "noservice_0"})
        } else {
            const availableLength = data.data.filter((item:IPartnerList) => item.status !== 'unavailable').length
            dataLayer({event: 'partner_inventory', CD5: availableLength > 0 ? `showcnt_${availableLength}` : "nopartner_0"})
        }
        yield put(actions.fetchPartnerListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchPartnerListAsync.failure())
    }
}

export function* fetchPartnerMoreListSaga(action: ActionType<typeof actions.fetchPartnerMoreListAsync.request>) {
    try {
        const data = yield call(request.getPartnerList, action.payload.page, action.payload.size, action.payload.idx)
        yield put(actions.fetchPartnerMoreListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchPartnerMoreListAsync.failure())
    }
}

export function* fetchPartnerDetailSaga(action: ActionType<typeof actions.fetchPartnerDetailAsync.request>) {
    try {
        const data = yield call(request.getPartnerDetail, action.payload.adminId, action.payload.idx)
        yield put(actions.fetchPartnerDetailAsync.success(data))
    } catch (e) {
        yield put(actions.fetchPartnerDetailAsync.failure())
    }
}

export function* fetchPartnerDetailForCompletedSaga(action: ActionType<typeof actions.fetchPartnerDetailCompAsync.request>) {
    try {
        const data = yield call(request.getPartnerDetailForCompleted, action.payload.adminId)
        yield put(actions.fetchPartnerDetailCompAsync.success(data))
    } catch (e) {
        yield put(actions.fetchPartnerDetailCompAsync.failure())
    }
}

export function* fetchReviewListSaga(action: ActionType<typeof actions.fetchReviewListAsync.request>) {
    try {
        const data = yield call(request.getReviewList, action.payload.adminId, action.payload.page, action.payload.size)
        yield put(actions.fetchReviewListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchReviewListAsync.failure())
    }
}


export function* fetchReviewMoreListSaga(action: ActionType<typeof actions.fetchReviewMoreListAsync.request>) {
    try {
        const data = yield call(request.getReviewList, action.payload.adminId, action.payload.page, action.payload.size)
        yield put(actions.fetchReviewMoreListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchReviewMoreListAsync.failure())
    }
}


export function* fetchRecommendedPartnerListSaga(action: ActionType<typeof actions.fetchCartListAsync.request>) {
    try {
        const data = yield call(request.getRecommendedPartnerList, action.payload.idx, action.payload.admin_id)
        yield put(actions.fetchCartListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchCartListAsync.failure())
    }
}

export function* fetchMatchingPartnerSaga(action: ActionType<typeof actions.fetchMatchingAsync.request>) {
    try {
        const data = yield call(request.getMatchingIdx, action.payload.idx, action.payload.partners)
        yield put(actions.fetchMatchingAsync.success(data))
    } catch (e) {
        yield put(actions.fetchMatchingAsync.failure())
    }
}

export function* fetchCommentListSaga(action: ActionType<typeof actions.fetchCommentListAsync.request>) {
    try {
        const data = yield call(request.getCommentList, action.payload.adminId, action.payload.page, action.payload.size)
        yield put(actions.fetchCommentListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchCommentMoreListAsync.failure())
    }
}


export function* fetchCommentMoreListSaga(action: ActionType<typeof actions.fetchCommentMoreListAsync.request>) {
    try {
        const data = yield call(request.getCommentList, action.payload.adminId, action.payload.page, action.payload.size)
        yield put(actions.fetchCommentMoreListAsync.success(data))
    } catch (e) {
        yield put(actions.fetchCommentMoreListAsync.failure())
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchPartnerListAsync.request, fetchPartnerListSaga),
        takeEvery(actions.fetchPartnerMoreListAsync.request, fetchPartnerMoreListSaga),
        takeEvery(actions.fetchPartnerDetailAsync.request, fetchPartnerDetailSaga),
        takeEvery(actions.fetchReviewListAsync.request, fetchReviewListSaga),
        takeEvery(actions.fetchReviewMoreListAsync.request, fetchReviewMoreListSaga),
        takeEvery(actions.fetchCartListAsync.request, fetchRecommendedPartnerListSaga),
        takeEvery(actions.fetchMatchingAsync.request, fetchMatchingPartnerSaga),
        takeEvery(actions.fetchPartnerDetailCompAsync.request, fetchPartnerDetailForCompletedSaga),
        takeEvery(actions.fetchCommentListAsync.request, fetchCommentListSaga),
        takeEvery(actions.fetchCommentMoreListAsync.request, fetchCommentMoreListSaga),
    ])
}
