import {all, call, put, select, takeEvery, takeLeading} from 'redux-saga/effects'
import {ActionType} from 'typesafe-actions'
import {push, replace} from 'connected-react-router'
import queryString from 'query-string';
import dayjs from 'dayjs';

import {phoneSplit, translateMovingType} from 'components/wematch-ui/utils/form';

import * as userSelector from 'store/user/selectors';
import * as commonTypes from 'store/common/types'
import * as commonActions from 'store/common/actions';
import * as commonSelector from 'store/common/selectors';
import * as commonRequests from 'store/common/requests'

import * as formSelector from "./selectors";
import * as actions from './actions'
import * as requests from './requests'
import { ESubmittedFormResult } from './types';

import {deleteCookie, getCookie, setCookie} from 'lib/cookie';
import {dataLayer} from 'lib/dataLayerUtil'

import * as sentry from '@sentry/react'
import {Severity} from '@sentry/react'


export function* setJusoSaga() {
    const getJuso = yield select(commonSelector.getJuso)

    try {
        if (getJuso.start) {
            const {data} = yield call(commonRequests.getDistance, {
                startZone: getJuso.start.admCd,
                startRoad: getJuso.start.rnMgtSn,
                startIsGf: getJuso.start.udrtYn,
                startMainBd: getJuso.start.buldMnnm,
                startSubBd: getJuso.start.buldSlno,
                endZone: getJuso.end.admCd,
                endRoad: getJuso.end.rnMgtSn,
                endIsGf: getJuso.end.udrtYn,
                endMainBd: getJuso.end.buldMnnm,
                endSubBd: getJuso.end.buldSlno
            })
            yield put(commonActions.setJuso({
                ...getJuso,
                distance: data
            }))

            //쿠키값이 너무 커져서 필요한것만 짜른다..
            const replaceCookieFormData = {
                start: {
                    admCd: getJuso.start.admCd,
                    rnMgtSn: getJuso.start.rnMgtSn,
                    udrtYn: getJuso.start.udrtYn,
                    buldMnnm: getJuso.start.buldMnnm,
                    buldSlno: getJuso.start.buldSlno,
                    rn: getJuso.start.rn,
                    siNm: getJuso.start.siNm,
                    sggNm: getJuso.start.sggNm,
                    emdNm: getJuso.start.emdNm,
                    roadAddr: getJuso.start.roadAddr,
                },
                end: {
                    admCd: getJuso.end.admCd,
                    rnMgtSn: getJuso.end.rnMgtSn,
                    udrtYn: getJuso.end.udrtYn,
                    buldMnnm: getJuso.end.buldMnnm,
                    buldSlno: getJuso.end.buldSlno,
                    rn: getJuso.end.rn,
                    siNm: getJuso.end.siNm,
                    sggNm: getJuso.end.sggNm,
                    emdNm: getJuso.end.emdNm,
                    roadAddr: getJuso.end.roadAddr
                },
                distance: data
            }

            setCookie('jusoData', JSON.stringify(replaceCookieFormData), { expires: new Date(dayjs().add(2, 'day').format()) })
        }
    } catch (e) {
        sentry.captureMessage('거리계산 실패', {
            level: Severity.Error
        })
        sentry.captureException(e)
    }
}

export function* setFormSaga()  {
    yield call(setJusoSaga);

    const { user } = yield select(userSelector.getUser);
    const {formState: { type, date, address, floor, isMoveStore, agree, contents }} = yield select()
    const getJuso = yield select(commonSelector.getJuso)

    const { phone1, phone2, phone3 } = phoneSplit(user.tel);

    const cookie = getCookie('0dj38gepoekf98234aplyadmin')

    const formData: commonTypes.RequestUserInfoInsert = {
        moving_type: translateMovingType(type),
        moving_date: date[0],
        floor: `${floor.start}`,
        detail_addr: getJuso.start.rn + ' ' + getJuso.start.buldMnnm + '-' + getJuso.start.buldSlno + ' ' + address.detailStart,
        sido: getJuso.start.siNm,
        gugun: getJuso.start.sggNm,
        dong: getJuso.start.emdNm,
        sido2: getJuso.end.siNm,
        gugun2: getJuso.end.sggNm,
        dong2: getJuso.end.emdNm,
        floor2: `${floor.end}`,
        detail_addr2: getJuso.end.rn + ' ' + getJuso.end.buldMnnm + '-' + getJuso.end.buldSlno + ' ' + address.detailEnd,
        name: user.name,
        phone1: phone1,
        phone2: phone2,
        phone3: phone3,
        keep_move: isMoveStore,
        mkt_agree: agree.marketing,
        distance: getJuso.distance,
        agent_id: cookie ? queryString.parse(cookie).agentid : '',
        memo: contents
    }

    yield put(actions.setFormData(formData))

    // 필요 없는것 같음
    // if (getCookie('formData')) {
    //     deleteCookie('formData')
    // }

    // 메인화면에 쿠키값 불러올때 보여줄값을 따로 만들어준다. (날짜값은 초기화)
    const replaceCookieFormData = {
        ...formData,
        ...agree,
        moving_date: null,
        detail_addr: address.detailStart,
        detail_addr2: address.detailEnd,
    }
    setCookie('formData', JSON.stringify(replaceCookieFormData), { expires: new Date(dayjs().add(2, 'day').format()) })
}

export function* submitFormSaga(action: ActionType<typeof actions.submitFormAsync.request>) {
    try {
        const data = yield call(requests.submitForm, action.payload.formData)
        yield put(actions.submitFormAsync.success(data))
        if (data?.result === ESubmittedFormResult.Success) {
            yield put(push(`/completed/${data.inquiry_idx}`))
            // yield put(push(`/requests/completed`))
        } else if (data?.result === ESubmittedFormResult.NoPartner) {
            yield put(push('/requests/nopartner'))
        } else if (data?.result === ESubmittedFormResult.NoService) {
            yield put(push('/requests/noservice'))
        }
    } catch (e) {
        yield put(actions.submitFormAsync.failure())
        sentry.captureMessage('이사 접수 실패', {
            level: Severity.Error
        })
        sentry.captureException(e)
        alert('에러가 발생했습니다.')
        yield put(push('/error'))
    }
}

export function* fetchMoveFormSaga() {
    const selectedSubmitType = yield select(formSelector.getSelectedSubmitType);
    const getIsMoveStore = yield select(formSelector.getIsMoveStore)
    const getMoveType = yield select(formSelector.getType)
    yield call(setFormSaga)
    const formData = yield select(formSelector.getFormData);
    const {user: {uuid}} = yield select(userSelector.getUser);


    dataLayer({
        event: 'request',
        category: '다이사_메인_신청_1',
        label: '매칭신청',
        action: selectedSubmitType === 'curation' ? '업체_바로매칭' : '업체_직접고르기',
        CD6: getMoveType === 'house' ? '가정' : '사무실',
        CD10: getIsMoveStore ? 'Y' : 'N'
    })

    if(selectedSubmitType === 'curation') {
        yield put(replace('/'));
        yield put(actions.submitFormAsync.request({formData: { uuid, ...formData }}));
    } else if(selectedSubmitType === 'select') {
        yield put(replace('/'));
        yield put(commonActions.fetchMoveIdx.request({ uuid, ...formData }));
    }
}

export default function* () {
    yield all([
        takeEvery(actions.submitFormAsync.request, submitFormSaga),
        takeLeading(actions.fetchMoveData, fetchMoveFormSaga),
    ])
}
