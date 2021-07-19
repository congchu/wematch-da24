import { phoneSplit } from 'components/wematch-ui/utils/form'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import queryString from 'query-string'
import { getUser } from 'store/user/selectors'
import * as requests from './requests'
import * as actions from './actions'
import { getCleanForm } from './selectors'
import { RequestCleanAuthMatchData } from './types'
import { fetchCleanAutoMatch } from './actions'
import { getCookie } from 'lib/cookie'
import {push} from "connected-react-router";

export function* fetchCleanAutoMatchSaga() {
  try {
    const { user, token } = yield select(getUser)
    const form = yield select(getCleanForm)
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
      pyeong: form.houseSpace,
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

    if(data.result === 'no service') {
      yield put(push('/requests/noservice'))
    } else if (data.result === 'no partner') {
      yield put(push('/requests/nopartner?serviceType=clean'))
    } else {
      yield put(fetchCleanAutoMatch.success(data.data))
    }
  } catch (e) {
    console.log(e)
    yield put(fetchCleanAutoMatch.failure())
  }
}

export default function*() {
  yield all([takeEvery(actions.fetchCleanAutoMatch.request, fetchCleanAutoMatchSaga)])
}
