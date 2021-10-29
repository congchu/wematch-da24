import { phoneSplit } from 'components/wematch-ui/utils/form'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import queryString from 'query-string'

import * as requests from 'store/clean/requests'
import * as actions from 'store/clean/actions'
import * as cleanSelector from 'store/clean/selectors'
import * as userSelector from 'store/user/selectors'
import * as commonSelector from 'store/common/selectors'

import { RequestCleanAuthMatchData } from './types'
import { fetchCleanAutoMatch } from './actions'
import { push, replace } from 'connected-react-router'

import { getCookie } from 'lib/cookie'
import { dataLayer } from 'lib/dataLayerUtil'

export function* fetchCleanAutoMatchSaga() {
  try {
    const { user, token } = yield select(userSelector.getUser)
    const form = yield select(cleanSelector.getCleanForm)
    const { phone1, phone2, phone3 } = phoneSplit(user.tel)
    const cookie = getCookie('0dj38gepoekf98234aplyadmin')
    const getDetailAddress = () => {
      // 건물 번호가 없는 경우에는 생략
      if (form.address.buldSlno === '0') {
        return form.address.rn + ' ' + form.address.buldMnnm
      }
      return form.address.rn + ' ' + form.address.buldMnnm + '-' + form.address.buldSlno
    }

    const body: RequestCleanAuthMatchData = {
      clean_date: form.date[0],
      clean_type: form.type,
      house_type: form.livingType,
      pyeong: Number(form.houseSpace) || 0,
      sido: form.address.siNm,
      gugun: form.address.sggNm,
      dong: form.address.emdNm,
      detail_addr: getDetailAddress(),
      name: user.name,
      phone1,
      phone2,
      phone3,
      mkt_agree: false,
      agent_id: cookie ? queryString.parse(cookie).agentid : '',
      clean_option: form.selectOptionItem,
      memo: form.cleanMemo
    }
    const data = yield call(requests.submitClean, body, token)

    const { start: moveStartAddr, end: moveEndAddr, type: moveAddrType } = yield select(commonSelector.getJuso)
    const startAddress = moveAddrType.start === 'road' ? `${moveStartAddr?.roadAddr}` : `${moveStartAddr?.jibunAddr}`
    const endAddress = moveAddrType.end === 'road' ? `${moveEndAddr?.roadAddr}` : `${moveEndAddr?.jibunAddr}`

    const endAddr = `${form.address.siNm} ${form.address.sggNm} ${form.address.emdNm}${getDetailAddress()}`
    dataLayer({
      event: 'complete',
      category: '매칭완료',
      action: `매칭완료_${data?.match_list?.length}`,
      label: `${endAddr.replace(/ /g, '-')}`,
      CD6: `${form.type === "입주청소" ? "입주" : "거주"}`,
      CD12: '바로매칭'
    })


    if (data.result === 'no service') {
      yield put(replace('/requests/noservice?service_type=clean'))
    } else if (data.result === 'no partner') {
      yield put(replace('/requests/nopartner?service_type=clean'))
    } else {
      yield put(fetchCleanAutoMatch.success(data))
      yield put(replace(`/completed?service_type=clean&inquiry_idx=${data.inquiry_idx}`))
    }
  } catch (e) {
    yield put(fetchCleanAutoMatch.failure())
    yield put(push('/error'))
  }
}

export default function*() {
  yield all([takeEvery(actions.fetchCleanAutoMatch.request, fetchCleanAutoMatchSaga)])
}
