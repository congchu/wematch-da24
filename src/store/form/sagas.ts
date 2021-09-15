import { all, call, put, select, takeEvery, takeLeading } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { push, replace } from 'connected-react-router'
import queryString from 'query-string'
import dayjs from 'dayjs'

import { phoneSplit, translateMovingType } from 'components/wematch-ui/utils/form'

import * as userSelector from 'store/user/selectors'
import * as commonTypes from 'store/common/types'
import * as commonActions from 'store/common/actions'
import * as commonSelector from 'store/common/selectors'
import * as commonRequests from 'store/common/requests'

import * as formSelector from './selectors'
import * as actions from './actions'
import * as requests from './requests'
import { ESubmittedFormResult } from './types'

import { deleteCookie, getCookie, setCookie } from 'lib/cookie'
import { dataLayer } from 'lib/dataLayerUtil'

import * as sentry from '@sentry/react'
import { Severity } from '@sentry/react'
import { useCallback } from 'react'
import { events } from 'lib/appsflyer'
import axios from 'axios'
import { LOCAL_ENV } from '../../constants/env'
import { setDbdbdepp } from './actions'

export function* setJusoSaga() {
  const getJuso = yield select(commonSelector.getJuso)

  try {
    // 디버깅용
    sentry.setExtra('juso', {
      start: getJuso.start,
      end: getJuso.end,
      type: getJuso.type
    })

    if (getJuso.start) {
      const { data } = yield call(commonRequests.getDistance, {
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
      yield put(
        commonActions.setJuso({
          ...getJuso,
          distance: data
        })
      )

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
          jibunAddr: getJuso.start.jibunAddr
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
          roadAddr: getJuso.end.roadAddr,
          jibunAddr: getJuso.end.jibunAddr
        },
        distance: data,
        type: {
          start: getJuso.type.start,
          end: getJuso.type.end
        }
      }

      setCookie('jusoData', JSON.stringify(replaceCookieFormData), {
        expires: new Date(
          dayjs()
            .add(2, 'day')
            .format()
        )
      })
    }
  } catch (e) {
    sentry.captureMessage('거리계산 실패', {
      level: Severity.Error
    })
    sentry.captureException(e)
  }
}

export function* setFormSaga() {
  yield call(setJusoSaga)

  const { user } = yield select(userSelector.getUser)
  const {
    formState: { type, date, address, floor, isMoveStore, agree, contents }
  } = yield select()
  const getJuso = yield select(commonSelector.getJuso)
  // 디버깅용
  sentry.setExtra('setFormSaga', {
    start: getJuso.start,
    end: getJuso.end,
    type: getJuso.type
  })

  const { phone1, phone2, phone3 } = phoneSplit(user.tel)

  const cookie = getCookie('0dj38gepoekf98234aplyadmin')

  const getDetailAddress = (type: 'start' | 'end') => {
    // 건물 번호가 없는 경우에는 생략
    if (getJuso[type].buldSlno === '0') {
      return getJuso[type].rn + ' ' + getJuso[type].buldMnnm + ' ' + address.detailStart
    }
    return getJuso[type].rn + ' ' + getJuso[type].buldMnnm + '-' + getJuso[type].buldSlno + ' ' + address.detailStart
  }

  const formData: commonTypes.RequestUserInfoInsert = {
    moving_type: translateMovingType(type),
    moving_date: date[0],
    floor: `${floor.start}`,
    detail_addr: getDetailAddress('start'),
    sido: getJuso.start.siNm,
    gugun: getJuso.start.sggNm,
    dong: getJuso.start.emdNm,
    detail_addr2: getDetailAddress('end'),
    sido2: getJuso.end.siNm,
    gugun2: getJuso.end.sggNm,
    dong2: getJuso.end.emdNm,
    floor2: `${floor.end}`,
    name: user.name,
    phone1: phone1,
    phone2: phone2,
    phone3: phone3,
    keep_move: isMoveStore,
    mkt_agree: agree.marketing,
    distance: getJuso.distance,
    agent_id: cookie ? queryString.parse(cookie).agentid : '',
    memo: contents,
    auto_match: true
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
    detail_addr2: address.detailEnd
  }
  setCookie('formData', JSON.stringify(replaceCookieFormData), {
    expires: new Date(
      dayjs()
        .add(2, 'day')
        .format()
    )
  })

  yield put(push('/completed?service_type=move'))
}

// type Dbdbdeep_Type = { lncd: string; name: string; tel: string; dt: string }
// function* fetchDbdbdeep({ lncd, name, tel, dt }: Dbdbdeep_Type) {
//   try {
//     // 위매치 lncd=S00265403KC05548106K
//     yield axios.get(`http://dbdbdeep.com/site19/gate/da24/join.php?lncd=${lncd}&name=${encodeURI(name)}&tel=${encodeURI(tel)}&dt=${encodeURI(dt)}`)
//   } catch (e) {
//     // 예외처리 안함
//   }
// }

export function* submitFormSaga(action: ActionType<typeof actions.submitFormAsync.request>) {
  try {
    // 디버깅용
    sentry.setExtra('submitFormSaga', {
      payload: action.payload.formData
    })
    const lncd = getCookie('lncd')
    const data = yield call(requests.submitForm, action.payload.formData)
    const { start: moveStartAddr, end: moveEndAddr, type: moveAddrType } = yield select(commonSelector.getJuso)
    yield put(actions.submitFormAsync.success(data))
    if (data?.result === ESubmittedFormResult.Success) {
      // yield put(push(`/completed?${data.inquiry_idx}`))
      // yield put(push(`/requests/completed`))

      if (lncd) {
        yield put(actions.setDbdbdepp(true))
      }

      const { moving_type } = action.payload.formData
      const startAddress = moveAddrType.start === 'road' ? `${moveStartAddr?.roadAddr}` : `${moveStartAddr?.jibunAddr}`
      const endAddress = moveAddrType.end === 'road' ? `${moveEndAddr?.roadAddr}` : `${moveEndAddr?.jibunAddr}`
      dataLayer({
        event: 'complete',
        category: '매칭완료',
        action: `매칭완료_${data?.match_list?.length}`,
        label: `${startAddress.replace(/ /g, '-')}_${endAddress.replace(/ /g, '-')}`,
        CD6: `${moving_type}`,
        CD12: '바로매칭'
      })

      events({
        action: 'app_move_done'
      })

      TenpingScript.SendConversion()

      gtag('event', 'conversion', {
        send_to: 'AW-862163644/CmzdCIej6G0QvKWOmwM'
      })

      yield put(replace(`/completed?service_type=move&inquiry_idx=${data.inquiry_idx}`))
    } else if (data?.result === ESubmittedFormResult.NoPartner) {
      yield put(push('/requests/nopartner?service_type=move'))
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
  const selectedSubmitType = yield select(formSelector.getSelectedSubmitType)
  const getIsMoveStore = yield select(formSelector.getIsMoveStore)
  const getMoveType = yield select(formSelector.getType)
  const formData = yield select(formSelector.getFormData)
  const {
    user: { uuid }
  } = yield select(userSelector.getUser)

  if (selectedSubmitType === 'curation') {
    yield put(actions.submitFormAsync.request({ formData: { uuid, ...formData } }))
  } else if (selectedSubmitType === 'select') {
    yield put(replace('/'))
    yield put(commonActions.fetchMoveIdx.request({ uuid, ...formData }))
  }
}

export default function*() {
  yield all([takeEvery(actions.submitFormAsync.request, submitFormSaga), takeLeading(actions.fetchMoveData, fetchMoveFormSaga), takeEvery(actions.setMoveData, setFormSaga)])
}
