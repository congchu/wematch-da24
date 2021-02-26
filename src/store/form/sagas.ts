import { put, all, takeEvery, call, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { push } from 'connected-react-router'
import * as userSelector from 'store/user/selectors';
import * as commonTypes from 'store/common/types'
import * as commonActions from 'store/common/actions';
import * as formSelector from "./selectors";
import {FormState} from "./reducers";
import * as actions from './actions'
import * as requests from './requests'
import { calcRouteByDirectionService, calcRouteByGeoCoder } from 'lib/distanceUtil';
import { addressSplit, phoneSplit, translateMovingType } from 'components/wematch-ui/utils/form';
import { deleteCookie, getCookie, setCookie } from 'lib/cookie';
import queryString from 'query-string';
import dayjs from 'dayjs';
import { dataLayer } from 'lib/dataLayerUtil';


export function* setFormSaga():any  {

    const { user } = yield select(userSelector.getUser);
    const {formState: { type, date, address, floor, isMoveStore, agree }} = yield select()

    let distance  = yield call(calcRouteByDirectionService, {start: address.start, end: address.end})

    if(!distance) {
        distance = yield call(calcRouteByGeoCoder, [address.start, address.end])
    }

    const { phone1, phone2, phone3 } = phoneSplit(user.tel);

    const cookie = getCookie('0dj38gepoekf98234aplyadmin')

    const formData: commonTypes.RequestUserInfoInsert = {
        moving_type: translateMovingType(type),
        moving_date: date[0],
        floor: `${floor.start}`,
        detail_addr: address.detailStart,
        sido: addressSplit(address.start).sido,
        gugun: addressSplit(address.start).gugun,
        dong: addressSplit(address.start).dong,
        sido2: addressSplit(address.end).sido,
        gugun2: addressSplit(address.end).gugun,
        dong2: addressSplit(address.end).dong,
        floor2: `${floor.end}`,
        detail_addr2: address.detailEnd,
        name: user.name,
        phone1: phone1,
        phone2: phone2,
        phone3: phone3,
        keep_move: isMoveStore,
        mkt_agree: agree.marketing,
        distance: Number(distance) || 1,
        agent_id: cookie ? queryString.parse(cookie).agentid : '',
    }

    yield put(actions.setFormData(formData))

    if (getCookie('formData')) {
        deleteCookie('formData')
    }

    setCookie('formData', JSON.stringify({ ...formData, ...agree }), { expires: new Date(dayjs().add(2, 'day').format()) })
}

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
            submittedForm: {
                data: data,
                loading: false,
                report: true
            },
            selectedSubmitType: null,
            contents: yield select(formSelector.getContents)
        }
        yield put(actions.submitFormAsync.success(formState))

        if (formState.submittedForm.data?.result === 'success') {
            yield put(push('/requests/completed'))
        } else if (formState.submittedForm.data?.result === 'no partner') {
            yield put(push('/requests/nopartner'))
        } else if (formState.submittedForm.data?.result === 'no service') {
            yield put(push('/requests/noservice'))  
        }
    } catch (e) {
        yield put(actions.submitFormAsync.failure())
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
    

    dataLayer({
        event: 'request',
        category: '다이사_메인_신청_1',
        label: '매칭신청',
        action: selectedSubmitType === 'curation' ? '업체_바로매칭' : '업체_직접고르기',
        CD6: getMoveType === 'house' ? '가정' : '사무실',
        CD10: getIsMoveStore ? 'Y' : 'N'
    })

    if(selectedSubmitType === 'curation') {
        yield put(push('/'));
        yield put(actions.submitFormAsync.request({formData: {...formData}}));   
    } else if(selectedSubmitType === 'select') {
        yield put(commonActions.fetchMoveIdx.request(formData));
    }
}

export default function* () {
    yield all([
        takeEvery(actions.submitFormAsync.request, submitFormSaga),
        takeEvery(actions.fetchMoveData, fetchMoveFormSaga),
    ])
}
