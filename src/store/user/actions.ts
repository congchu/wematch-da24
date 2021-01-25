import { createAction, createAsyncAction } from "typesafe-actions";
import { IOrder } from "./types";


/*
    TODO: 로그인 로직 user store로 이동
    * 휴대폰 인증 번호 요청api
    * 인증번호 인증 api
*/


//TODO: Request Param 이름, 휴대전화에서 쿠키 값으로 변경(API 변경 예정)
export const fetchUserConsultAsync = createAsyncAction(
    "FETCH_USER_CONSULT_REQUEST",
    "FETCH_USER_CONSULT_SUCCESS",
    "FETCH_USER_CONSULT_FAILURE",
)<{name: string, phone: string}, {name: string, phone: string, orders: IOrder[]}, undefined>()

export const signOut = createAction("SIGN_OUT")();