import dayjs from "dayjs";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { setAgree } from "store/form/actions";
import { ActionType } from "typesafe-actions";
import * as actions from './actions';
import * as requests from './requests';
import { IOrder } from "./types";

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
        console.log('wqwqeqweqw')
        yield put(actions.fetchUserConsultAsync.failure())
    }
}

export function* fetchSignUpSaga(action: ActionType<typeof actions.fetchSignUpAsync.request>) {
    try {
        yield put(setAgree({
            terms: true,
            privacy: true,
            marketing: true
        }))
        const data = yield call(requests.postSignUp, action.payload)
        document.cookie=`X-Wematch-Token=${data}; max-age=${60*60*24*60}`
        yield put(actions.fetchSignUpAsync.success(data))
    } catch(e) {
        yield put(actions.fetchSignUpAsync.failure())
    }
}

export function* fetchSignInSaga(action: ActionType<typeof actions.fetchSignInAsync.request>) {
    try {
        const data = yield call(requests.getUser, action.payload.token)
        console.log(data);
        // yield put(actions.fetchSignInAsync.success(data))
    } catch(e) {
        yield put(actions.fetchSignInAsync.failure())
    }
}

export default function* () {
    yield all([
        takeEvery(actions.fetchUserConsultAsync.request, fetchUserConsultSaga)
    ])
}

