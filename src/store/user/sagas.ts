import { push, goBack } from "connected-react-router";
import dayjs from "dayjs";
import { deleteCookie, getCookie, setCookie } from "lib/cookie";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { setAgree } from "store/form/actions";
import { ActionType } from "typesafe-actions";
import * as actions from './actions';
import * as requests from './requests';
import { ESignInCase, IOrder } from "./types";
import * as commonTypes from 'store/common/types'
import * as formActions from 'store/form/actions'
import * as userSelector from './selectors';


export function* fetchUserConsultSaga(action: ActionType<typeof actions.fetchUserConsultAsync.request>) {
    try {
        const {name, phone} = action.payload;
        const numbers =  [phone.slice(0, 3), phone.slice(3, 7), phone.slice(7)]
        
        const {data} = yield call(requests.getUserConsult, name, numbers)
    
        const orders = data.orders.reduce((acc:any, cur: IOrder) => {
                if(dayjs().isAfter(cur.moving_date)) {
                    acc.pastOrders = [...acc.pastOrders, cur];
                    return acc;
                }

                acc.currentOrders = [...acc.currentOrders, cur]
                return acc;
        }, {pastOrders: [], currentOrders: []})

        const clean_orders = orders.currentOrders.filter((order: IOrder) => order.type === '입주청소' || order.type === "거주청소")
        const move_orders = orders.currentOrders.filter((order:IOrder) => order.type === '원룸이사' || order.type === '가정이사')

        yield put(actions.fetchUserConsultAsync.success({name, phone, move_orders, clean_orders, past_orders: orders.pastOrders}))
    } catch(e) {
        yield put(actions.fetchUserConsultAsync.failure())
    }
}

export function* fetchVerifySendMessageSaga(action: ActionType<typeof actions.fetchVerifySendMessageAsync.request>) {
    try {
        const data = yield call(requests.verifySendMessage, action.payload.phone)
        yield put(actions.fetchVerifySendMessageAsync.success(data))
    } catch (e) {
        yield put(actions.fetchVerifySendMessageAsync.failure())
    }
}

export function* fetchVerifyCodeSaga(action: ActionType<typeof actions.fetchVerifyCodeAsync.request>) {
    try {
        const {data: {isVerified}} = yield call(requests.verifyAuthCode, action.payload.phone, action.payload.code)
        yield put(actions.fetchVerifyCodeAsync.success({isVerified: isVerified}))
    } catch (e) {
        yield put(actions.fetchVerifyCodeAsync.failure())
    }
}

export function* fetchSignUpSaga(action: ActionType<typeof actions.fetchSignUpAsync.request>) {
    const { tel, code } = action.payload;
    try {
        yield put(setAgree({
            terms: true,
            privacy: true,
            marketing: true
        }))

        const {token, data} = yield call(requests.postSignUp, action.payload)
        setCookie('x-wematch-token', token, { secure: true, 'max-age': 60*60*24*60})

        yield put(actions.fetchSignUpAsync.success({token, user: { ...data }}))

        yield call(signInAfterFlowSaga)
    } catch(e) {
        if(e.response.status === 409) {
            yield put(actions.fetchSignInAsync.request({phone: tel, code }))
        }
        
    }
}

export function* fetchSignInSaga(action: ActionType<typeof actions.fetchSignInAsync.request>) {
    try {
        const { phone, code } = action.payload;
        const {token, data} = yield call(requests.getSignIn, phone, code)
        setCookie('x-wematch-token', token, { 'max-age': 60*60*24*60, expires: new Date(dayjs().add(60, 'day').format()) })
        yield put(actions.fetchSignInAsync.success({token, user: { ...data }}));
        
        yield call(signInAfterFlowSaga)
    } catch(e) {
        yield put(actions.fetchSignInAsync.failure())
    }
}

export function* fetchGetUserSaga(action: ActionType<typeof actions.fetchGetUserAsync.request>) {
    try {
        const {token} = action.payload;
        const {data} = yield call(requests.getUser, token);
        yield put(actions.fetchGetUserAsync.success({token, user: {...data}}));
    } catch(e) {
        deleteCookie('x-wematch-token');
        yield put(actions.fetchGetUserAsync.failure())
    }
}


export function* signInAfterFlowSaga() {
    const { prevPage } = yield select(userSelector.getUser)
    switch(prevPage) {
        case ESignInCase.FORM: 
            yield put(formActions.fetchMoveData()) 
            break;
        case ESignInCase.ERROR:
            yield put(push('/myrequest'))
            break;
        default:
            yield put(goBack())
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchUserConsultAsync.request, fetchUserConsultSaga),
        takeEvery(actions.fetchVerifySendMessageAsync.request, fetchVerifySendMessageSaga),
        takeEvery(actions.fetchVerifyCodeAsync.request, fetchVerifyCodeSaga),
        takeEvery(actions.fetchSignUpAsync.request, fetchSignUpSaga),
        takeEvery(actions.fetchSignInAsync.request, fetchSignInSaga),
        takeEvery(actions.fetchGetUserAsync.request, fetchGetUserSaga)
    ])
}

