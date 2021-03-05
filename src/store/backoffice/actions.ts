import {createAction, createAsyncAction} from "typesafe-actions";
import {INotice} from 'types/notice'
import * as types from "../common/types";
import {ContactFormData} from "../common/types";

interface NoticeType {
  notices: INotice[];
  has_more: boolean;
}

export type ServiceType = '공통' | '이사' | '청소' | '이사+청소' | undefined
export type ContactType = '문의형태' |'개인적인 궁금한것' | '기타' | undefined

export const fetchNoticeListAsync = createAsyncAction(
  "FETCH_NOTICE_LIST_REQUEST",
  "FETCH_MATCHING_RESPONSE",
  "FETCH_MATCHING_FAILURE"
)< {page: number; size: number} , NoticeType, undefined>();

export const fetchNoticeMoreListAsync = createAsyncAction(
    "FETCH_NOTICE_MORE_LIST_REQUEST",
    "FETCH_MATCHING_MORE_RESPONSE",
    "FETCH_MATCHING_MORE_FAILURE"
)< {page: number; size: number} , NoticeType, undefined>();


export const setFormData = createAction('SET_FORM_DATA')<types.ContactFormData>()

export const submitContactFormAsync = createAsyncAction(
    'FETCH_SUBMIT_CONTACT_FORM_REQUEST',
    'FETCH_SUBMIT_CONTACT_FORM_SUCCESS',
    'FETCH_SUBMIT_CONTACT_FORM_FAILURE'
)<{ formData : types.ContactFormData } , types.ContactFormData , undefined>()
