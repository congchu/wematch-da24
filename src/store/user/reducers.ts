import { ActionType, createReducer } from "typesafe-actions";
import { IOrder } from "./types";
import * as actions from './actions';
import { IUser } from "types/auth";



export type Actions = ActionType<typeof actions>

export interface UserState {
    auth: {
        token: string | null;
        loading: boolean; 
        user: IUser | null;
    };
    phoneVerify: {
        isVerified: boolean | null;
        isSendMessage?: boolean;
        loading: boolean;
    };
    consult: {
        data: {
            name: string;
            phone: string;
            clean_orders: IOrder[];
            move_orders: IOrder[];
            past_orders: IOrder[];
        },
        selected: IOrder | null;
        loading: boolean;
    };

}


const initialState: UserState = {
    auth: {
        token: null,
        user: null,
        loading: false,
    },
    phoneVerify: {
        isVerified: null,
        isSendMessage: false,
        loading: false
    },
    consult: {
        data: {
            name: '',
            phone: '',
            clean_orders: [],
            move_orders: [],
            past_orders: [],
        },
        selected: null,
        loading: false
    }
}


export default createReducer<UserState, Actions>(initialState)
    .handleAction(actions.fetchUserConsultAsync.request, (state) => ({...state, consult: {...state.consult, loading: true}}))
    .handleAction(actions.fetchUserConsultAsync.success, (state, action) => ({...state, consult: { data: {...action.payload}, loading: false, selected: null}}))
    .handleAction(actions.fetchVerifySendMessageAsync.request, (state) => ({ ...state, phoneVerify: {...state.phoneVerify, loading: true}}))
    .handleAction(actions.fetchVerifySendMessageAsync.success, (state) => ({ ...state, phoneVerify: {...state.phoneVerify, isSendMessage: true, loading: false}}))
    .handleAction(actions.fetchVerifyCodeAsync.request, (state) => ({...state, phoneVerify: { ...state.phoneVerify, loading: true }}))
    .handleAction(actions.fetchVerifyCodeAsync.success, (state, action) => ({ ...state, phoneVerify: { isVerified: action.payload.isVerified, isSendMessage: !action.payload.isVerified, loading: false }}))
    .handleAction(actions.fetchVerifyCodeAsync.failure, (state) => ({ ...state, phoneVerify: { ...state.phoneVerify, isVerified: false, loading: false}}))
    .handleAction([actions.fetchSignUpAsync.request, actions.fetchSignInAsync.request], (state) => ({ ...state, auth: { ...state.auth, loading: true}}))
    .handleAction([actions.fetchSignInAsync.success, actions.fetchSignUpAsync.success], (state, action) => ({ ...state, auth: { token: action.payload.token, user: action.payload.user, loading: false }}))
    .handleAction([actions.fetchSignInAsync.failure, actions.fetchSignUpAsync.failure], (state) => ({...state, auth: { ...state.auth, loading: false}}))
    .handleAction(actions.selectOrder, (state, action) => ({...state, consult: {...state.consult, selected: {...action.payload.order}}}))
    .handleAction(actions.resetOrder, (state) => ({...state, consult: {...state.consult, selected: null}}))
