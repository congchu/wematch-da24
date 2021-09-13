import { goBack, push, replace } from 'connected-react-router'
import dayjs from 'dayjs'
import { deleteCookie, setCookie } from 'lib/cookie'
import { all, call, put, select, takeEvery, takeLeading } from 'redux-saga/effects'
import * as formActions from 'store/form/actions'
import * as cleanActions from 'store/clean/actions'
import { setAgree } from 'store/form/actions'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import * as requests from './requests'
import { ESignInCase, IOrder } from './types'
import * as userSelector from './selectors'
import * as commonSelector from 'store/common/selectors'
import { LOCAL_ENV } from 'constants/env'
import * as sentry from '@sentry/react'
import { Severity } from '@sentry/react'

const COOKIE_OPTIONS =
  LOCAL_ENV === 'DEV'
    ? {
        'max-age': 60 * 60 * 24 * 60,
        expires: new Date(
          dayjs()
            .add(60, 'day')
            .format()
        )
      }
    : {
        'max-age': 60 * 60 * 24 * 60,
        domain: '.wematch.com',
        expires: new Date(
          dayjs()
            .add(60, 'day')
            .format()
        )
      }

export function* fetchUserConsultSaga(action: ActionType<typeof actions.fetchUserConsultAsync.request>) {
  try {
    const { token } = yield select(userSelector.getUser)
    const { name, phone } = action.payload
    const numbers = [phone.slice(0, 3), phone.slice(3, 7), phone.slice(7)]

    const { data } = yield call(requests.getUserConsult, name, numbers, token)

    const orders = data.orders.reduce(
      (acc: any, cur: IOrder) => {
        if (dayjs().isAfter(cur.moving_date)) {
          acc.pastOrders = [...acc.pastOrders, cur]
          return acc
        }

        acc.currentOrders = [...acc.currentOrders, cur]
        return acc
      },
      { pastOrders: [], currentOrders: [] }
    )

    const clean_orders = orders.currentOrders.filter((order: IOrder) => order.type === '입주청소' || order.type === '거주청소')
    const move_orders = orders.currentOrders.filter((order: IOrder) => order.type === '원룸이사' || order.type === '가정이사' || order.type === '사무실이사')

    yield put(
      actions.fetchUserConsultAsync.success({
        name,
        phone,
        move_orders,
        clean_orders
      })
    )
  } catch (e) {
    yield put(actions.fetchUserConsultAsync.failure())
    yield put(push('/error'))
    sentry.captureMessage('내 신청내역 조회 실패', {
      level: Severity.Error
    })
    sentry.captureException(e)
  }
}

export function* fetchVerifySendMessageSaga(action: ActionType<typeof actions.fetchVerifySendMessageAsync.request>) {
  try {
    const data = yield call(requests.verifySendMessage, action.payload.phone)
    yield put(actions.fetchVerifySendMessageAsync.success(data))
  } catch (e) {
    yield put(actions.fetchVerifySendMessageAsync.failure())
    sentry.captureMessage('인증 문자 메시지 보내기 실패', {
      level: Severity.Error
    })
    sentry.captureException(e)
  }
}

export function* fetchVerifyCodeSaga(action: ActionType<typeof actions.fetchVerifyCodeAsync.request>) {
  try {
    const {
      data: { isVerified }
    } = yield call(requests.verifyAuthCode, action.payload.phone, action.payload.code)
    yield put(actions.fetchVerifyCodeAsync.success({ isVerified: isVerified }))
  } catch (e) {
    yield put(actions.fetchVerifyCodeAsync.failure())
    if (e.response.status === 500) {
      sentry.captureMessage('인증코드 검증 실패', {
        level: Severity.Error
      })
      sentry.captureException(e)
    }
  }
}

export function* fetchSignUpSaga(action: ActionType<typeof actions.fetchSignUpAsync.request>) {
  const { tel, code } = action.payload
  const deviceId = yield select(commonSelector.getDeviceId)

  try {
    yield put(
      setAgree({
        terms: true,
        privacy: true,
        marketing: true
      })
    )

    let params =
      deviceId !== ''
        ? {
            ...action.payload,
            device_id: deviceId
          }
        : action.payload

    const { token, data } = yield call(requests.postSignUp, params)
    setCookie(`x-wematch-token-${LOCAL_ENV}`, token, COOKIE_OPTIONS)
    yield put(actions.fetchSignUpAsync.success({ token, user: { ...data } }))

    yield call(signInAfterFlowSaga)
  } catch (e) {
    if (e.response.status === 409) {
      yield put(actions.fetchSignInAsync.request({ phone: tel, code }))
    }
    if (e.response.status === 500) {
      sentry.captureMessage('회원가입 실패', {
        level: Severity.Error
      })
      sentry.captureException(e)
    }
  }
}

export function* fetchSignInSaga(action: ActionType<typeof actions.fetchSignInAsync.request>) {
  try {
    const { phone, code } = action.payload
    const { token, data } = yield call(requests.getSignIn, phone, code)

    setCookie(`x-wematch-token-${LOCAL_ENV}`, token, COOKIE_OPTIONS)
    yield put(actions.fetchSignInAsync.success({ token, user: { ...data } }))

    yield call(signInAfterFlowSaga)
  } catch (e) {
    yield put(actions.fetchSignInAsync.failure())
    sentry.captureMessage('로그인 실패')
    sentry.captureException(e)
  }
}

export function* fetchGetUserSaga(action: ActionType<typeof actions.fetchGetUserAsync.request>) {
  try {
    const { token } = action.payload
    const { data } = yield call(requests.getUser, token)
    yield put(actions.fetchGetUserAsync.success({ token, user: { ...data } }))
  } catch (e) {
    deleteCookie(`x-wematch-token-${LOCAL_ENV}`)
    yield put(actions.fetchGetUserAsync.failure())
    sentry.captureMessage('사용자 프로필 조회 실패')
    sentry.captureException(e)
  }
}

export function* signInAfterFlowSaga() {
  const { prevPage } = yield select(userSelector.getUser)
  switch (prevPage) {
    case ESignInCase.FORM:
      yield put(formActions.setMoveData())
      break
    case ESignInCase.ERROR:
      yield put(push('/myrequest'))
      break
    case ESignInCase.CLEAN:
      yield put(replace('/completed?service_type=clean'))
      break
    default:
      yield put(goBack())
  }
}

export default function*() {
  yield all([
    takeEvery(actions.fetchUserConsultAsync.request, fetchUserConsultSaga),
    takeLeading(actions.fetchVerifySendMessageAsync.request, fetchVerifySendMessageSaga),
    takeLeading(actions.fetchVerifyCodeAsync.request, fetchVerifyCodeSaga),
    takeLeading(actions.fetchSignUpAsync.request, fetchSignUpSaga),
    takeEvery(actions.fetchSignInAsync.request, fetchSignInSaga),
    takeEvery(actions.fetchGetUserAsync.request, fetchGetUserSaga)
  ])
}
